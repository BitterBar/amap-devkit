<script setup lang="ts">
import AppViewer from './AppViewer.vue'
</script>

<template>
  <div class="map-container">
    <AppViewer />
  </div>
</template>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background-color: var(--hover-color);
}
</style>
