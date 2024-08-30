const whitelist = ['AMapMap', 'AMapMask']

/**
 * @param {string} tag
 */
function templateIsCustomElement(tag) {
  return tag.startsWith('AMap') && !whitelist.includes(tag)
}

exports.templateIsCustomElement = templateIsCustomElement
