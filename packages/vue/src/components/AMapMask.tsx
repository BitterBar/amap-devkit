import { defineComponent, computed } from 'vue'

declare const AMapPolygon: any

export default defineComponent({
  name: 'AMapMask',
  props: {} as Record<string, any>,
  setup(_, { attrs }) {
    const outer = [
      new window.AMap.LngLat(-360, 90, true),
      new window.AMap.LngLat(-360, -90, true),
      new window.AMap.LngLat(360, -90, true),
      new window.AMap.LngLat(360, 90, true)
    ]
    const positions = computed(() => [outer, attrs.path])

    return () => <AMapPolygon {...attrs} path={positions.value} />
  }
})
