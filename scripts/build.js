const path = require('path')
const rollup = require('rollup')
const ts = require('rollup-plugin-typescript2')
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const analyzer = require('rollup-plugin-analyzer').plugin
const terser = require('rollup-plugin-terser').terser
const merge = require('merge')
const clone = require('clone-deep')
const chalk = require('chalk')
const rimraf = require('rimraf')
const pkg = require('../package.json')
const config = require('./rollup.config')

function getTsPlugin(shouldCheck = false) {
  return ts({
    check: shouldCheck,
    cacheRoot: path.resolve(__dirname, '../node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: true,
        declaration: shouldCheck,
        declarationMap: shouldCheck,
      },
    },
  })
}

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.ROLLUP_BUILD_MODE': () =>
      JSON.stringify(process.env.ROLLUP_BUILD_MODE),
  }),
  nodeResolve(),
  commonjs(),
  analyzer({
    limit: 0,
    hideDeps: true,
  }),
]

// const [replacePlugin, ...otherPlugins] = plugins

// const pluginsWithResolve = [replacePlugin, nodeResolve(), ...otherPlugins]

const filename = (str) => path.join(__dirname, '../', str)
const builds = {
  cjs: {
    input: {
      plugins: [getTsPlugin(true), ...plugins],
    },
    output: {
      file: filename(pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
  },
  iife: {
    input: {
      external: ['vue'],
      plugins: [getTsPlugin(), ...plugins],
    },
    output: {
      file: filename(pkg.unpkg),
      name: 'vueHighlightWords',
      format: 'iife',
      sourcemap: true,
    },
  },
  iife_min: {
    input: {
      external: ['vue'],
      plugins: [getTsPlugin(), ...plugins, terser()],
    },
    output: {
      file: filename(pkg.unpkg.replace('.js', '.min.js')),
      name: 'vueHighlightWords',
      format: 'iife',
      sourcemap: true,
    },
  },
  esm: {
    input: {
      plugins: [getTsPlugin(), ...plugins],
    },
    output: {
      file: filename(pkg.module),
      format: 'es',
    },
  },
  esm_min: {
    input: {
      plugins: [getTsPlugin(), ...plugins, terser()],
    },
    output: {
      file: filename(pkg.module.replace('.js', '.min.js')),
      format: 'es',
      sourcemap: true,
    },
  },
}

rimraf.sync('../dist/**')

const logErr = (e) => {
  console.log(`⚠️ Build failed. An error occured:
  `)
  console.log(e)
}
const buildPromise = Object.keys(builds).reduce((promise, key) => {
  const mergedConfig = merge.recursive({}, clone(config), builds[key])

  console.log(`🏗 Building ${chalk.red(key)} version for ${pkg.name} ...
    `)

  const bundlePromise = promise.then(() => {
    const subIndex = key.indexOf('_')
    process.env.ROLLUP_BUILD_MODE =
      subIndex > -1 ? key.substring(0, subIndex) : key
    return rollup.rollup(mergedConfig.input).catch(logErr)
  })
  const writePromise = bundlePromise.then((bundle) => {
    return bundle.write(mergedConfig.output).catch(logErr)
  })

  return writePromise
}, Promise.resolve())

buildPromise
  .then(() => {
    console.log('✅ Build successful.')
  })

  .catch(logErr)
