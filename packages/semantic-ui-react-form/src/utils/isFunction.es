export function isFunction(value) {
  return !!(value && value.constructor && value.call && value.apply); // highly performant from underscore
}
