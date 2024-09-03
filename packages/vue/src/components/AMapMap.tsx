import {
  getCurrentInstance,
  defineComponent,
  createRenderer,
  onUnmounted,
  shallowRef,
  onMounted,
  Fragment,
  provide,
  ref,
  h,
  type PropType,
  type App
} from 'vue'
import {
  useAmapContextProvider,
  type AmapContext
} from '../composables/useAmapContextProvider'
import { amapContextInjectKey } from '../injectKey'
import type { AMapElement } from '../modules/node'
import { createNodeOps } from '../nodeOps'

export interface AMapMapInst {
  viewer: AMap.Map | null
}

export default defineComponent({
  name: 'AmapMap',
  props: {
    options: Object as PropType<AMap.MapOptions>
  },
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance()?.appContext.app
    const container = ref<HTMLDivElement | null>(null)
    const viewer = shallowRef<AMap.Map | null>(null)
    expose({ viewer })

    function createInternalComponent(context: AmapContext, empty = false) {
      return defineComponent({
        setup() {
          const ctx = getCurrentInstance()?.appContext
          if (ctx) {
            ctx.app = instance as App
          }

          provide(amapContextInjectKey, context)
          return () => h(Fragment, null, !empty ? slots.default?.() : [])
        }
      })
    }

    function mountCustomRenderer(context: AmapContext, empty = false) {
      const InternalComponent = createInternalComponent(context, empty)
      const { render } = createRenderer(createNodeOps(context))
      context.render.value = render
      render(
        h(InternalComponent),
        context.viewer.value as unknown as AMapElement
      )
    }

    onMounted(() => {
      viewer.value = new window.AMap.Map(container.value!, props.options)
      const ctx = useAmapContextProvider({ viewer: viewer.value })
      mountCustomRenderer(ctx)
      onUnmounted(() => mountCustomRenderer(ctx, true))
    })

    return () => <div ref={container}></div>
  }
})
