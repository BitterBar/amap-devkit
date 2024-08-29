const whitelist = ['AMapMap', 'AMapMask']

export default function templateiIsCustomElement(tag) {
  return tag.startsWith('AMap') && !whitelist.includes(tag)
}
