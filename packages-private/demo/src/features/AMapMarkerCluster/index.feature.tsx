import { defineComponent, onMounted, shallowRef } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

export const TITLE = 'MarkerCluster'
export default defineComponent({
  name: 'AMapMarkerCluster',
  setup() {
    const ctx = useAmapContext()
    const positions = shallowRef(createPositions())

    function createPositions() {
      return Array.from({ length: 10000 }, () => {
        return {
          weight: 1,
          lnglat: [116.397428 + 0.1 * Math.random(), 39.90923 + 0.1 * Math.random()]
        }
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
        <AMapTagNames.MARKER_CLUSTERER gridSize={80} data={this.positions} />

        <AMapTagNames.MARKER
          position={[116.397428, 39.90923]}
          icon={LogoIcon({ size: [128, 128] })}
          onClick={this.handleClick}
          topWhenClick
          anchor="center"
        />
      </AMapTagNames.GROUP>
    )
  }
})
