import type { InjectionKey } from 'vue'
import type { AmapContext } from './composables/useAmapContextProvider'

export const amapContextInjectKey: InjectionKey<AmapContext> =
  Symbol('AMapContext')
