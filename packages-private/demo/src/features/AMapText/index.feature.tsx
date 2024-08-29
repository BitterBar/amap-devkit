import { defineComponent, onMounted, ref } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'

const center = [116.386428, 39.95923]
const markerCenter = [116.386428, 39.96023]

export const TITLE = 'Text'
export default defineComponent({
  name: 'AMapText',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    const color = ref('#2b4b6b')
    const angle = ref(10)

    return {
      color,
      angle,
      handleUpdate() {
        angle.value = Math.random() * 45
        color.value = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      }
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.TEXT
          position={center}
          anchor="center"
          text="纯文本标记"
          angle={this.angle}
          boxShadow="0 2px 6px 0 rgba(114, 124, 245, .5)"
          textAlign="center"
          fontSize="20px"
          color="blue"
          style={{
            padding: '.75rem 1.25rem',
            marginBottom: '1rem',
            borderRadius: '.25rem',
            backgroundColor: 'white',
            width: '15rem',
            borderWidth: 0,
            boxShadow: '0 2px 6px 0 rgba(114, 124, 245, .5)',
            textAlign: 'center',
            fontSize: '20px',
            color: this.color
          }}
        />

        <AMapTagNames.MARKER
          position={markerCenter}
          anchor="center"
          icon={LogoIcon()}
          onClick={this.handleUpdate}
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
