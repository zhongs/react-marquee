export const raf = () => {
  let lastTime = 0;
  const vendors = ['webkit', 'moz'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) { clearTimeout(id) };
}

export const getStyle = (obj, name) => {
  return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
}


export class Factory {
  constructor() {
    this.factoryArr = []
  }

  create() {
    if (this.factoryArr.length === 0) {
      return document.createElement('div')
    }
    return this.factoryArr.shift()
  }

  recover(div) {
    return this.factoryArr.push(div)
  }
}

export class ScrollError extends Error {
  constructor(message) {
    super()
    this.name = 'scroll error'
    this.message = message
    this.stack = (new Error()).stack
  }
}

function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) == "[object " + type + "]"
  }
}

export const isObject = isType("Object")
export const isString = isType("String")
export const isArray = Array.isArray || isType("Array")
export const isFunction = isType("Function")
export const isUndefined = isType("Undefined")