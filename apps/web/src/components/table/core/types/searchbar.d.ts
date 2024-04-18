import { ElDatePicker, ElSelect, ElTimePicker, ElTreeSelect } from 'element-plus'

import FinanceSelect from '@/components/form-item/finance-select.vue'
import FinanceRadio from '@/components/form-item/finance-radio.vue'
import FinanceCheckbox from '@/components/form-item/finance-checkbox.vue'
import FinanceDivider from '@/components/form-item/finance-divider.vue'
import FinanceTransfer from '@/components/form-item/finance-transfer.vue'
import FinanceOrgTree from '@/components/form-item/finance-org-tree.vue'
import FinanceCollapseItem from '@/components/form-item/finance-collapse-item.vue'
import FinanceUserSelect from '@/components/form-item/finance-user-select.vue'

import type {
  FormItemRule,
  ButtonInstance,
  InputInstance,
  CascaderInstance,
  CheckboxInstance,
  ColInstance,
  InputNumberInstance,
  FormInstance,
  RadioInstance,
  SwitchInstance,
  TransferInstance,
} from 'element-plus'

export type Arrayable<T> = T | T[]

export type FinanceFormRules<T> = Partial<Record<keyof T, Arrayable<FormItemRule>>>

type ElDatePickerProps = InstanceType<typeof ElDatePicker>['$props']
type ElTreeSelectProps = InstanceType<typeof ElTreeSelect>['$props']
type ElSelectProps = InstanceType<typeof ElSelect>['$props']
type FinanceSelectProps = InstanceType<typeof FinanceSelect>['$props']
type FinanceRadioProps = InstanceType<typeof FinanceRadio>['$props']
type FinanceCheckboxProps = InstanceType<typeof FinanceCheckbox>['$props']
type FinanceDividerProps = InstanceType<typeof FinanceDivider>['$props']
type FinanceTransferProps = InstanceType<typeof FinanceTransfer>['$props']
type TimePickerProps = InstanceType<typeof ElTimePicker>['$props']
type FinanceOrgTreeProps = InstanceType<typeof FinanceOrgTree>['$props']
type FinanceCollapseItemProps = InstanceType<typeof FinanceCollapseItem>['$props']
type FinanceUserSelectProps = InstanceType<typeof FinanceUserSelect>['$props']

export type ComponentEnums =
  | 'input'
  | 'inputNumber'
  | 'select'
  | 'cascader'
  | 'checkbox'
  | 'datePicker'
  | 'radio'
  | 'switch'
  | 'yearPicker'
  | 'monthPicker'
  | 'datetimePicker'
  | 'rangeDatePicker'
  | 'financeSelect'
  | 'financeRadio'
  | 'financeCheckbox'
  | 'financeDivider'
  | 'financeTransfer'
  | 'timePicker'
  | 'financeOrgTree'
  | 'elCollapseItem'
  | 'financeCollapseItem'
  | 'financeUserSelect'

type ComponentToPropsMap = {
  button: ButtonInstance['$props']
  input: InputInstance['$props'] & { rows?: number }
  inputNumber: InputNumberInstance['$props']
  cascader: CascaderInstance['$props']
  checkbox: CheckboxInstance['$props']
  datePicker: ElDatePickerProps
  select: ElSelectProps
  financeSelect: ElSelectProps & FinanceSelectProps
  radio: RadioInstance
  financeRadio: RadioInstance['$props'] & FinanceRadioProps
  switch: SwitchInstance['$props']
  financeCheckbox: CheckboxInstance['$props'] & FinanceCheckboxProps
  financeDivider: FinanceDividerProps
  financeTransfer: TransferInstance['$props'] & FinanceTransferProps
  timePicker: TimePickerProps
  financeOrgTree: ElTreeSelectProps & FinanceOrgTreeProps
  financeCollapseItem: FinanceCollapseItemProps
  financeUserSelect: FinanceUserSelectProps & ElSelectProps
}

type FormSchema<ModelType> = {
  [K in ComponentEnums & keyof ComponentToPropsMap]: {
    /**
     * 组件类型
     */
    component?: K | ''
    /**
     * model的键名
     */
    prop?: keyof ModelType | ''
    /**
     * 标签文本
     */
    label?: string
    /**
     * el-col的所有props
     */
    colProps?: ColInstance['$props']
    /**
     * 表单项所使用的组件的props
     */
    props?: ComponentToPropsMap[K] & { slots?: any }
    /**
     * 标签长度
     */
    labelWidth?: string
    /**
     * 表单项可嵌套
     */
    children?: FormSchema<ModelType>[]
  }
}[ComponentEnums & keyof ComponentToPropsMap]

export type BtnsProps = ColInstance['$props'] & { align: 'left' | 'right' }

export type ElFormProps = FormInstance['$props']

export type FinanceFormPropsType = {
  /** 表单数据对象 */
  model: Record<string, any>
  /* 表单验证规则 */
  rules: Record<string, Arrayable<FormItemRule>>
  /** 表单筛选项 */
  schema: any
  formProps?: any
  hiddenDefaultBtns?: boolean
  /* 默认展示的表单项数目 */
  defaultCols?: number
  /** 是否需要折叠表单项 */
  needCollapsed?: boolean
  /** 列数 */
  cols?: 1 | 2 | 3 | 4
  // prettier-ignore
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
  limit?: number
}
