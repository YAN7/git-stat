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
import { DataBoard, Link } from '@element-plus/icons-vue'

import { useAppStore } from '@/stores/app'
import MenuItem from './menu-item.vue'

import { IconHome } from '@/components/icons'
import { computed } from 'vue'
import type { Menu } from './layout'

const appStore = useAppStore()

const menus: Record<string, Menu[]> = {
  basic: [
    {
      title: '看板',
      route: '/dashboard',
      icon: IconHome,
    },
    {
      title: '设置时间区间',
      route: '/dateSetting',
      icon: DataBoard,
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
