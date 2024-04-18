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
  field13: string
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
  field13: '',
})

const oddColProps = { span: 12 }
const evenColProps = { span: 12 }

const schema: FormSchema<ModelTypes>[] = [
  {
    prop: '',
    component: 'financeDivider',
    props: { title: '基本信息' },
    labelWidth: '20',
    colProps: { span: 24 },
  },
  {
    prop: 'field1',
    label: '输入框',
    component: 'input',
    colProps: oddColProps,
  },
  {
    prop: 'field2',
    label: '下拉框',
    component: 'select',
    colProps: evenColProps,
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
    colProps: {
      span: 12,
    },
    props: { size: 'default' },
  },
  {
    prop: 'field4',
    label: '数字输入框',
    component: 'inputNumber',
    colProps: evenColProps,
  },
  {
    prop: 'field5',
    label: '单选框',
    component: 'radio',
    colProps: oddColProps,
    props: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    },
  },
  {
    prop: 'field6',
    label: '单选框(按钮)',
    component: 'radio',
    colProps: evenColProps,
    props: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
      mode: 'button',
    },
  },
  {
    prop: 'field7',
    label: '切换',
    component: 'switch',
    colProps: oddColProps,
    props: { inlinePrompt: true },
  },
  {
    prop: 'field8',
    label: '日期',
    component: 'datePicker',
    colProps: evenColProps,
    props: { type: 'daterange', class: '!w-full' },
  },
  {
    prop: 'field9',
    label: '文本描述',
    component: 'input',
    colProps: { span: 24 },
    props: {
      type: 'textarea',
      rows: 5,
    },
  },
  {
    prop: '',
    component: 'financeDivider',
    props: {
      title: '其他内容信息',
      // style: { borderTop: 'dotted 1px #eee', paddingTop: '10px' },
    },
    labelWidth: '20',
    colProps: { span: 24 },
  },
  {
    prop: 'field10',
    label: '输入框',
    component: 'input',
    colProps: oddColProps,
  },
  {
    prop: 'field11',
    label: '日期',
    component: 'datePicker',
    colProps: evenColProps,
    props: { type: 'daterange', class: '!w-full' },
  },
  {
    prop: 'field12',
    label: '下拉',
    component: 'input',
    colProps: oddColProps,
  },
  {
    prop: 'field13',
    label: '时间',
    component: 'timePicker',
    colProps: evenColProps,
  },
]

const rules: FinanceFormRules<ModelTypes> = {
  field1: {
    message: '参数不能为空',
    required: true,
  },
}

const btnsProps: BtnsProps = {
  align: 'right',
  span: 12,
}

const formProps: ElFormProps = {
  labelWidth: 100,
}

export const useForm = () => {
  return {
    model,
    schema,
    rules,
    btnsProps,
    formProps,
  }
}
