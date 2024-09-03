<script setup lang="ts">
const center = [116.707428, 39.90923]
</script>

<template>
  <div
    is="amap-viewer"
    class="amap-viewer"
    mapStyle="amap://styles/fresh"
    :center
  >
    <amap-marker :position="center" />
  </div>
</template>

<style>
.amap-viewer {
  width: 100%;
  height: 100%;
}
</style>
