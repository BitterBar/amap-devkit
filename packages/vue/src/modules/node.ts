import type { VNodeProps } from 'vue'

export interface AMapElementStyle {
  [key: string]: unknown
}

export interface AMapComment {
  [key: string]: any

  data: string
  __amap_node__: {
    root: AMapElement // AMap.Map
    type: AMapNodeTypes.COMMENT
    parentNode: AMapElement | null
    nextSibling: AMapNode | null
    children: AMapNode[]
    remove(): void
    removeChild(child: AMapNode): void
  }
}

export interface AMapElement {
  [key: string]: any

  __amap_node__: {
    root: AMapElement // AMap.Map
    type: AMapNodeTypes.ELEMENT
    tag: AMapTagNames | string
    parentNode: AMapElement | null
    nextSibling: AMapNode | null
    children: AMapNode[]
    remove(): void
    removeChild(child: AMapNode): void
    appendChild(child: AMapNode): void
  }
}

export type AMapNode = AMapElement | AMapComment

export type AMapNodeProps = VNodeProps & {
  [key: string]: any
}

export enum AMapNodeTypes {
  ELEMENT = 'element',
  COMMENT = 'comment'
}

export enum AMapTagNames {
  MARKER_CLUSTERER = 'AMapMarkerCluster',
  ELASTIC_MARKER = 'AMapElasticMarker',
  CIRCLE_MARKER = 'AMapCircleMarker',
  LABEL_MARKER = 'AMapLabelMarker',
  LABELS_LAYER = 'AMapLabelsLayer',
  MASS_MARKS = 'AMapMassMarks',
  RECTANGLE = 'AMapRectangle',
  POLYLINE = 'AMapPolyline',
  GEOJSON = 'AMapGeoJSON',
  POLYGON = 'AMapPolygon',
  ELLIPSE = 'AMapEllipse',
  CIRCLE = 'AMapCircle',
  MARKER = 'AMapMarker',
  TEXT = 'AMapText',

  // built-in components
  MAP = 'AMapMap',
  GROUP = 'AMapGroup'
}

/**
 * 查找节点的最后一个子节点
 */
export function findLastChild(node: AMapElement): AMapNode | null {
  const children = node.__amap_node__.children
  return children.length > 0 ? children[children.length - 1] : null
}

/**
 * 查找节点同级下的after、before兄弟节点
 */
export function findSibling(node: AMapNode, type: 'before' | 'after'): AMapNode | null {
  const parent = node.__amap_node__.parentNode
  if (!parent) return null

  const siblings = parent.__amap_node__.children
  const index = siblings.indexOf(node)
  if (index === -1) return null

  return (type === 'before' ? siblings[index - 1] : siblings[index + 1]) || null
}

/**
 * 判断是可以直接被AMap.Map添加的节点
 */
export function canBeAddedToAMapMap(node: AMapNode): boolean {
  return (
    node.__amap_node__.type === AMapNodeTypes.ELEMENT &&
    node.__amap_node__.tag !== AMapTagNames.GROUP
  )
}

/**
 * 添加子节点
 * @link https://dom.spec.whatwg.org/#dom-node-appendchild
 */
export function handleAppendChild(parent: AMapElement, child: AMapNode) {
  const lastChild = findLastChild(parent)
  if (lastChild) {
    lastChild.__amap_node__.nextSibling = child
  }
  child.__amap_node__.parentNode = parent
  parent.__amap_node__.children.push(child)

  if (canBeAddedToAMapMap(child)) {
    if (child.setMap) {
      child.setMap(parent.__amap_node__.root)
    } else {
      parent.__amap_node__.root.add(child)
    }
  }

  return child
}

/**
 * 删除子节点
 * @link https://dom.spec.whatwg.org/#dom-node-removechild
 */
export function handleRemoveChild(child: AMapNode): AMapNode | null {
  const parent = child.__amap_node__.parentNode
  if (!parent) return null

  const parentChildren = parent.__amap_node__.children
  const index = parentChildren.indexOf(child)

  if (index > -1) {
    const beforeSibling = findSibling(child, 'before')
    if (beforeSibling) beforeSibling.__amap_node__.nextSibling = child.__amap_node__.nextSibling
    parentChildren.splice(index, 1)
  }

  child.__amap_node__.parentNode = null
  child.__amap_node__.nextSibling = null

  clearAMapFilthyNode(child)
  return child
}

/**
 * 深度递归该节点下的所有后代节点
 */
export function deepTraverseAMapNode(node: AMapNode, callback: (node: AMapNode) => void) {
  callback(node)

  if (node.__amap_node__.children.length) {
    node.__amap_node__.children.forEach((child) => deepTraverseAMapNode(child, callback))
  }
}

/**
 * 递归那些被AMap.Map添加的节点，把它们从地图中清除掉
 */
export function clearAMapFilthyNode(child: AMapNode) {
  deepTraverseAMapNode(child, (node) => {
    if (node.__amap_node__.type === AMapNodeTypes.COMMENT) return
    if (canBeAddedToAMapMap(node)) {
      node.__amap_node__.root.remove(node)
      if (typeof node.setMap === 'function') node.setMap(null)
    }
  })
}
