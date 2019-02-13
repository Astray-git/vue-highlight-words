
/*!
 * vue-highlight-words © Yichang Liu, 2019
 *
 * Version: 1.0.0
 *
 * LICENCE: MIT
 *
 * https://github.com/Astray-git/vue-highlight-words
 *
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.vueHighlightWords = {}));
}(this, function (exports) { 'use strict';

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

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dist = createCommonjsModule(function (module) {
    module.exports =
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/

        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _utils = __webpack_require__(2);

      Object.defineProperty(exports, 'combineChunks', {
        enumerable: true,
        get: function get() {
          return _utils.combineChunks;
        }
      });
      Object.defineProperty(exports, 'fillInChunks', {
        enumerable: true,
        get: function get() {
          return _utils.fillInChunks;
        }
      });
      Object.defineProperty(exports, 'findAll', {
        enumerable: true,
        get: function get() {
          return _utils.findAll;
        }
      });
      Object.defineProperty(exports, 'findChunks', {
        enumerable: true,
        get: function get() {
          return _utils.findChunks;
        }
      });
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
       * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
       */

      var findAll = exports.findAll = function findAll(_ref) {
        var autoEscape = _ref.autoEscape,
            _ref$caseSensitive = _ref.caseSensitive,
            caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
            _ref$findChunks = _ref.findChunks,
            findChunks = _ref$findChunks === undefined ? defaultFindChunks : _ref$findChunks,
            sanitize = _ref.sanitize,
            searchWords = _ref.searchWords,
            textToHighlight = _ref.textToHighlight;
        return fillInChunks({
          chunksToHighlight: combineChunks({
            chunks: findChunks({
              autoEscape: autoEscape,
              caseSensitive: caseSensitive,
              sanitize: sanitize,
              searchWords: searchWords,
              textToHighlight: textToHighlight
            })
          }),
          totalLength: textToHighlight ? textToHighlight.length : 0
        });
      };
      /**
       * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
       * @return {start:number, end:number}[]
       */


      var combineChunks = exports.combineChunks = function combineChunks(_ref2) {
        var chunks = _ref2.chunks;
        chunks = chunks.sort(function (first, second) {
          return first.start - second.start;
        }).reduce(function (processedChunks, nextChunk) {
          // First chunk just goes straight in the array...
          if (processedChunks.length === 0) {
            return [nextChunk];
          } else {
            // ... subsequent chunks get checked to see if they overlap...
            var prevChunk = processedChunks.pop();

            if (nextChunk.start <= prevChunk.end) {
              // It may be the case that prevChunk completely surrounds nextChunk, so take the
              // largest of the end indeces.
              var endIndex = Math.max(prevChunk.end, nextChunk.end);
              processedChunks.push({
                highlight: false,
                start: prevChunk.start,
                end: endIndex
              });
            } else {
              processedChunks.push(prevChunk, nextChunk);
            }

            return processedChunks;
          }
        }, []);
        return chunks;
      };
      /**
       * Examine text for any matches.
       * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
       * @return {start:number, end:number}[]
       */


      var defaultFindChunks = function defaultFindChunks(_ref3) {
        var autoEscape = _ref3.autoEscape,
            caseSensitive = _ref3.caseSensitive,
            _ref3$sanitize = _ref3.sanitize,
            sanitize = _ref3$sanitize === undefined ? defaultSanitize : _ref3$sanitize,
            searchWords = _ref3.searchWords,
            textToHighlight = _ref3.textToHighlight;
        textToHighlight = sanitize(textToHighlight);
        return searchWords.filter(function (searchWord) {
          return searchWord;
        }) // Remove empty words
        .reduce(function (chunks, searchWord) {
          searchWord = sanitize(searchWord);

          if (autoEscape) {
            searchWord = escapeRegExpFn(searchWord);
          }

          var regex = new RegExp(searchWord, caseSensitive ? 'g' : 'gi');
          var match = void 0;

          while (match = regex.exec(textToHighlight)) {
            var _start = match.index;
            var _end = regex.lastIndex; // We do not return zero-length matches

            if (_end > _start) {
              chunks.push({
                highlight: false,
                start: _start,
                end: _end
              });
            } // Prevent browsers like Firefox from getting stuck in an infinite loop
            // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/


            if (match.index === regex.lastIndex) {
              regex.lastIndex++;
            }
          }

          return chunks;
        }, []);
      }; // Allow the findChunks to be overridden in findAll,
      // but for backwards compatibility we export as the old name


      exports.findChunks = defaultFindChunks;
      /**
       * Given a set of chunks to highlight, create an additional set of chunks
       * to represent the bits of text between the highlighted text.
       * @param chunksToHighlight {start:number, end:number}[]
       * @param totalLength number
       * @return {start:number, end:number, highlight:boolean}[]
       */

      var fillInChunks = exports.fillInChunks = function fillInChunks(_ref4) {
        var chunksToHighlight = _ref4.chunksToHighlight,
            totalLength = _ref4.totalLength;
        var allChunks = [];

        var append = function append(start, end, highlight) {
          if (end - start > 0) {
            allChunks.push({
              start: start,
              end: end,
              highlight: highlight
            });
          }
        };

        if (chunksToHighlight.length === 0) {
          append(0, totalLength, false);
        } else {
          var lastIndex = 0;
          chunksToHighlight.forEach(function (chunk) {
            append(lastIndex, chunk.start, false);
            append(chunk.start, chunk.end, true);
            lastIndex = chunk.end;
          });
          append(lastIndex, totalLength, false);
        }

        return allChunks;
      };

      function defaultSanitize(string) {
        return string;
      }

      function escapeRegExpFn(string) {
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      /***/

    }]);
  });
  unwrapExports(dist);
  var dist_1 = dist.findAll;

  var index$1 = {
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
      var chunks = dist_1({
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
      return h('span', _objectSpread({}, contextData), chunks.map(function (chunk, index$$1) {
        var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

        if (chunk.highlight) {
          highlightCount++;
          var isActive = highlightCount === +activeIndex;
          highlightClassNames = "".concat(highlightClassName, " ").concat(isActive ? activeClassName : '');
          highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
          var data = {
            class: highlightClassNames,
            key: index$$1,
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
            key: index$$1,
            style: unhighlightStyle
          }, text);
        }
      }));
    }
  };

  exports.default = index$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue-highlight-words.umd.js.map
