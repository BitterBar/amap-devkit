import {
  AMapNodeTypes,
  AMapTagNames,
  type AMapElement,
  type AMapElementStyle
} from '../modules/node'

function handleSetAMapElementDisplay(
  node: AMapElement,
  value: string,
  style: AMapElementStyle
): boolean {
  style._display = value

  if (node.__amap_node__.tag === AMapTagNames.MARKER_CLUSTERER) {
    if (value !== 'none') node.setMap(node.__amap_node__.root)
    else node.setMap(null)
    return true
  }

  if (node.__amap_node__.tag === AMapTagNames.GROUP) {
    node.__amap_node__.children.forEach((child) => {
      if (child.__amap_node__.type !== AMapNodeTypes.COMMENT) {
        handleSetAMapElementDisplay(child as AMapElement, value, style)
      }
    })
    return true
  }

  if (value !== 'none') node.show()
  else node.hide()
  return true
}

function handleGetAMapElementDisplay(node: AMapElement, style: AMapElementStyle) {
  if (node.__amap_node__.tag === AMapTagNames.MARKER_CLUSTERER) {
    return node.getMap() ? 'block' : 'none'
  }

  if (
    node.__amap_node__.tag === AMapTagNames.GROUP ||
    node.__amap_node__.tag === AMapTagNames.GEOJSON ||
    node.__amap_node__.tag === AMapTagNames.CIRCLE
  ) {
    return style._display
  }

  return node.getVisible() ? 'block' : 'none'
}

export function compatVShowDirective(node: AMapElement) {
  if (!node.style) node.style = {}
  else {
    node.style._display = 'block'
  }

  node.style = new Proxy<AMapElementStyle>(node.style, {
    set(target, key, value, receiver) {
      if (key === 'display') return handleSetAMapElementDisplay(node, value, target)
      return Reflect.set(target, key, value, receiver)
    },
    get(target, key, receiver) {
      if (key === 'display') return handleGetAMapElementDisplay(node, target)
      return Reflect.get(target, key, receiver)
    }
  })

  return node
}
