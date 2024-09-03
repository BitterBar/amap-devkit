import defineCustomElement from '../../_utils/defineCustomElement'
import MapElement from '../../modules/MapElement'
import props from './props'

export default class MapMarkerElement extends MapElement {
  static name = 'amap-marker'
  instance: AMap.Marker | null = null

  constructor() {
    super(props)
  }

  connectedCallback() {
    this._render()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.instance) this.instance.setMap(null)
  }

  private _render() {
    this.instance = new AMap.Marker(this._props)
    this._bindInstanceListeners()
  }
}

defineCustomElement(MapMarkerElement.name, MapMarkerElement)
