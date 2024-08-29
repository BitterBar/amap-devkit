import { defineComponent, onMounted, shallowRef } from 'vue'
import { useAmapContext, AMapMask, AMapTagNames } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [120.236503, 30.274233]

function createCirclePositions(radius: number) {
  const positions = []
  for (let i = 0; i < 360; i += 20) {
    positions.push([
      center[0] + radius * Math.cos((i * Math.PI) / 180),
      center[1] + radius * Math.sin((i * Math.PI) / 180)
    ])
  }
  return positions as unknown as AMap.LngLat[]
}

export const TITLE = 'Mask'
export default defineComponent({
  name: 'AMapMask',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setZoomAndCenter(10, center, true))

    const path = shallowRef(createCirclePositions(0.5))

    return {
      path,
      handleUpdatePath() {
        path.value = createCirclePositions(0.5 + Math.random() * 0.5)
      }
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapMask
          path={this.path}
          fillColor="rgb(218, 214, 198)"
          fillOpacity={0.85}
          strokeWeight={0}
        />

        <AMapTagNames.MARKER
          position={center}
          icon={LogoIcon()}
          onClick={this.handleUpdatePath}
          topWhenClick
          anchor="center"
        />
      </AMapTagNames.GROUP>
    )
  }
})
