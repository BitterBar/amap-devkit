import { AMapNodeTypes, AMapTagNames, type AMapNode } from './node'

export default function handleSpecialAttribute(
  node: AMapNode,
  key: string,
  prevValue: unknown,
  nextValue: unknown
) {
  if (node.__amap_node__.type === AMapNodeTypes.COMMENT) return

  if (node.__amap_node__.tag === AMapTagNames.GEOJSON) {
    if (key === 'geoJSON') node.importData(nextValue)
    return
  }

  if (node.__amap_node__.tag === AMapTagNames.LABELS_LAYER) {
    if (key === 'markers') {
      node.clear()
      node.add(nextValue)
    }
    return
  }
}
