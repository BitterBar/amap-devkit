import { defineComponent, onMounted, ref } from 'vue'
import { useAmapContext, AMapTagNames } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.386428, 39.95923]

export const TITLE = 'Circle'
export default defineComponent({
  name: 'AMapCircle',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))
    const radius = ref(600)

    return {
      radius,
      handleUpdateRadius() {
        radius.value = 600 + Math.random() * 400
      }
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.CIRCLE
          center={center}
          radius={this.radius}
          borderWeight={3}
          strokeColor="#2c3e50"
          strokeWeight={6}
          strokeOpacity={0.5}
          strokeStyle="dashed"
          strokeDasharray={[10, 10]}
          fillColor="rgb(218, 214, 198)"
          fillOpacity={0.85}
        />

        <AMapTagNames.MARKER
          position={center}
          anchor="center"
          icon={LogoIcon()}
          onClick={this.handleUpdateRadius}
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
