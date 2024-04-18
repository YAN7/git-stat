<template>
  <div class="btns">
    <el-button type="primary" link @click="handleCollapsed" v-if="showCollapsedBtn">
      <span class="mr-4">{{ collapsed ? '展开' : '收起' }}</span>
      <icon-triple
        class="transform !m-0"
        :style="{ '--un-rotate': collapsed ? '180deg' : '0deg' }"
      />
    </el-button>
    <template v-if="!hiddenDefaultBtns">
      <el-button type="primary" @click="search"> <icon-search /> 查询</el-button>
      <el-button v-if="showResetBtn" type="default" plain @click="reset" class="!mr-0">
        <icon-reset />重置</el-button
      >
    </template>
    <slot name="afterSearch" />
  </div>
</template>
<script setup lang="ts">
import { blurBtnWhenClose } from '@/utils/dom'

defineOptions({
  name: 'DefaultButtons',
})

withDefaults(
  defineProps<{
    hiddenDefaultBtns?: boolean
    schema?: any[]
    collapsed?: boolean
    showResetBtn?: boolean
    showCollapsedBtn?: boolean
  }>(),
  { showResetBtn: true },
)

const emits = defineEmits(['toggleCollapsed', 'search', 'reset'])

const handleCollapsed = () => {
  emits('toggleCollapsed')
}

const search = () => {
  emits('search')
  blurBtnWhenClose()
}
const reset = () => {
  emits('reset')
  blurBtnWhenClose()
}
</script>
<style scoped lang="less">
.btns {
  margin-bottom: 16px;
  margin-left: 16px;
  @apply flex items-center justify-center;
  :deep(.feGitStat-button:first-of-type) {
    margin-right: 16px;
  }
  :deep(.feGitStat-button + .feGitStat-button) {
    margin-left: 0px !important;
    margin-right: 16px;
  }
  :deep(.feGitStat-button:first-of-type) {
    @apply ml-0;
  }
}
</style>
