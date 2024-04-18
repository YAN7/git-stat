<template>
  <div
    class="h-full overflow-hidden left-menu"
    style="transition: width 0.2s"
    :class="[appStore.isCollapse ? 'w-48' : 'w-220']"
  >
    <el-menu
      class="h-full overflow-y-auto menu"
      router
      :default-active="$route.path"
      :collapse="appStore.isCollapse"
      :collapse-transition="false"
      popper-effect="light"
      text-color="#fff"
      menu-trigger="click"
    >
      <menu-item v-for="menu in activeMenu" :key="menu.route" :menu="menu" />
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { Link, DataBoard } from '@element-plus/icons-vue'

import MenuItem from './menu-item.vue'
import { useAppStore } from '@/stores/app'

import type { Menu } from './layout'
import { computed } from 'vue'
import { IconMenuList, IconHome, IconMenuForm, IconMenuOa, IconWarning } from '@/components/icons'

const appStore = useAppStore()

const menus: Record<string, Menu[]> = {
  basic: [
    {
      title: '看板',
      route: '/dashboard',
      icon: IconHome,
      // children: [
      //   {
      //     title: '很长很长很长很长很长很长很长的首页',
      //     route: '/dashboard',
      //   },
      // ],
    },
    {
      title: '列表页',
      route: '/list',
      icon: IconMenuList,
      children: [
        { title: '基础', route: '/list/basic' },
        { title: 'tab切换', route: '/list/tab' },
        { title: '左侧树', route: '/list/left-tree' },
      ],
    },
    {
      title: '表单页',
      route: '/form',
      icon: IconMenuForm,
      children: [
        { title: '两列', route: '/form/two-cols' },
        { title: '三列', route: '/form/three-cols' },
        { title: 'tab切换', route: '/form/tab' },
        { title: '弹框', route: '/form/dialog' },
        { title: '左侧树', route: '/form/left-tree' },
      ],
    },
    {
      title: '审批页',
      route: '/workflow',
      icon: IconMenuOa,
      children: [
        { title: '审批详情', route: '/workflow/todo' },
        // { title: '已办', route: '/workflow/done' },
      ],
    },
    {
      title: '异常页',
      route: '/exception',
      icon: IconWarning,
      children: [
        { title: '403', route: '/exception/403' },
        { title: '404', route: '/exception/404' },
        { title: '500', route: '/exception/500' },
      ],
    },
  ],
  user: [
    {
      title: '看板',
      route: '/dashboard',
      icon: DataBoard,
      children: [
        {
          title: '很长很长很长很长很长很长很长的首页',
          route: '/dashboard/home',
        },
      ],
    },
  ],
  log: [
    {
      title: '列表页',
      route: '/list',
      icon: Link,
      children: [
        { title: '基础', route: '/list/basic' },
        { title: 'tab切换', route: '/list/tab' },
        { title: '左侧树', route: '/list/left-tree' },
      ],
    },
  ],
}

const activeMenu = computed<Menu[]>(() => menus[appStore.topMenu])
</script>
<style lang="less" scoped>
.left-menu {
  :deep(.feGitStat-menu-item span) {
    @apply text-truncate;
  }
  :deep(.feGitStat-sub-menu__icon-arrow) {
    margin-right: 0;
  }
  :deep(.menu) {
    background-image: url('/src/assets/svg/left-menu-bg.svg');
    --feGitStat-menu-hover-bg-color: transparent;
    --feGitStat-menu-bg-color: transparent;
    --feGitStat-menu-active-color: #fff;
    .feGitStat-menu-item {
      margin-left: 10px;
      border-radius: 24px 0 0 24px;
      transition: unset;

      &:hover {
        background-color: var(--feGitStat-color-primary-light-2);
      }
      &.is-active {
        background-color: #fff;
        color: var(--feGitStat-color-primary);
        border-radius: 24px 0 0 24px;
        &::after,
        &::before {
          content: '';
          position: absolute;
          z-index: 9;
          right: 0px;
          display: block;
          width: 25px;
          height: 25px;
        }
        &::before {
          background-image: url(../assets/svg/left-menu-active-top-bg.svg);
          top: -25px;
        }
        &::after {
          background-image: url(../assets/svg/left-menu-active-bottom-bg.svg);
          bottom: -25px;
        }
      }
    }
  }
}
</style>
