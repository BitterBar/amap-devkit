import { defineProps } from '../../modules/elementProps'
import type MapViewerElement from './element'

export default defineProps<MapViewerElement>({
  mapStyle: {
    type: String,
    update(value: string) {
      this.ctx?.viewer?.setMapStyle(value)
    }
  },
  center: {
    type: Object,
    update(value: [number, number]) {
      this.ctx?.viewer?.setCenter(value)
    }
  }
})
