<template>
  <div class="finance-divider" style="width: 100% !important">
    <span class="finance-divider__title111">{{ title }}</span>
    <span class="text-[14px] text-[#999] finance-divider__tip">{{ tip }}</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FinanceDivider',
})

const props = defineProps<{
  title?: string
  tip?: string
}>()

console.log('props ==> ', props)
</script>

<style lang="less" scoped>
.finance-divider {
  position: relative;
  padding-left: 8px;
  line-height: 1;
  &__title {
    @apply mr-[8px] font-600;
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    color: var(--feGitStat-text-color-primary);
  }
  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: '';
    width: 3px;
    height: 16px;
    background: var(--feGitStat-color-primary);
  }
}
</style>
