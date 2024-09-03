import { defineComponent, onMounted, shallowRef } from 'vue'
import { useAmapContext, AMapTagNames } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

export const TITLE = 'Polyline'

export default defineComponent({
  name: 'AMapPolyline',
  setup() {
    const ctx = useAmapContext()
    const positions = shallowRef(createPositions())

    function createPositions() {
      return Array.from({ length: 10 }, () => {
        return [
          116.397428 + 0.1 * Math.random(),
          39.90923 + 0.1 * Math.random()
        ]
      })
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
        <AMapTagNames.POLYLINE
          path={this.positions}
          strokeWeight={6}
          borderWeight={3}
          strokeOpacity={1}
          strokeStyle="solid"
          lineJoin="round"
          lineCap="round"
          strokeColor="#2ecc71"
          outlineColor="#7f8c8d"
          isOutline
        />

        <AMapTagNames.MARKER
          position={[116.386428, 39.95923]}
          icon={LogoIcon()}
          onClick={this.handleClick}
          anchor="center"
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
