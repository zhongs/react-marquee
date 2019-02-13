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