<template>
  <div v-if="isQiankun">
    <main class="flex-1 overflow-hidden main" :class="{ 'm-16': !isQiankun }">
      <router-view />
    </main>
  </div>
  <div v-else class="layout w-100vw h-100vh">
    <layout-header />
    <section class="flex max-h-[calc(100vh-60px)] h-[calc(100vh-60px)] overflow-hidden">
      <left-menu />
      <main class="flex-1 m-16 overflow-hidden main">
        <router-view />
      </main>
    </section>
  </div>
</template>
<script setup lang="ts">
import LeftMenu from './left-menu.vue'
import LayoutHeader from './header.vue'
import { isQiankun } from '@/utils/qiankun'
</script>
<style lang="less" scoped>
.layout {
  .main {
    border-radius: 8px;
    box-shadow: 0px 2px 7px 0px rgba(218, 218, 218, 0.68);
  }
}
</style>
