
/*!
 * vue-highlight-words © Yichang Liu, 2019
 *
 * Version: 1.2.0
 *
 * LICENCE: MIT
 *
 * https://github.com/Astray-git/vue-highlight-words
 *
*/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var highlightWordsCore = require('highlight-words-core');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var VueHighlightWords = {
  functional: true,
  props: {
    activeClassName: String,
    activeIndex: Number,
    activeStyle: Object,
    autoEscape: Boolean,
    findChunks: Function,
    highlightClassName: String,
    highlightStyle: Object,
    highlightTag: [Object, Function, String],
    sanitize: Function,
    searchWords: {
      type: Array,
      // Array<string>
      validator: function validator(value) {
        return value.every(function (word) {
          return typeof word === 'string';
        });
      },
      required: true
    },
    textToHighlight: {
      type: String,
      required: true
    },
    unhighlightClassName: String,
    unhighlightStyle: Object
  },
  render: function render(h, context) {
    var _context$props = context.props,
        _context$props$active = _context$props.activeClassName,
        activeClassName = _context$props$active === void 0 ? '' : _context$props$active,
        _context$props$active2 = _context$props.activeIndex,
        activeIndex = _context$props$active2 === void 0 ? -1 : _context$props$active2,
        activeStyle = _context$props.activeStyle,
        autoEscape = _context$props.autoEscape,
        _context$props$caseSe = _context$props.caseSensitive,
        caseSensitive = _context$props$caseSe === void 0 ? false : _context$props$caseSe,
        findChunks = _context$props.findChunks,
        _context$props$highli = _context$props.highlightClassName,
        highlightClassName = _context$props$highli === void 0 ? '' : _context$props$highli,
        _context$props$highli2 = _context$props.highlightStyle,
        highlightStyle = _context$props$highli2 === void 0 ? {} : _context$props$highli2,
        _context$props$highli3 = _context$props.highlightTag,
        highlightTag = _context$props$highli3 === void 0 ? 'mark' : _context$props$highli3,
        sanitize = _context$props.sanitize,
        searchWords = _context$props.searchWords,
        textToHighlight = _context$props.textToHighlight,
        _context$props$unhigh = _context$props.unhighlightClassName,
        unhighlightClassName = _context$props$unhigh === void 0 ? '' : _context$props$unhigh,
        unhighlightStyle = _context$props.unhighlightStyle;
    var contextData = context.data;
    var chunks = highlightWordsCore.findAll({
      autoEscape: autoEscape,
      caseSensitive: caseSensitive,
      findChunks: findChunks,
      sanitize: sanitize,
      searchWords: searchWords,
      textToHighlight: textToHighlight
    });
    var HighlightTag = highlightTag;
    var highlightCount = -1;
    var highlightClassNames = '';
    var highlightStyles;
    return h('span', _objectSpread({}, contextData), chunks.map(function (chunk, index) {
      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

      if (chunk.highlight) {
        highlightCount++;
        var isActive = highlightCount === +activeIndex;
        highlightClassNames = "".concat(highlightClassName, " ").concat(isActive ? activeClassName : '');
        highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
        var data = {
          class: highlightClassNames,
          key: index,
          style: highlightStyles
        };

        if (typeof HighlightTag !== 'string') {
          // not plain html tag, add props for compoent
          data.props = {
            highlightIndex: highlightCount
          };
        }

        if (contextData.scopedSlots) {
          return h(HighlightTag, data, [contextData.scopedSlots.default({
            children: text,
            highlightIndex: highlightCount
          })]);
        }

        return h(HighlightTag, data, text);
      } else {
        return h('span', {
          class: unhighlightClassName,
          key: index,
          style: unhighlightStyle
        }, text);
      }
    }));
  }
};

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Vue.component(options.name || 'VueHighlightWords', VueHighlightWords);
}

exports.default = VueHighlightWords;
exports.install = install;
exports.VueHighlightWords = VueHighlightWords;
//# sourceMappingURL=vue-highlight-words.common.js.map
