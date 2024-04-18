<template>
  <div>
    <el-menu
      mode="horizontal"
      class="top-menu"
      :default-active="activeIndex"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="basic">财物中心</el-menu-item>
      <el-menu-item index="user">用户中心</el-menu-item>
      <el-menu-item index="log">日志中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const activeIndex = ref('basic')

const appStore = useAppStore()

const handleSelect = (key: string) => {
  appStore.setTopMenu(key)
}
</script>
<style scoped lang="less">
.top-menu {
  height: 64px;
  .feGitStat-menu-item {
    margin: 0 20px;
    &.is-active {
      font-weight: 500 !important;
    }
  }
}
</style>
