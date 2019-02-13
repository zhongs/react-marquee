export default function getStyle(obj, name) {
  return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
}
