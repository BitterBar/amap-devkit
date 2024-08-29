import { AMapTagNames, type AMapElement, type AMapNodeProps } from '../modules/node'
import * as element from './createAMapElement'

function createAMapElement(map: AMapElement, tag: string, props: AMapNodeProps) {
  if (tag === AMapTagNames.TEXT) return element.createAMapText(map, props)
  if (tag === AMapTagNames.GROUP) return element.createAMapGroup(map)
  if (tag === AMapTagNames.MARKER) return element.createAMapMaker(map, props)
  if (tag === AMapTagNames.CIRCLE) return element.createAMapCircle(map, props)
  if (tag === AMapTagNames.POLYGON) return element.createAMapPolygon(map, props)
  if (tag === AMapTagNames.ELLIPSE) return element.createAMapEllipse(map, props)
  if (tag === AMapTagNames.GEOJSON) return element.createAMapGeoJSON(map, props)
  if (tag === AMapTagNames.POLYLINE) return element.createAMapPolyline(map, props)
  if (tag === AMapTagNames.RECTANGLE) return element.createAMapRectangle(map, props)
  if (tag === AMapTagNames.MASS_MARKS) return element.createAMapMassMarks(map, props)
  if (tag === AMapTagNames.LABEL_MARKER) return element.createAMapLabelMarker(map, props)
  if (tag === AMapTagNames.LABELS_LAYER) return element.createAMapLabelsLayer(map, props)
  if (tag === AMapTagNames.CIRCLE_MARKER) return element.createAMapCircleMarker(map, props)
  if (tag === AMapTagNames.ELASTIC_MARKER) return element.createAMapElasticMarker(map, props)
  if (tag === AMapTagNames.MARKER_CLUSTERER) return element.createAmapMarkerClusterer(map, props)

  throw new Error(`[Amap-Devkit] Invalid element tag: ${tag}`)
}

export default {
  createAMapElement,
  createAMapComment: element.createAMapComment
}
