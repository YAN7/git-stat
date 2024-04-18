<template>
  <el-sub-menu v-if="menu.children" :index="menu.route" popper-class="menu-popper">
    <template #title>
      <menu-icon v-if="menu.icon" :icon="menu.icon" />
      <span :title="menu.title">{{ menu.title }}</span>
    </template>
    <menu-item v-for="subMenu in menu.children" :key="subMenu.route" :menu="subMenu"></menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.route">
    <menu-icon v-if="menu.icon" :icon="menu.icon" />
    <span :title="menu.title">{{ menu.title }}</span>
  </el-menu-item>
</template>
<cs-icon name="ElIconMinus" />
<script lang="ts" setup>
import { h } from 'vue'
import { ElIcon } from 'element-plus'
import type { Menu } from './layout'

const MenuIcon = ({ icon }: any) => h(ElIcon, h(icon))
defineOptions({
  name: 'MenuItem',
})

defineProps<{
  menu: Menu
}>()
</script>
<style lang="less">
.menu-popper {
  .feGitStat-menu {
    --feGitStat-menu-bg-color: var(--feGitStat-color-primary);
    .feGitStat-menu-item {
      --feGitStat-menu-hover-bg-color: var(--feGitStat-color-primary-light-5);
      &.is-active {
        color: var(--feGitStat-color-primary);
        background-color: #fff;
      }
    }
  }
}
</style>
