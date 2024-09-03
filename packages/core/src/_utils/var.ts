export function defined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

export function defaultValue<T>(
  value: T | null | undefined,
  defaultValue: T
): T {
  return defined(value) ? value : defaultValue
}

export const isString = (val: unknown): val is string => typeof val === 'string'

export const toNumber = (val: any): any => {
  const n = isString(val) ? Number(val) : NaN
  return isNaN(n) ? val : n
}

const camelizeRE = /-(\w)/g
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
