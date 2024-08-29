import { defineComponent, onMounted } from 'vue'
import { useAmapContext, AMapTagNames } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.386428, 39.95923]

export const TITLE = 'LabelMarker'
export default defineComponent({
  name: 'AMapLabelMarker',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))
  },
  render() {
    return (
      <AMapTagNames.LABEL_MARKER
        position={center}
        icon={LogoIcon({ size: [128, 128] }, true)}
        text={{
          content: 'AMapLabelMarker',
          direction: 'right',
          style: {
            fontSize: 18,
            fillColor: '#2c3e50',
            strokeWidth: 0,
            padding: [10, 15],
            backgroundColor: 'rgb(237, 232, 215)',
            borderColor: 'rgb(220, 214, 195)',
            borderWidth: 3
          }
        }}
      />
    )
  }
})
