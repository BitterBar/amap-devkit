const getContext = HTMLCanvasElement.prototype.getContext
/**
 * 在使用`Canvas 2D`API时，
 * 如果你需要频繁地调用`getImageData`方法进行读取操作，
 * 可以通过设置`willReadFrequently`属性来提高性能
 */
export function overrideGetContext2DReadFrequently(enabled: boolean) {
  if (!enabled) {
    HTMLCanvasElement.prototype.getContext = getContext
    return
  }

  HTMLCanvasElement.prototype.getContext = function (contextId, options) {
    if (contextId !== '2d') return getContext.call(this, contextId, options)
    if (!options) options = {}
    return getContext.apply(this, [contextId, { ...options, willReadFrequently: true }]) as any
  }
}
