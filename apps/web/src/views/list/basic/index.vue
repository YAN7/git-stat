<template>
  <div class="list">
    <finance-table
      endpoint="/fake"
      query-type="post"
      ref="tableRef"
      :cols="model.cols"
      :limit="model.limit"
      :form-model="model"
      :form-options="{ schema }"
      :columns="columns"
      :extra-search-info="
        () => ({
          createTime: model.field1[0],
          endTime: model.field1[1],
        })
      "
    >
      <template #leftAction>
        <el-button type="primary" @click="blurBtnWhenClose"><IconAdd />新增</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconEdit />编辑</el-button>
        <el-button type="danger" plain @click="blurBtnWhenClose"><IconDel />删除</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconImport />导入</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconExport />导出</el-button>
      </template>
    </finance-table>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { IconAdd, IconDel, IconEdit, IconExport, IconImport } from '@/components/icons'
import { FinanceTable } from '@/components/table'
import { useTable } from './useTable'
import { blurBtnWhenClose } from '@/utils/dom'

defineOptions({
  name: 'ListCrud',
})

const { model, schema, columns } = useTable()

const tableRef = ref<InstanceType<typeof FinanceTable>>()
</script>
<style scoped lang="less">
.list {
  :deep(.feGitStat-table__header .cell) {
    text-overflow: unset !important;
    white-space: nowrap !important;
  }
}
</style>
