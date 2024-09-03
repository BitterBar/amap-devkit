import MapElement, { type MapElementCtx } from '../../modules/MapElement'
import defineCustomElement from '../../_utils/defineCustomElement'
import { defined } from '../../_utils/var'
import props from './props'

export default class MapViewerElement extends HTMLDivElement {
  static readonly name = 'amap-viewer'
  static readonly EventType = Object.freeze({
    UpdateCtx: 'update:ctx'
  })

  ctx?: MapElementCtx

  private readonly props = props
  private readonly _observer: MutationObserver

  constructor(private readonly _props: Record<string, any> = {}) {
    super()
    this._observer = new MutationObserver(this.handleMutations.bind(this))
    this._observer.observe(this, {
      childList: true,
      subtree: true
    })
    this._resolveProps()
  }

  connectedCallback() {
    this._render()
  }

  disconnectedCallback() {
    this._observer.disconnect()
    if (this.ctx?.viewer) this.ctx.viewer.destroy()
  }

  private _render() {
    if (!this.ctx) this.ctx = {}
    this.ctx.viewer = new AMap.Map(this, this._props)
    this.dispatchEvent(
      new CustomEvent(MapViewerElement.EventType.UpdateCtx, {
        detail: this.ctx
      })
    )
  }

  private handleMutations(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof MapElement) {
            node.ctx = this.ctx
            this.addEventListener(
              MapViewerElement.EventType.UpdateCtx,
              () => (node.ctx = this.ctx)
            )
          }
        })
      }
    }
  }

  private _resolveProps() {
    const propKeys = Object.keys(this.props)

    for (const key of Object.keys(this)) {
      if (key[0] !== '_' && propKeys.includes(key)) {
        this._props[key] = this[key as keyof this]
      }
    }

    for (const key of propKeys) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key)
        },
        set(val) {
          this._setProp(key, val, true)
        }
      })
    }
  }

  protected _getProp(key: string): any {
    return this._props[key]
  }

  protected _setProp(key: string, val: any, shouldUpdate = false): void {
    if (val !== this._props[key]) {
      if (val === undefined) {
        val = this._defaultPropValue(key, val)
      }
      this._props[key] = val

      if (shouldUpdate) {
        this.props[key].update?.call(this, val)
      }
    }
  }

  private _defaultPropValue(key: string, val: unknown): any {
    const prop = this.props[key]
    if (!defined(prop.default)) return val
    return prop.default instanceof Function ? prop.default() : prop.default
  }
}

defineCustomElement(MapViewerElement.name, MapViewerElement, { extends: 'div' })
