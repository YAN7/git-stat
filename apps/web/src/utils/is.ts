// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}
