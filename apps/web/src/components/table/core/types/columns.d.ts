import type { TableColumnInstance, TableColumnCtx } from 'element-plus'

type Merge<T> = {
  [K in keyof T]: T[K]
}
type RequiredByKeys<T, K = keyof T> = Merge<T & Required<Pick<T, K & keyof T>>>

type OtherColumnKeys = 'opt' | 'selection' | 'index'

export type FinanceTableColumn<T> = Partial<
  TableColumnInstance['$props'] & {
    slot?: string
    title?: string
    prop?: T | OtherColumnKeys
    formatter: (
      row: any,
      column: TableColumnCtx<any>,
      cellValue: any,
      index: number,
    ) =>
      | number
      | string
      | import('vue').VNode<
          import('vue').RendererNode,
          import('vue').RendererElement,
          {
            [key: string]: any
          }
        >
  }
>
