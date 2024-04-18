<template>
  <el-breadcrumb class="pb-16 border-b border-b-[#e4e7ed] border-b-solid breadcrumb">
    <el-breadcrumb-item
      class="breadcrumb-item"
      v-for="(r, i) in activeRoutes"
      :key="r.path"
      :class="{ active: i === activeRoutes.length - 1 }"
      >{{ r.meta.title }}</el-breadcrumb-item
    >
    <!-- <el-breadcrumb-item class="breadcrumb-item">二级菜单</el-breadcrumb-item> -->
    <!-- <el-breadcrumb-item class="breadcrumb-item active">三级菜单</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()

const activeRoutes = ref<RouteLocationMatched[]>([])

watch(
  () => route,
  (val) => {
    activeRoutes.value = val.matched.filter((v: RouteLocationMatched) => v.path !== '/')
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
<style lang="less" scoped>
.breadcrumb-item {
  // :deep(.feGitStat-breadcrumb__inner),
  // :deep(.feGitStat-breadcrumb__separator) {
  //   color: var(--feGitStat-text-color-secondary);
  // }
  // &.active {
  //   :deep(.feGitStat-breadcrumb__inner),
  //   :deep(.feGitStat-breadcrumb__separator) {
  //     color: var(--feGitStat-text-color-primary);
  //   }
  // }
}
.breadcrumb {
  padding-left: 0;
  padding-right: 0;
  margin: 0 24px;
}
</style>
