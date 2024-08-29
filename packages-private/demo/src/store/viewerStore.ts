import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

const useViewerStore = defineStore('viewer', () => {
  const viewer = shallowRef<AMap.Map | null>(null)
  return { viewer }
})

export default useViewerStore
