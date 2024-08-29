import { NOOP } from '../utils/noop'
import {
  AMapNodeTypes,
  AMapTagNames,
  handleAppendChild,
  handleRemoveChild,
  type AMapElement
} from '../modules/node'

export default function createAMapMap(map: AMap.Map): AMapElement {
  const element = map as unknown as AMapElement
  element.__amap_node__ = {
    root: element,
    type: AMapNodeTypes.ELEMENT,
    tag: AMapTagNames.MAP,
    parentNode: null,
    nextSibling: null,
    children: [],
    remove: NOOP,
    removeChild: (child) => handleRemoveChild(child),
    appendChild: (child) => handleAppendChild(element, child)
  }

  return element
}
