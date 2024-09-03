/**
 * @param {string} tag
 */
function isCustomElement(tag) {
  return tag.startsWith('amap-')
}

exports.isCustomElement = isCustomElement
