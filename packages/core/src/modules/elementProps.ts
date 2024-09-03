export type Data = Record<string, unknown>

type DefaultFactory<T> = (props: Data) => T | null | undefined

export interface PropOptions<T = any, E = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown, props: Data): boolean
  update?(this: E, value: D): void
}

export type PropType<T> = PropConstructor<T> | (PropConstructor<T> | null)[]

type PropConstructor<T = any> =
  | { new (...args: any[]): T & {} }
  | { (): T }
  | PropMethod<T>

type PropMethod<T, TConstructor = any> = [T] extends [
  ((...args: any) => any) | undefined
]
  ? { new (): TConstructor; (): T; readonly prototype: TConstructor }
  : never

export function createDefinePropFunc<E>() {
  return <T>(options: PropOptions<T, E>) => options
}

export function defineProps<E, R = Record<string, PropOptions<unknown, E>>>(
  props: R
) {
  return props
}
