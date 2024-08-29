import { shallowRef, type Component } from 'vue'

export interface Feature {
  title: string
  component: Component
}

export const selectedFeature = shallowRef<Feature | null>(null)
const modules = import.meta.glob<true, string, Component>('./**/*.feature.tsx', { eager: true })

const features: Feature[] = []
for (const path in modules) {
  const { TITLE, default: component } = modules[path] as any
  features.push({ title: TITLE, component })
}
features.sort((a, b) => a.title.localeCompare(b.title))

export default features
