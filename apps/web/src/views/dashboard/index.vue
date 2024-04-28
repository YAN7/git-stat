<template>
  <div class="list">
    <finance-table
      endpoint="/getSubmitInfo"
      query-type="get"
      ref="tableRef"
      row-key="id"
      border
      :max-height="600"
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
        <el-button type="primary" :disabled="!list.length" @click="toggleRowExpansion">
          <component :is="isExpend ? IconArrowDown : IconArrowRight" />
          {{ isExpend ? '收起' : '展开' }}全部</el-button
        >
        <el-button
          class="text-yellow-5"
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
import { IconArrowDown, IconArrowRight, IconExport } from '@/components/icons'
import { FinanceTable } from '@/components/table'
import { ref } from 'vue'
import { useExpend, useTable } from './hooks'
defineOptions({
  name: 'ListCrud',
})

const tableRef = ref<InstanceType<typeof FinanceTable>>()
const list = ref<any>([])

const { model, schema, columns } = useTable()
const { isExpend, toggleRowExpansion } = useExpend(list, tableRef)

const handleRecord = (res) => {
  const result = Object.entries(res).map(([username, info]: any) => {
    const item = { ...info, username, id: Math.random() }
    if (item.projects) {
      item.gitUsername = item.projects?.[0].gitUsername
      item.projects = item.projects.map((p) => {
        const { gitUsername, username, ...rest } = p
        return { ...rest, gitUsername, username, id: Math.random() }
      })
    }
    return item
  })
  list.value = result
  isExpend.value = false
  return result
}

const onExport = async () => {
  const url = `https://itom-test.csair.com/git-stat/exportSubmitInfo?startDate=${
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
