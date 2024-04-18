export enum StatusCode {
  SUCCESS = 0,
  FAIL = 1
}

export interface BusinessData {
  code: StatusCode
  data: Record<string, any>
  message: string
  success: boolean
}
