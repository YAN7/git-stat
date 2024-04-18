<template>
  <div class="finance-collapse-item">
    <el-collapse v-model="activeValue">
      <el-collapse-item name="1">
        <template #title>
          <finance-divider :title="title" :tip="tip" />
        </template>
        <slot />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'FinanceCollapseItem',
})

defineProps<{ title: string; tip?: string }>()

const activeValue = ref(['1'])
</script>
<style scoped lang="less">
.finance-collapse-item {
  :deep(.feGitStat-collapse-item__content) {
    display: flex;
  }
  :deep(.feGitStat-collapse-item__content) {
    padding-bottom: 0px;
  }
  :deep(.feGitStat-collapse),
  :deep(.feGitStat-collapse-item__header),
  :deep(.feGitStat-collapse-item__wrap) {
    // border-top: unset;
    border-bottom: unset;
  }
}
</style>

<style>
.form-item-financeCollapseItem {
  margin-bottom: 0px !important;
}
</style>
