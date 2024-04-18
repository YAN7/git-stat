import type { FormSchema } from '@/components/form/core/index'
import type { SearchModel, ListModel } from '../index'
import { FinanceTableColumn } from '@/components/table/core/types'
import { ElLink } from 'element-plus'
import { h, reactive, computed } from 'vue'

export const model: SearchModel = reactive({
  field1: 14,
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
})

const colProps = computed(() => {
  let span
  switch (model.field1) {
    case 1:
      span = 24
      break
    case 2:
      span = 12
      break
    default:
      span = 8
  }
  return { span }
})

export const schema = computed<FormSchema<SearchModel>[]>(() => {
  const originSchema = [
    {
      prop: 'field1',
      label: '筛选项个数',
      component: 'select',
      colProps: colProps.value,
      props: {
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '7', value: 7 },
          { label: '8', value: 8 },
          { label: '9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 },
          { label: '13', value: 13 },
          { label: '14', value: 14 },
        ],
      },
    },
    { prop: 'field2', label: '筛选项2', component: 'input', colProps: colProps.value },
    { prop: 'field3', label: '筛选项3', component: 'input', colProps: colProps.value },
    { prop: 'field4', label: '筛选项4', component: 'input', colProps: colProps.value },
    { prop: 'field5', label: '筛选项5', component: 'input', colProps: colProps.value },
    { prop: 'field6', label: '筛选项6', component: 'input', colProps: colProps.value },
    { prop: 'field7', label: '筛选项7', component: 'input', colProps: colProps.value },
    { prop: 'field8', label: '筛选项8', component: 'input', colProps: colProps.value },
    { prop: 'field9', label: '筛选项9', component: 'input', colProps: colProps.value },
    { prop: 'field10', label: '筛选项10', component: 'input', colProps: colProps.value },
    { prop: 'field11', label: '筛选项11', component: 'input', colProps: colProps.value },
    { prop: 'field12', label: '筛选项12', component: 'input', colProps: colProps.value },
    { prop: 'field12', label: '筛选项13', component: 'input', colProps: colProps.value },
    { prop: 'field12', label: '筛选项14', component: 'input', colProps: colProps.value },
  ]

  return originSchema.slice(0, model.field1) as any
})

export const columns: FinanceTableColumn<keyof ListModel>[] = [
  {
    title: '列表1',
    prop: 'field1',
    fixed: 'left',
    formatter: () => h(ElLink, { type: 'primary' }, Math.floor(Math.random() * 100000000)),
  },
  { title: '列表2', prop: 'field2' },
  { title: '列表3', prop: 'field3' },
  { title: '列表4', prop: 'field4' },
  { title: '列表5', prop: 'field5' },
  { title: '列表6', prop: 'field6' },
  { title: '列表7', prop: 'field7' },
  { title: '列表8', prop: 'field8' },
  { title: '列表9', prop: 'field9' },
  { title: '列表10', prop: 'field10' },
  { title: '列表11', prop: 'field11' },
  { title: '列表12', prop: 'field12' },
  { title: '列表13', prop: 'field13' },
  { title: '列表14', prop: 'field14' },
  { title: '列表15', prop: 'field15', fixed: 'right' },
]
