<template>
  <div class="tab-list">
    <search-bar :schema="schema" :model="model">
      <template #leftAction>
        <el-button type="primary" @click="blurBtnWhenClose"><IconAdd />新增</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconEdit />编辑</el-button>
        <el-button type="danger" plain @click="blurBtnWhenClose"><IconDel />删除</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconImport />导入</el-button>
        <el-button type="primary" @click="blurBtnWhenClose"><IconExport />导出</el-button>
      </template>
    </search-bar>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="草稿" name="first" />
      <el-tab-pane label="待审批" name="second" />
      <el-tab-pane label="已通过" name="third" />
      <el-tab-pane label="已驳回" name="fourth" />
    </el-tabs>
    <finance-table
      endpoint="/fake"
      ref="financeTableRef"
      :extra-search-info="() => ({ activeName })"
      :showSearchForm="false"
      :columns="columns"
    />
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import useTable from './hooks/useSearch'

import FinanceTable from '@/components/table/core/FinanceTable.vue'
import useInstance from '@/hooks/useInstance'
import { blurBtnWhenClose } from '@/utils/dom'

const activeName = ref<'first' | 'second' | 'third' | 'fourth'>('first')

const { schema, columns, model } = useTable()
const financeTableRef = useInstance<typeof FinanceTable>()

watch(
  () => activeName.value,
  () => {
    nextTick(() => {
      financeTableRef.value.search()
    })
  },
)
</script>
<style scoped lang="less">
.tab-list {
  .feGitStat-tabs {
    --feGitStat-tabs-header-height: 32px;
  }
  :deep(.feGitStat-tabs__item:nth-child(2)) {
    padding-left: 0 !important;
  }
  :deep(.feGitStat-tabs__nav-wrap::after) {
    left: 0 !important;
    right: 0;
  }
}
.tabs {
  :deep(.feGitStat-tabs__content) {
    padding: 0px;
  }
  margin-bottom: 24px;
  margin-top: 16px;
}
</style>
