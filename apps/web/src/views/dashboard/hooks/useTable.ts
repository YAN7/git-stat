import { computed, h, onMounted, reactive, ref } from 'vue'

import { FinanceTableColumn } from '@/components/table/core/types'
import http from '@/utils/http'
import type { ModelTypes, QueryParams } from './types'

export const useTable = () => {
  const model = reactive<QueryParams>({
    dateRange: '',
  })

  const columns: FinanceTableColumn<keyof ModelTypes>[] = [
    { title: '姓名', prop: 'username', align: 'left' },
    { title: 'git用户名', prop: 'gitUsername' },
    { title: '项目名称', prop: 'projectName' },
    { title: '项目代码', prop: 'projectCode' },
    {
      title: '新增代码行数',
      prop: 'addLines',
      sortable: true,
      formatter: (row: ModelTypes) =>
        h('span', { style: { color: 'rgb(34 197 94)' } }, row.addLines),
    },
    {
      title: '删除代码行数',
      prop: 'removeLines',
      sortable: true,
      formatter: (row: ModelTypes) =>
        h('span', { style: { color: 'rgb(239 68 68)' } }, row.removeLines),
    },
    {
      title: '汇总代码行数',
      prop: 'totalLines',
      sortable: true,
      formatter: (row: ModelTypes) =>
        h('span', { style: { color: 'rgb(234 179 8)' } }, row.totalLines),
    },
    { title: '提交次数', sortable: true, prop: 'submitTimes' },
    { title: '备注', prop: 'note' },
  ]

  const schema = computed(() => {
    return [
      {
        prop: 'dateRange',
        label: '统计区间',
        component: 'select',
        colProps: { span: 24 },
        props: {
          options: allDateRange.value,
        },
      },
    ]
  })

  const allDateRange = ref([])

  const queryAllDateRange = async () => {
    const res = await http.get('/getAllDateRange')
    allDateRange.value = res.data
  }
  onMounted(async () => {
    queryAllDateRange()
  })

  return {
    model,
    schema,
    columns,
  }
}
