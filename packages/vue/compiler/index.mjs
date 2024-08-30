const whitelist = ['AMapMap', 'AMapMask']

/**
 * @param {string} tag
 */
export function templateIsCustomElement(tag) {
  return tag.startsWith('AMap') && !whitelist.includes(tag)
}
