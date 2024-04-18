<template>
  <div class="list">
    <finance-table
      endpoint="/getSubmitInfo"
      query-type="get"
      ref="tableRef"
      row-key="id"
      border
      :show-reset-btn="false"
      :columns="columns"
      :form-model="model"
      :immediate="false"
      :show-index="false"
      :show-pagination="false"
      :form-options="{ schema }"
      :after-fetch="handleRecord"
      :tree-props="{ children: 'projects' }"
      :extra-search-info="
        () => ({
          startDate: model.dateRange.split('_')[0],
          endDate: model.dateRange.split('_')[1],
        })
      "
    >
      <template #leftAction>
        <el-button
          class="text-yellow-4"
          type="primary"
          :disabled="!model.dateRange"
          @click="onExport"
          ><IconExport />导出</el-button
        >
      </template>
    </finance-table>
  </div>
</template>
<script lang="ts" setup>
import { IconExport } from '@/components/icons'
import { FinanceTable } from '@/components/table'
import { ref } from 'vue'
import { useTable } from './useTable'

defineOptions({
  name: 'ListCrud',
})

const { model, schema, columns } = useTable()

const tableRef = ref<InstanceType<typeof FinanceTable>>()

const handleRecord = (res) => {
  return Object.entries(res).map(([username, info]: any) => {
    const item = { ...info, username, id: Math.random() }
    if (item.projects) {
      item.gitUsername = item.projects?.[0].gitUsername
      item.projects = item.projects.map((p) => {
        const { gitUsername, username, ...rest } = p
        return { ...rest, id: Math.random() }
      })
    }
    return item
  })
}

const onExport = async () => {
  const url = `http://localhost:3000/git-stat/exportSubmitInfo?startDate=${
    model.dateRange.split('_')[0]
  }&endDate=${model.dateRange.split('_')[1]}`
  window.open(url)
}
</script>
<style scoped lang="less">
.list {
  :deep(.web-table__header .cell) {
    text-overflow: unset !important;
    white-space: nowrap !important;
  }
}
</style>
