import { type AMapElement } from './modules/node'
import handleSpecialAttribute from './modules/handleSpecialAttribute'
import { isOn, isModelListener } from './utils/general'

export function patchProp(el: AMapElement, key: string, prevValue: unknown, nextValue: unknown) {
  /**
   * 在Vue中，`props.style`属性类型是对象、字符串、者字符串数组
   * 这和高德地图api中某些类中的`style`属性类型不一致，比如对象数组
   */
  if (key === 'style' && typeof nextValue === 'function') {
    nextValue = nextValue()
  }

  if (isOn(key) && el.on) {
    // 必须跳过model监听器，因为它们需要特殊处理
    if (!isModelListener(key)) {
      const event = key[2] === ':' ? key.slice(3) : key.slice(2).toLowerCase()
      if (prevValue) el.off(event, prevValue)
      if (nextValue) el.on(event, nextValue)
    }

    return
  }

  // 将key的首字符转换为大写
  const set = `set${capitalizeFirstLetter(key)}`
  if (el[set]) {
    el[set](nextValue)
  } else {
    handleSpecialAttribute(el, key, prevValue, nextValue)
  }
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
