import { markRaw, type RendererOptions } from 'vue'
import type { AmapContext } from './composables/useAmapContextProvider'
import { type AMapElement, type AMapNode } from './modules/node'
import { patchProp } from './patchProp'
import { NOOP } from './utils/noop'
import doc from './doc'

export function createNodeOps(context: AmapContext): RendererOptions<AMapNode, AMapElement> {
  const viewer = context.viewer.value

  return {
    insert: (child, parent) => {
      if (!child) return
      parent = parent || viewer
      parent.__amap_node__.appendChild(child)
    },

    remove: (child) => {
      if (!child) return
      child.__amap_node__.remove()
    },

    parentNode: (node) => {
      if (!node) return null
      return node.__amap_node__.parentNode
    },

    nextSibling: (node) => {
      if (!node) return null
      return node.__amap_node__.nextSibling
    },

    createElement: (tag, namespace, is, props) => {
      if (!props) props = {}
      return markRaw(doc.createAMapElement(viewer, tag, props))
    },

    createComment: (text) => {
      return doc.createAMapComment(viewer, text)
    },

    patchProp,

    setText: NOOP,
    cloneNode: NOOP,
    createText: NOOP,
    setScopeId: NOOP,
    querySelector: NOOP,
    setElementText: NOOP,
    insertStaticContent: NOOP
  }
}
