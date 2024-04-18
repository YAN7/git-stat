<template>
  <div class="content-box" :class="{ 'pt-16': !isQiankun }">
    <breadcrumb class="px-[24px]" v-if="!isQiankun" />
    <div class="content" :class="{ 'alone-content': !isQiankun }">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { isQiankun } from '@/utils/qiankun'
import breadcrumb from './breadcrumb.vue'
</script>
<style lang="less" scoped>
.content-box {
  @apply bg-white py-[16px];
}
// 非乾坤模式下的样式
.alone-content {
  @apply overflow-y-auto;
  @content-height: calc(100vh - var(--header-height) - var(--bread-crumbs-height) - 80px);
  padding: 24px;
  height: @content-height;
  max-height: @content-height;
}
</style>
