import {
  inject,
  provide,
  shallowRef,
  onUnmounted,
  type ShallowRef,
  type RootRenderFunction
} from 'vue'

import createAMapMap from '../../doc/createAMapMap'
import { amapContextInjectKey } from '../../injectKey'
import type { AMapElement } from '../../modules/node'

export interface AmapContext {
  viewer: ShallowRef<AMapElement>
  render: ShallowRef<RootRenderFunction<AMapElement> | null>
}

export function useAmapContextProvider({
  viewer,
  render
}: {
  viewer: AMap.Map
  render?: RootRenderFunction<AMapElement>
}): AmapContext {
  const ctx: AmapContext = {
    viewer: shallowRef<AMapElement>(createAMapMap(viewer)),
    render: shallowRef(render || null)
  }

  provide(amapContextInjectKey, ctx)
  onUnmounted(() => viewer.destroy())

  return ctx
}

export function useAmapContext(): AmapContext {
  const context = inject<Partial<AmapContext>>(amapContextInjectKey)

  if (!context) {
    throw new Error(
      'useAmapContext must be used together with useAmapContextProvider'
    )
  }

  return context as AmapContext
}
