import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useAmapContext, AMapTagNames } from '@amap-devkit/vue'

export const TITLE = 'MassMarks'
export default defineComponent({
  name: 'AMapMassMarks',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
    const style = () => [
      {
        url: 'https://webapi.amap.com/images/mass/mass0.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
        zIndex: 3
      },
      {
        url: 'https://webapi.amap.com/images/mass/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        zIndex: 2
      },
      {
        url: 'https://webapi.amap.com/images/mass/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(5, 5),
        zIndex: 1
      }
    ]

    const overPoint = reactive<{
      name: string
      position: AMap.LngLat | null
    }>({
      name: '',
      position: null
    })
    function handleMouseover(e: any) {
      overPoint.name = e.data.name
      overPoint.position = e.data.lnglat
    }

    function handleMouseout() {
      overPoint.name = ''
      overPoint.position = null
    }

    return {
      style,
      overPoint,
      handleMouseover,
      handleMouseout
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.MASS_MARKS
          data={citys}
          opacity={0.8}
          zIndex={111}
          cursor="pointer"
          style={this.style}
          onMouseover={this.handleMouseover}
          onMouseout={this.handleMouseout}
        />

        {this.overPoint.position && (
          <AMapTagNames.TEXT
            position={this.overPoint.position}
            anchor="bottom-center"
            offset={[0, -20]}
            text={this.overPoint.name}
          />
        )}
      </AMapTagNames.GROUP>
    )
  }
})
