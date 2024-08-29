import { defineComponent, onMounted, shallowRef } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.386428, 39.95923]

export const TITLE = 'Polygon'
export default defineComponent({
  name: 'AMapPolygon',
  setup() {
    const ctx = useAmapContext()
    const positions = shallowRef(createPositions())

    function createPositions() {
      const top = [center[0], center[1] + 0.1 + Math.random() * 0.2]
      const bottomLeft = [
        center[0] - 0.1 + Math.random() * 0.2,
        center[1] - 0.1 + Math.random() * 0.2
      ]
      const bottomRight = [
        center[0] + 0.1 + Math.random() * 0.2,
        center[1] - 0.1 + Math.random() * 0.2
      ]
      return [top, bottomLeft, bottomRight]
    }

    onMounted(() => ctx.viewer.value.setFitView(null, true))

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
        <AMapTagNames.POLYGON
          path={this.positions}
          fillColor="rgb(218, 214, 198)"
          fillOpacity={0.85}
          strokeWeight={6}
          strokeDasharray={[30, 10]}
          strokeOpacity={0.5}
          strokeStyle="dashed"
          strokeColor="#2c3e50"
        />

        <AMapTagNames.MARKER
          position={center}
          icon={LogoIcon()}
          onClick={this.handleClick}
          anchor="center"
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
