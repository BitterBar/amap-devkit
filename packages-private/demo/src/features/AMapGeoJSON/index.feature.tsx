/**
 * @title `AMapGeoJSON`使用注意事项
 *
 * ### 以下写法可避免`AMap.GeoJSON`实例化时产生的`geojson格式`错误
 * ```jsx
 * const geojson = shallowRef({
 *  features: []
 * })
 *
 * <AMapGeoJSON geoJSON={geojson.value} />
 * ```
 *
 * ### 或者也可以这么写
 * ```jsx
 * const geojson = shallowRef(null)
 *
 * geojson.value ? <AMapGeoJSON geoJSON={geojson.value} /> : null
 */

import { defineComponent, nextTick, shallowRef } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'

export const TITLE = 'GeoJSON'
export default defineComponent({
  name: 'AMapGeoJSON',
  setup() {
    const ctx = useAmapContext()
    const geojson = shallowRef({
      features: []
    })

    fetch('https://a.amap.com/jsapi_demos/static/geojson/chongqing.json')
      .then((e) => e.json())
      .then((data) => {
        geojson.value = data
        nextTick(() => ctx.viewer.value.setFitView(null, true))
      })

    return () => (
      <AMapTagNames.GEOJSON geoJSON={geojson.value} getPolygon={getPolygon} />
    )
  }
})

function getPolygon(geojson: any, lnglats: AMap.LngLat[][]): AMap.Polygon {
  const area = AMap.GeometryUtil.ringArea(lnglats[0])

  // @ts-ignore
  return new AMap.Polygon({
    path: lnglats,
    fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高
    strokeColor: 'white',
    fillColor: 'red'
  })
}
