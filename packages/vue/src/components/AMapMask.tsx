import { defineComponent } from 'vue'
import { AMapTagNames } from '../modules/node'

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

    return () => <AMapTagNames.POLYGON {...attrs} path={[outer, attrs.bounds]} />
  }
})
