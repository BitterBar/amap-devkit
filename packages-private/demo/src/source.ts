// 中心经纬度（北京市）
const center = new AMap.LngLat(116.397428, 39.90923)

/**
 * @description 视角飞到中心点
 */
export function flyHome(viewer: AMap.Map) {
  viewer.setZoomAndCenter(16, center)
}
