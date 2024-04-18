<template>
  <header
    class="pl-16 flex items-center h-[var(--header-height)] relative z-1 bg-white"
    style="box-shadow: 0 4px 6px 0 rgba(123, 123, 123, 0.2)"
  >
    <div class="left-header flex items-center justify-center h-full">
      <icon-logo-with-name />
      <p class="mx-[24px] h-14 w-1 bg-[#00184a]" />
      <p class="text-[20px] font-600 text-[#00184a]">前端开发代码统计</p>
    </div>
    <div class="right-header flex items-center pl-32px pr-16 flex-1 justify-between">
      <el-button link @click="appStore.toggleCollapse" class="cursor-pointer">
        <icon-expand v-if="appStore.isCollapse" />
        <icon-fold v-else />
      </el-button>
      <div class="flex items-center justify-center flex-1">
        <top-menu class="pl-40" />
      </div>
      <div
        class="right-header-info flex items-center text-[14px] text-[var(--feGitStat-text-color-primary)]"
      >
        <input-mode />
        <icon-logout class="mr-8" />
        <p class="cursor-pointer">退出</p>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import InputMode from '@/components/input-mode.vue'
import { useAppStore } from '@/stores/app'
import TopMenu from './top-menu.vue'

defineOptions({
  name: 'LayoutHeader',
})

const appStore = useAppStore()
</script>
<style scoped lang="less"></style>
