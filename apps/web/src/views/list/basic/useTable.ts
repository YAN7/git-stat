import { ElButton, ElLink } from 'element-plus'
import { computed, h, reactive } from 'vue'

import type { FormSchema } from '@/components/form/core'
import { FinanceTableColumn } from '@/components/table/core/types'
import useScreenWidth from '@/hooks/useScreenWidth'
import type { ModelTypes } from './types'

export const useTable = () => {
  const model = reactive<ModelTypes>({
    field1: 12,
    cols: undefined,
    limit: undefined,
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
  })

  const { is1920Screen } = useScreenWidth()

  // 当筛选项个数小于等于三个时，需要指定span
  const colProps = computed(() => {
    let span
    if (model.field1 > 3) {
      return {}
    }
    if (!is1920Screen.value) {
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
    }
    switch (model.field1) {
      case 1:
        span = 24
        break
      case 2:
        span = 12
        break
      case 3:
        span = 8
        break
      default:
        span = 6
    }
    return { span }
  })

  const schema = computed<FormSchema<ModelTypes>[]>(() => {
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
          ],
        },
      },
      {
        prop: 'cols',
        label: '筛选项列数',
        component: 'select',
        colProps: colProps.value,
        props: {
          options: [
            { label: '一列', value: 1 },
            { label: '二列', value: 2 },
            { label: '三列', value: 3 },
            { label: '四列', value: 4 },
          ],
        },
      },
      {
        prop: 'limit',
        label: '筛选项显示数',
        component: 'inputNumber',
        colProps: colProps.value,
        props: { min: 3 },
      },
      {
        prop: 'field4',
        label: '筛选项4111',
        component: 'input',
        props: { type: 'input' },
        slots: {
          prefix: () => h('div', '好了？'),
        },
      },
      { prop: 'field5', label: '筛选项5', component: 'input' },
      { prop: 'field6', label: '筛选项6', component: 'input' },
      { prop: 'field7', label: '筛选项7', component: 'input' },
      { prop: 'field8', label: '筛选项8', component: 'input' },
      { prop: 'field9', label: '筛选项9', component: 'input' },
      { prop: 'field10', label: '筛选项10', component: 'input' },
      { prop: 'field11', label: '筛选项11', component: 'input' },
      { prop: 'field12', label: '筛选项12', component: 'input' },
      { prop: 'field12', label: '筛选项13', component: 'input' },
      { prop: 'field12', label: '筛选项14', component: 'input' },
    ]

    return originSchema.slice(0, model.field1) as any
  })

  const renderOptBtns = () => {
    return h('div', [
      h(ElButton, { link: true, type: 'primary' }, '编辑'),
      h(ElButton, { link: true, type: 'danger' }, '删除'),
    ])
  }

  const renderLink = () => {
    return h(ElLink, { type: 'primary' }, '5981239712')
  }

  const columns: FinanceTableColumn<keyof ModelTypes>[] = [
    { type: 'selection', fixed: 'left' },
    { title: '列表1', prop: 'field1', fixed: 'left', formatter: renderLink },
    { title: '列表2', prop: 'field2' },
    { title: '列表3', prop: 'field3' },
    { title: '列表4', prop: 'field4' },
    { title: '列表5', prop: 'field5' },
    { title: '列表6', prop: 'field6' },
    { title: '列表7', prop: 'field7' },
    { title: '列表8', prop: 'field8' },
    { title: '列表9', prop: 'field9' },
    { title: '列表10', prop: 'field9' },
    { title: '列表11', prop: 'field9' },
    { title: '列表12', prop: 'field9' },
    { title: '列表13', prop: 'field9' },
    { title: '列表14', prop: 'field9' },
    { title: '列表15', prop: 'field9' },
    { title: '操作', fixed: 'right', formatter: renderOptBtns },
  ]

  return {
    model,
    schema,
    columns,
  }
}
