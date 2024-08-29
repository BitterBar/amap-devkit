import { defineComponent, h, onMounted, ref, render, shallowRef } from 'vue'
import { useAmapContext, AMapTagNames } from '@amap-devkit/vue'

const center = [116.106428, 39.95923]

export const TITLE = 'LabelsLayer'
export default defineComponent({
  name: 'AMapLabelsLayer',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    const createLabelsData = (length: number) => {
      return Positions.slice(0, length).map((position) => ({
        position,
        icon: {
          type: 'image',
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          size: [6, 9],
          anchor: 'bottom-center'
        }
      }))
    }

    const count = ref(2000)
    const markers = shallowRef(
      createLabelsData(count.value).map((e) => new AMap.LabelMarker(e as any))
    )

    return {
      count,
      content: document.createElement('div'),
      markers,
      handleUpdateMarkers(e: any) {
        count.value = parseInt(e.target.value)
        markers.value = createLabelsData(count.value).map((e) => new AMap.LabelMarker(e as any))
      }
    }
  },
  render() {
    const { handleUpdateMarkers, count } = this

    render(
      h({
        render() {
          return (
            <ul class="preset-card" style="user-select: none; padding-left: 1.8rem">
              <li style={{ marginBottom: '1em' }}>
                当前数量为
                <u class="accent">
                  <strong>{count}</strong>
                </u>
              </li>
              <li>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  value={count}
                  onInput={handleUpdateMarkers}
                />
              </li>
            </ul>
          )
        }
      }),
      this.content
    )

    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.LABELS_LAYER zooms={[3, 20]} collision={false} markers={this.markers} />

        <AMapTagNames.MARKER
          position={center}
          anchor="center"
          content={this.content}
          topWhenClick
        />
      </AMapTagNames.GROUP>
    )
  }
})
