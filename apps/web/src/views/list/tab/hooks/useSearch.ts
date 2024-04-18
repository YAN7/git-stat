import type { FormSchema } from '@/components/form/core/index'
import type { SearchModel, ListModel } from '../index'
import { FinanceTableColumn } from '@/components/table/core/types'
import { ElLink } from 'element-plus'
import { computed, h, reactive } from 'vue'
import useScreenWidth from '@/hooks/useScreenWidth'

const useTable = () => {
  const model: SearchModel = reactive({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
  })

  // @ts-ignore
  const schema = computed<FormSchema<SearchModel>[]>(() => [
    { label: '筛选项1', prop: 'field1', component: 'input' },
    { label: '筛选项2', prop: 'field2', component: 'input' },
    { label: '筛选项3', prop: 'field3', component: 'input' },
    { label: '筛选项4', prop: 'field4', component: 'input' },
    {
      label: '筛选项5',
      prop: 'field5',
      component: 'select',
      props: { options: [{ label: '选项1', value: '2' }] },
    },
    {
      label: '筛选项6',
      prop: 'field6',
      component: 'select',
      props: { options: [{ label: '选项1', value: '2' }] },
    },
    {
      label: '筛选项7',
      prop: 'field7',
      component: 'select',
      props: { options: [{ label: '选项1', value: '2' }] },
    },
    {
      label: '筛选项8',
      prop: 'field8',
      component: 'select',
      props: { options: [{ label: '选项1', value: 2 }] },
    },
  ])

  const columns: FinanceTableColumn<keyof ListModel>[] = [
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

  return { model, schema, columns }
}

export default useTable
