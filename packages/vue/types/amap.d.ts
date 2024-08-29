/// <reference types="@amap/amap-jsapi-types" />

declare global {
  interface Window {
    AMap: typeof AMap
  }
  namespace AMap {
    export class Scale extends AMap.Control {
      new(opts?: any): any
    }

    export class ToolBar extends AMap.Control {
      new(opts?: any): any
    }

    export class ControlBar extends AMap.Control {
      new(opts?: any): any
    }

    export class HawkEye extends AMap.Control {
      new(opts?: any): any
    }
  }
}
