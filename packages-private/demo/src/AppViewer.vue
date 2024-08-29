<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useViewerStore from '@/store/viewerStore'
import { selectedFeature } from '@/features'
import { AMapMap, type AMapMapInst, overrideGetContext2DReadFrequently } from '@amap-devkit/vue'

// 重写 getContext2D 方法，以便在频繁读取时提高性能
overrideGetContext2DReadFrequently(true)

const amapMapInst = ref<AMapMapInst | null>(null)
const store = useViewerStore()

onMounted(() => {
  const viewer = amapMapInst.value!.viewer
  if (!viewer) return

  store.viewer = viewer
  viewer.on('click', (e) => console.log(e.lnglat.toString()))

  viewer.addControl(
    new window.AMap.Scale({
      visible: true,
      position: {
        left: '10px',
        bottom: '20px'
      }
    })
  )
  viewer.addControl(
    new AMap.ToolBar({
      visible: true,
      position: {
        top: '110px',
        right: '40px'
      }
    })
  )
  viewer.addControl(
    new AMap.ControlBar({
      visible: true,
      position: {
        top: '10px',
        right: '10px'
      }
    })
  )
  viewer.addControl(
    new AMap.HawkEye({
      visible: true,
      position: {
        bottom: '10px',
        right: '10px'
      }
    })
  )
})
</script>

<template>
  <div id="amap-canvas-container">
    <AMapMap
      ref="amapMapInst"
      class="amap-canvas"
      :options="{
        mapStyle: `amap://styles/fresh`
      }"
    >
      <component v-if="selectedFeature" :is="selectedFeature.component" />
    </AMapMap>
  </div>
</template>

<style scoped>
#amap-canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.amap-canvas {
  width: 100%;
  height: 100%;
}
</style>
