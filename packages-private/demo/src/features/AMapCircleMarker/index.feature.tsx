import { defineComponent, onMounted, shallowRef } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.386428, 39.95923]
function createPositions(): AMap.LngLatLike[] {
  return Array.from({ length: 10 }, (_, i) => [
    center[0] + Math.random() * 0.1 * (i % 2 ? 1 : -1),
    center[1] + Math.random() * 0.1 * (i % 2 ? 1 : -1)
  ])
}

export const TITLE = 'CircleMarker'
export default defineComponent({
  name: 'AMapCircleMarker',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    const positions = shallowRef(createPositions())

    return {
      positions,
      handleClick() {
        positions.value = createPositions()
      }
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        {this.positions.map((position, index) => (
          <AMapTagNames.CIRCLE_MARKER
            key={index}
            center={position}
            radius={10 + Math.random() * 10}
            strokeColor="#2c3e50"
            strokeWeight={6}
            strokeOpacity={0.5}
            fillColor="rgb(218, 214, 198)"
            fillOpacity={0.85}
            bubble
            cursor="pointer"
            clickable
          />
        ))}

        <AMapTagNames.MARKER
          position={center}
          icon={LogoIcon({ size: [128, 128] })}
          onClick={this.handleClick}
          topWhenClick
          anchor="center"
        />
      </AMapTagNames.GROUP>
    )
  }
})
