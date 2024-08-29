import { defineComponent, onMounted, h, render, ref, onBeforeUnmount } from 'vue'
import { AMapTagNames, useAmapContext } from '@amap-devkit/vue'
import LogoIcon from '../components/LogoIcon'
import randomEmoji from '@/utils/randomEmoji'

export const TITLE = 'Marker'
export default defineComponent({
  name: 'AMapMarker',
  setup() {
    const ctx = useAmapContext()
    onMounted(() => ctx.viewer.value.setFitView(null, true))

    return {
      emoji: ref(randomEmoji()),
      content: document.createElement('div')
    }
  },
  render() {
    const { emoji, content } = this

    render(
      h({
        setup() {
          const blink = ref('preset-card--blink')
          const timeout = setTimeout(() => (blink.value = ''), 1000)
          onBeforeUnmount(() => clearTimeout(timeout))
          return { blink }
        },
        render() {
          return (
            <div class={`preset-card ${this.blink}`} style="white-space: nowrap; user-select: none">
              <h3 class="preset-card__title">Marker{emoji}Content</h3>
              <code>
                <del>Icon</del>
                <ins>Content</ins>
                <ins>Draggable</ins>
              </code>
            </div>
          )
        }
      }),
      content
    )

    return (
      <AMapTagNames.GROUP>
        <AMapTagNames.MARKER
          position={[116.386428, 39.95923]}
          anchor="center"
          icon={LogoIcon({ size: [128, 128] })}
          label={{
            content: `
              <ol class="preset-card" style="user-select: none; padding-left: 1.8rem">
                  <li>点我更新<u>表情</u></li>
                  <li>旁边的<u>Marker</u>可以拖动</li>
              </ol>`,
            direction: 'top',
            offset: [0, -5]
          }}
          onClick={() => (this.emoji = randomEmoji())}
        />

        <AMapTagNames.MARKER
          position={[116.388428, 39.95923]}
          anchor="center"
          content={content}
          draggable
          cursor="move"
        />
      </AMapTagNames.GROUP>
    )
  }
})
