import { defineComponent, onMounted, shallowRef } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.396428, 39.93823]

export const TITLE = 'Rectangle'
export default defineComponent({
  name: 'AMapRectangle',
  setup() {
    const ctx = useAmapContext()
    const bounds = shallowRef(createBounds())

    function createBounds() {
      const southWest = [116.380298, 39.92235]
      const northEast = [116.414977, 39.947246]

      southWest[1] += Math.random() * 0.01
      northEast[1] += Math.random() * 0.01

      return new AMap.Bounds(southWest, northEast)
    }

    onMounted(() => ctx.viewer.value.setFitView(null, true))

    return {
      bounds,
      handleUpdateBounds() {
        bounds.value = createBounds()
      }
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.RECTANGLE
          bounds={this.bounds}
          strokeColor="#2c3e50"
          strokeWeight={6}
          strokeOpacity={0.5}
          strokeDasharray={[30, 10]}
          strokeStyle="dashed"
          fillColor="rgb(218, 214, 198)"
          fillOpacity={0.85}
          cursor="pointer"
        />

        <AMapTagNames.MARKER
          position={center}
          anchor="center"
          icon={LogoIcon()}
          onClick={this.handleUpdateBounds}
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
