import { camelize, defined, toNumber } from '../_utils/var'
import type { PropOptions } from './elementProps'

const REMOVAL = {}

export interface MapElementCtx {
  viewer?: AMap.Map
}

export default class MapElement<
  T extends Record<string, PropOptions> = any
> extends HTMLElement {
  // defined in props
  declare viewer?: AMap.Map
  static readonly name: string

  // AMap instance
  instance: any
  protected _events: { [key: string]: EventListenerOrEventListenerObject[] } =
    {}
  protected _numberProps: Record<string, true> | null = null
  protected _booleanProps: Record<string, true> | null = null
  protected _observer: MutationObserver
  protected _ctx?: MapElementCtx
  set ctx(val) {
    this._ctx = val
    this.viewer = val?.viewer
  }
  get ctx() {
    return this._ctx
  }

  constructor(
    protected readonly props: T,
    protected readonly _props: Record<string, any> = {}
  ) {
    super()
    this._observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName!)
      }
    })
    this._observer.observe(this, { attributes: true })
    this._resolveDef()
    this._resolveProps()
  }

  disconnectedCallback() {
    this._observer.disconnect()
  }

  protected _setAttr(key: string): void {
    if (key.startsWith('data-amap-')) return
    const camelKey = camelize(key)
    if (!this.props[camelKey]) return

    const has = this.hasAttribute(key)
    let value = has ? this.getAttribute(key) : REMOVAL

    if (has) {
      if (this._numberProps && this._numberProps[camelKey]) {
        value = toNumber(value)
      } else if (this._booleanProps && this._booleanProps[camelKey]) {
        value =
          typeof value === 'string'
            ? value === 'true' || value === ''
            : Boolean(value)
      }
    }
    this._setProp(camelKey, value, true)
  }

  private _resolveDef() {
    const { props } = this

    let numberProps
    let booleanProps
    for (const key in props) {
      const opt = props[key]
      if (opt.type === Number) {
        if (key in this._props) {
          this._props[key] = toNumber(this._props[key])
        }
        ;(numberProps || (numberProps = Object.create(null)))[camelize(key)] =
          true
      } else if (opt.type === Boolean) {
        if (key in this._props) {
          this._props[key] = Boolean(this._props[key])
        }
        ;(booleanProps || (booleanProps = Object.create(null)))[camelize(key)] =
          true
      }
    }
    this._numberProps = numberProps
    this._booleanProps = booleanProps
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
      if (val === REMOVAL) {
        delete this._props[key]
      } else if (val === undefined) {
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

  addEventListener(
    type: AMap.EventType,
    listener: EventListenerOrEventListenerObject
  ) {
    if (!this._events[type]) {
      this._events[type] = []
    }
    this._events[type].push(listener)

    if (this.instance) {
      this.instance.on(type, listener as any)
    }
  }

  removeEventListener(
    type: AMap.EventType,
    listener: EventListenerOrEventListenerObject
  ) {
    if (this._events[type]) {
      this._events[type] = this._events[type].filter((l) => l !== listener)
    }

    if (this.instance) {
      this.instance.off(type, listener as any)
    }
  }

  dispatchEvent(event: Event): boolean {
    if (this.instance) {
      this.instance.emit(event.type as AMap.EventType, event)
      return true
    }
    return false
  }

  protected _bindInstanceListeners() {
    if (this.instance) {
      for (const type in this._events) {
        for (const listener of this._events[type]) {
          this.instance.on(type as AMap.EventType, listener as any)
        }
      }
    }
  }
}
