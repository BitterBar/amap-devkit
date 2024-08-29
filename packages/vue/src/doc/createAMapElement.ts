import { compatVShowDirective } from '../compat/vShow'
import { NOOP } from '../utils/noop'
import {
  AMapNodeTypes,
  AMapTagNames,
  handleAppendChild,
  handleRemoveChild,
  type AMapComment,
  type AMapElement,
  type AMapNodeProps
} from '../modules/node'

export function createAMapComment(map: AMapElement, text: string): AMapComment {
  const comment: AMapComment = {
    data: text,
    __amap_node__: {
      root: map,
      type: AMapNodeTypes.COMMENT,
      parentNode: null,
      nextSibling: null,
      children: [],
      removeChild: NOOP,
      remove: () => handleRemoveChild(comment)
    }
  }

  return comment
}

export function createAMapGroup(map: AMapElement): AMapElement {
  const group: AMapElement = {
    __amap_node__: {
      root: map,
      type: AMapNodeTypes.ELEMENT,
      tag: AMapTagNames.GROUP,
      parentNode: null,
      nextSibling: null,
      children: [],
      removeChild: (child) => handleRemoveChild(child),
      remove: () => handleRemoveChild(group),
      appendChild: (child) => handleAppendChild(group, child)
    }
  }

  return compatVShowDirective(group)
}

export function createAMapMaker(map: AMapElement, props: AMapNodeProps): AMapElement {
  const marker = new AMap.Marker(props as any) as unknown as AMapElement
  marker.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.MARKER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(marker),
    appendChild: NOOP
  }

  return compatVShowDirective(marker)
}

export function createAMapPolyline(map: AMapElement, props: AMapNodeProps): AMapElement {
  const polyline = new AMap.Polyline(props as any) as unknown as AMapElement
  polyline.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.POLYLINE,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(polyline),
    appendChild: NOOP
  }

  return compatVShowDirective(polyline)
}

export function createAMapPolygon(map: AMapElement, props: AMapNodeProps): AMapElement {
  // @ts-ignore types: AMap.Polygon的文档中其实是有参数的，但是没有在类型定义中体现
  const polygon = new AMap.Polygon(props as any) as unknown as AMapElement
  polygon.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.POLYGON,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(polygon),
    appendChild: NOOP
  }

  return compatVShowDirective(polygon)
}

export function createAMapRectangle(map: AMapElement, props: AMapNodeProps): AMapElement {
  const rectangle = new AMap.Rectangle(props as any) as unknown as AMapElement
  rectangle.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.RECTANGLE,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(rectangle),
    appendChild: NOOP
  }

  return compatVShowDirective(rectangle)
}

export function createAMapCircle(map: AMapElement, props: AMapNodeProps): AMapElement {
  const circle = new AMap.Circle(props as any) as unknown as AMapElement
  circle.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.CIRCLE,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(circle),
    appendChild: NOOP
  }

  return compatVShowDirective(circle)
}

export function createAMapEllipse(map: AMapElement, props: AMapNodeProps): AMapElement {
  const ellipse = new AMap.Ellipse(props as any) as unknown as AMapElement
  ellipse.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.ELLIPSE,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(ellipse),
    appendChild: NOOP
  }

  return compatVShowDirective(ellipse)
}

export function createAmapMarkerClusterer(map: AMapElement, props: AMapNodeProps): AMapElement {
  const markerClusterer = new AMap.MarkerClusterer(
    map as unknown as AMap.Map,
    [],
    props as any
  ) as unknown as AMapElement
  markerClusterer.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.MARKER_CLUSTERER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(markerClusterer),
    appendChild: NOOP
  }

  return compatVShowDirective(markerClusterer)
}

export function createAMapGeoJSON(map: AMapElement, props: AMapNodeProps): AMapElement {
  // @ts-ignore types: 缺失AMap.GeoJSON的类型定义
  const geoJSON = new AMap.GeoJSON(props as any) as unknown as AMapElement
  geoJSON.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.GEOJSON,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(geoJSON),
    appendChild: NOOP
  }

  return compatVShowDirective(geoJSON)
}

export function createAMapText(map: AMapElement, props: AMapNodeProps): AMapElement {
  const text = new AMap.Text(props as any) as unknown as AMapElement
  text.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.TEXT,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(text),
    appendChild: NOOP
  }

  return compatVShowDirective(text)
}

export function createAMapCircleMarker(map: AMapElement, props: AMapNodeProps): AMapElement {
  const circleMarker = new AMap.CircleMarker(props as any) as unknown as AMapElement
  circleMarker.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.CIRCLE_MARKER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(circleMarker),
    appendChild: NOOP
  }

  return compatVShowDirective(circleMarker)
}

export function createAMapElasticMarker(map: AMapElement, props: AMapNodeProps): AMapElement {
  // @ts-ignore types: 缺失AMap.ElasticMarker的类型定义
  const elasticMarker = new AMap.ElasticMarker(props as any) as unknown as AMapElement
  elasticMarker.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.ELASTIC_MARKER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(elasticMarker),
    appendChild: NOOP
  }

  return compatVShowDirective(elasticMarker)
}

export function createAMapLabelMarker(map: AMapElement, props: AMapNodeProps): AMapElement {
  const labelMarker = new AMap.LabelMarker(props as any) as unknown as AMapElement
  labelMarker.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.LABEL_MARKER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(labelMarker),
    appendChild: NOOP
  }

  return compatVShowDirective(labelMarker)
}

export function createAMapLabelsLayer(map: AMapElement, props: AMapNodeProps): AMapElement {
  const labelsLayer = new AMap.LabelsLayer(props as any) as unknown as AMapElement
  labelsLayer.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.LABELS_LAYER,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(labelsLayer),
    appendChild: NOOP
  }

  return compatVShowDirective(labelsLayer)
}

export function createAMapMassMarks(map: AMapElement, props: AMapNodeProps): AMapElement {
  if (props.style && typeof props.style === 'function') {
    props.style = props.style()
  }

  const massMarks = new AMap.MassMarks([], props as any) as unknown as AMapElement
  massMarks.__amap_node__ = {
    root: map,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.MASS_MARKS,
    parentNode: null,
    nextSibling: null,
    children: [],
    removeChild: NOOP,
    remove: () => handleRemoveChild(massMarks),
    appendChild: NOOP
  }

  return compatVShowDirective(massMarks)
}
