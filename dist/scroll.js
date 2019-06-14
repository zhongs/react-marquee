(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Scroll = factory());
}(this, function () { 'use strict';

  function isType(type) {
    return function (obj) {
      return {}.toString.call(obj) == "[object " + type + "]";
    };
  }
  var isString = isType("String");

  var raf = function raf() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Factory = function () {
    function Factory() {
      classCallCheck(this, Factory);

      this.factoryArr = [];
    }

    createClass(Factory, [{
      key: 'create',
      value: function create() {
        if (this.factoryArr.length === 0) {
          return document.createElement('div');
        }
        return this.factoryArr.shift();
      }
    }, {
      key: 'recover',
      value: function recover(div) {
        return this.factoryArr.push(div);
      }
    }]);
    return Factory;
  }();

  var ScrollError = function (_Error) {
    inherits(ScrollError, _Error);

    function ScrollError(message) {
      classCallCheck(this, ScrollError);

      var _this = possibleConstructorReturn(this, (ScrollError.__proto__ || Object.getPrototypeOf(ScrollError)).call(this));

      _this.name = 'scroll error';
      _this.message = message;
      _this.stack = new Error().stack;
      return _this;
    }

    return ScrollError;
  }(Error);

  function getStyle(obj, name) {
    return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
  }

  var Scroll = function () {
    function Scroll() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Scroll);

      this.defalut = {
        box: '', // scroll container required
        globalStyle: '', // set scroll data global style
        direction: 'left', // scroll direction
        data: [] // scroll data required
      };
      this._init(config);
    }

    createClass(Scroll, [{
      key: '_init',
      value: function _init(config) {

        this.config = Object.assign(this.defalut, config);
        var box = this.config.box;


        if (box) {
          this.container = isString(box) ? document.getElementById(box) : box;
        } else {
          throw new ScrollError('be sure to pass in box');
        }

        if (!window.requestAnimationFrame) {
          raf();
        }

        this.factory = new Factory();
      }
    }, {
      key: 'start',
      value: function start() {
        var data = this.config.data;

        var itemData = data.shift();
        var style = this.getScrollStyle(itemData);
        var scrollItem = this.factory.create();

        scrollItem.setAttribute('class', style);
        scrollItem.innerHTML = itemData.txt;

        this.container.appendChild(scrollItem);

        var transform = getStyle(scrollItem, 'transform');
        console.log('transform', transform);
      }
    }, {
      key: 'pause',
      value: function pause() {}
    }, {
      key: 'getScrollStyle',
      value: function getScrollStyle() {
        var itemData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref = this.config || '',
            globalStyle = _ref.globalStyle;

        var _ref2 = itemData || '',
            itemStyle = _ref2.itemStyle;

        return itemStyle || globalStyle;
      }
    }]);
    return Scroll;
  }();

  return Scroll;

}));
