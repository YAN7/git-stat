import { FormSchema } from '@/components/form/core'
import { reactive } from 'vue'

import type { FinanceFormRules, BtnsProps, ElFormProps } from '@/components/form/core/index'

type ModelTypes = {
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
  field6: string
  field7: string
  field8: []
  field9: string
  field10: string
  field11: string
  field12: string
}

const model = reactive<ModelTypes>({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: [],
  field9: '',
  field10: '',
  field11: '',
  field12: '',
})

const firstColProps = { span: 8 }
const restColProps = { span: 8 }

const schema: FormSchema<ModelTypes>[] = [
  {
    prop: '',
    component: 'financeDivider',
    props: { title: '基本信息' },
    labelWidth: '20',
    colProps: { span: 24 },
  },
  { prop: 'field1', label: '输入框', component: 'input', colProps: firstColProps },
  {
    prop: 'field2',
    label: '下拉框',
    component: 'select',
    colProps: restColProps,
    props: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    },
  },
  {
    prop: 'field3',
    label: '时间选择框',
    component: 'timePicker',
    colProps: restColProps,
    props: {},
  },
  {
    prop: 'field4',
    label: '数字输入框',
    component: 'inputNumber',
    colProps: firstColProps,
  },
  {
    prop: 'field5',
    label: '单选框',
    component: 'radio',
    colProps: restColProps,
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    prop: 'field6',
    label: '单选框',
    component: 'radio',
    colProps: restColProps,
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
      mode: 'button',
    },
  },
  {
    prop: 'field6',
    label: '切换',
    component: 'switch',
    colProps: firstColProps,
    props: { inlinePrompt: true },
  },
  {
    prop: 'field7',
    label: '日期',
    component: 'datePicker',
    colProps: restColProps,
    props: { type: 'daterange', class: '!w-full' },
  },
  {
    prop: 'field8',
    label: '文本描述',
    component: 'input',
    colProps: { span: 24 },
    props: {
      type: 'textarea',
      rows: 5,
    },
  },
  {
    prop: 'field12',
    component: 'financeCollapseItem',
    props: {
      title: '其他内容信息',
      // style: { borderTop: 'dotted 1px #eee', paddingTop: '10px' },
    },
    labelWidth: '20',
    colProps: { span: 24 },
    children: [
      {
        prop: 'field9',
        label: '输入框',
        component: 'input',
        colProps: firstColProps,
      },
      {
        prop: 'field10',
        label: '日期',
        component: 'datePicker',
        colProps: restColProps,
        props: { type: 'daterange', class: '!w-full' },
      },
      {
        prop: 'field11',
        label: '下拉',
        component: 'input',
        colProps: restColProps,
      },
      {
        prop: 'field12',
        label: '时间',
        component: 'timePicker',
        colProps: firstColProps,
      },
    ],
  },
  {
    prop: 'field12',
    component: 'financeCollapseItem',
    props: {
      title: '其他内容信息2',
    },
    labelWidth: '20',
    colProps: { span: 24 },
    children: [
      {
        prop: 'field9',
        label: '输入框',
        component: 'input',
        colProps: firstColProps,
      },
      {
        prop: 'field10',
        label: '日期',
        component: 'datePicker',
        colProps: restColProps,
        props: { type: 'daterange', class: '!w-full' },
      },
      {
        prop: 'field11',
        label: '下拉',
        component: 'input',
        colProps: restColProps,
      },
      {
        prop: 'field12',
        label: '时间',
        component: 'timePicker',
        colProps: firstColProps,
      },
    ],
  },
]

const rules: FinanceFormRules<ModelTypes> = {
  field1: { message: '参数不能为空', required: true },
}

const btnsProps: BtnsProps = { align: 'right', span: 12 }

const formProps: ElFormProps = { labelWidth: 90 }

export const useForm = () => {
  return {
    model,
    schema,
    rules,
    btnsProps,
    formProps,
  }
}
