import { defineComponent, onMounted } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'

export const TITLE = 'ElasticMarker'
export default defineComponent({
  name: 'AMapElasticMarker',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    const styles = [
      {
        icon: {
          img: 'https://a.amap.com/jsapi_demos/static/resource/img/men3.png',
          size: [16, 16], //可见区域的大小
          anchor: 'bottom-center', //锚点
          fitZoom: 14, //最合适的级别
          scaleFactor: 2, //地图放大一级的缩放比例系数
          maxScale: 2, //最大放大比例
          minScale: 1 //最小放大比例
        },
        label: {
          content: '百花殿',
          position: 'BM',
          minZoom: 15
        }
      },
      {
        icon: {
          img: 'https://a.amap.com/jsapi_demos/static/resource/img/tingzi.png',
          size: [48, 63],
          anchor: 'bottom-center',
          fitZoom: 17.5,
          scaleFactor: 2,
          maxScale: 2,
          minScale: 0.125
        },
        label: {
          content: '万寿亭',
          position: 'BM',
          minZoom: 15
        }
      }
    ]

    const zoomStyleMapping = {
      14: 0, // 14级使用样式 0
      15: 0,
      16: 0,
      17: 0,
      18: 1,
      19: 1,
      20: 1
    }

    return {
      styles,
      zoomStyleMapping
    }
  },
  render() {
    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.ELASTIC_MARKER
          position={[116.386428, 39.95923]}
          styles={this.styles}
          zoomStyleMapping={this.zoomStyleMapping}
        />
      </AMapTagNames.GROUP>
    )
  }
})
