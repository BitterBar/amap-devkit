import { defineProps } from '../../modules/elementProps'
import type MarkerElement from './element'

export default defineProps<MarkerElement>({
  viewer: {
    type: AMap.Map,
    update(value?: AMap.Map | null) {
      this.instance?.setMap(value)
    }
  },
  position: {
    type: Object,
    update(value: AMap.Vector2) {
      this.instance?.setPosition(value)
    }
  },
  icon: {
    type: [AMap.Icon, String],
    update(value: string | AMap.Icon) {
      this.instance?.setIcon(value)
    }
  },
  content: {
    type: [String, HTMLElement],
    update(value: string | HTMLElement) {
      this.instance?.setContent(value)
    }
  },
  title: {
    type: String,
    update(value: string) {
      this.instance?.setTitle(value)
    }
  },
  visible: {
    type: Boolean,
    update(value: boolean) {
      if (value) {
        this.instance?.show()
      } else {
        this.instance?.hide()
      }
    }
  },
  zIndex: {
    type: Number,
    update(value: number) {
      this.instance?.setzIndex(value)
    }
  },
  offset: {
    type: AMap.Pixel,
    update(value: AMap.Pixel) {
      this.instance?.setOffset(value)
    }
  },
  anchor: {
    type: String,
    update(value: string) {
      this.instance?.setAnchor(value)
    }
  },
  angle: {
    type: Number,
    update(value: number) {
      this.instance?.setAngle(value)
    }
  },
  bubble: {
    type: Boolean
  },
  clickable: {
    type: Boolean,
    update(value: boolean) {
      this.instance?.setClickable(value)
    }
  },
  draggable: {
    type: Boolean,
    update(value: boolean) {
      this.instance?.setDraggable(value)
    }
  },
  cursor: {
    type: String,
    update(value: string) {
      this.instance?.setCursor(value)
    }
  },
  label: {
    type: Object,
    update(value: any) {
      this.instance?.setLabel(value)
    }
  },
  extData: {
    type: Object,
    update(value: Record<string, unknown>) {
      this.instance?.setExtData(value)
    }
  }
})
