import { ElTreeSelect } from 'element-plus'

import { CsRadioGroup, CsTimePicker, CsSelect, CsDatePicker, CsInputNumber } from 'csui'

import FinanceDivider from '@/components/form-item/finance-divider.vue'
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
  FormInstance,
  SwitchInstance,
} from 'element-plus'

// import type { RadioInstance } from 'csui'

export type Arrayable<T> = T | T[]

export type FinanceFormRules<T> = Partial<Record<keyof T, Arrayable<FormItemRule>>>

export type ComponentEnums =
  | 'input'
  | 'inputNumber'
  | 'select'
  | 'cascader'
  | 'checkbox'
  | 'datePicker'
  | 'radio'
  | 'switch'
  | 'financeDivider'
  | 'timePicker'
  | 'financeOrgTree'
  | 'financeCollapseItem'
  | 'financeUserSelect'
  | 'elCollapseItem'

type ComponentToPropsMap = {
  button: ButtonInstance['$props']
  input: InputInstance['$props'] & { rows?: number }
  inputNumber: InstanceType<typeof CsInputNumber>['$props']
  cascader: CascaderInstance['$props']
  checkbox: CheckboxInstance['$props']
  datePicker: InstanceType<typeof CsDatePicker>['$props']
  select: InstanceType<typeof CsSelect>['$props']
  radio: InstanceType<typeof CsRadioGroup>['$props']
  switch: SwitchInstance['$props']
  financeDivider: InstanceType<typeof FinanceDivider>['$props']
  timePicker: InstanceType<typeof CsTimePicker>['$props']
  financeOrgTree: InstanceType<typeof ElTreeSelect>['$props'] &
    InstanceType<typeof FinanceOrgTree>['$props']
  financeCollapseItem: InstanceType<typeof FinanceCollapseItem>['$props']
  financeUserSelect: InstanceType<typeof FinanceUserSelect>['$props'] &
    InstanceType<typeof CsSelect>['$props']
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
    slots?: any
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
  defaultCols?: any
  needCollapsed?: any
}
