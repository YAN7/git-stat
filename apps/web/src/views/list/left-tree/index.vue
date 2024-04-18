<template>
  <drag-width>
    <template #BoxLeft>
      <left-tree />
    </template>
    <template #BoxRight>
      <div class="right-box">
        <finance-table
          endpoint="/fake"
          class="right-table"
          :cols="3"
          :columns="columns"
          :form-model="model"
          :form-options="{ schema }"
        >
          <template #leftAction>
            <el-button type="primary" @click="blurBtnWhenClose"><IconImport />导入</el-button>
            <el-button type="primary" @click="blurBtnWhenClose"><IconExport />导出</el-button>
          </template>
        </finance-table>
      </div>
    </template>
  </drag-width>
</template>
<script setup lang="ts">
import { blurBtnWhenClose } from '@/utils/dom'
import LeftTree from './components/left-tree.vue'
import { model, schema, columns } from './hooks/useTable'
</script>
<style scoped lang="less">
.right-box {
  padding: 16px 24px;
  margin-right: 10px;
  box-shadow: 0px 1px 6px 0px rgba(174, 174, 174, 0.28);
  height: 100%;
  max-height: 100%;
  overflow: auto;
  border-radius: 5px;
  .right-table {
    height: 100%;
    max-height: 100%;
  }
}
</style>
