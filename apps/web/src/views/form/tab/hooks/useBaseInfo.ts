import { FormSchema } from '@/components/form/core'
import { BaseInfoModel } from '..'
import { reactive } from 'vue'

export const baseInfoModel = reactive<BaseInfoModel>({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
  field9: '',
  field10: '',
  field11: '',
  field12: '',
  field13: '',
})

const colProps = { span: 8 }

export const schema: FormSchema<BaseInfoModel>[] = [
  // {
  //   component: 'financeDivider',
  //   props: { title: '基本信息' },
  //   colProps: { span: 24 },
  //   labelWidth: '0',
  // },
  {
    label: '输入框',
    prop: 'field1',
    component: 'input',
    colProps,
  },
  {
    label: '下拉框',
    prop: 'field2',
    component: 'select',
    colProps,
    props: { options: [{ label: '选项1', value: '1' }] },
  },
  {
    label: '下拉框',
    prop: 'field3',
    component: 'select',
    colProps,
    props: { options: [{ label: '选项1', value: '1' }] },
  },
  {
    label: '时间选择框',
    prop: 'field4',
    component: 'datePicker',
    colProps,
    props: { type: 'date' },
  },
  { label: '数字输入框', prop: 'field5', component: 'inputNumber', colProps },
  {
    label: '下拉框',
    prop: 'field6',
    component: 'select',
    colProps,
    props: { options: [{ label: '选项1', value: '1' }] },
  },
  {
    label: '下拉框',
    prop: 'field7',
    component: 'select',
    colProps,
    props: { options: [{ label: '选项1', value: '1' }] },
  },
  {
    label: '下拉框',
    prop: 'field8',
    component: 'select',
    colProps,
    props: { options: [{ label: '选项1', value: '1' }] },
  },
  { label: '输入框', prop: 'field9', component: 'input', colProps },
  {
    label: '日期',
    prop: 'field10',
    component: 'datePicker',
    colProps,
    props: { type: 'daterange' },
  },
  { label: '输入框', prop: 'field11', component: 'input', colProps },
  { label: '输入框', prop: 'field12', component: 'input', colProps },
  {
    label: '输入框',
    prop: 'field13',
    component: 'input',
    colProps: { span: 24 },
    props: { type: 'textarea', rows: 4 },
  },
]
