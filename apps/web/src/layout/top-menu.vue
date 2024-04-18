<template>
  <div>
    <el-menu
      mode="horizontal"
      class="top-menu"
      :default-active="activeIndex"
      :ellipsis="false"
      @select="handleSelect"
    >
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

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
