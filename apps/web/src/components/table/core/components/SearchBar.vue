<template>
  <cs-form
    label-position="right"
    :model="props.model"
    :rules="rules"
    :label-width="100"
    :gutter="0"
    ref="formRef"
    v-bind="formProps"
  >
    <div class="flex items-center flex-1">
      <el-row :class="{ 'flex-1': computedSchema.length !== 1 }" style="min-width: 400px">
        <el-col
          v-for="item in schema"
          :key="item.prop"
          :span="24 / computedCols"
          :style="{ display: setShow(item) }"
          v-bind="item.colProps"
        >
          <cs-form-item
            v-model="model[item.prop]"
            :prop="item.prop"
            :slots="item.slots"
            :class="`finance-form-item !w-full form-item-${item.component}`"
            :component="setComponent(item.component)"
            :props="item.props"
            :label="item.label"
          />
        </el-col>
        <el-col :span="computedDefaultBtnSpan">
          <!-- 筛选项不占满行的情况 -->
          <default-buttons
            v-if="
              computedSchema.length > computedCols && computedSchema.length % computedCols !== 0
            "
            class="!justify-end"
            :showResetBtn="showResetBtn"
            :showCollapsedBtn="schema.length > shouldShowCollapsedBtn"
            :collapsed="collapsed"
            :hiddenDefaultBtns="hiddenDefaultBtns"
            @toggle-collapsed="collapsed = !collapsed"
            @search="search"
            @reset="reset"
          />
        </el-col>
      </el-row>
      <!-- 筛选项小于三个时的情况 -->
      <default-buttons
        v-if="computedSchema.length < computedCols"
        :showResetBtn="showResetBtn"
        :hiddenDefaultBtns="hiddenDefaultBtns"
        @search="search"
        @reset="reset"
      />
    </div>
    <div
      v-if="$slots.leftAction || $slots.rightAction"
      class="flex items-center justify-between w-full actions mb-8"
    >
      <div class="leftAction"><slot name="leftAction" /></div>
      <div class="rightAction">
        <!-- 筛选项刚好占满行的情况 -->
        <default-buttons
          v-if="computedSchema.length >= computedCols && computedSchema.length % computedCols === 0"
          :showResetBtn="showResetBtn"
          :hiddenDefaultBtns="hiddenDefaultBtns"
          :showCollapsedBtn="schema.length > shouldShowCollapsedBtn"
          :collapsed="collapsed"
          @reset="reset"
          @search="search"
          @toggle-collapsed="collapsed = !collapsed"
        />
        <slot name="rightAction" />
      </div>
    </div>
  </cs-form>
</template>

<script lang="ts" setup>
import componentsMap from '@/components/form/core/componentMap'
import useScreenWidth from '@/hooks/useScreenWidth'
import { computed, ref } from 'vue'
import DefaultButtons from './DefaultButtons.vue'

import type { FormInstance } from 'element-plus'
import type { FinanceFormPropsType } from '../types/searchbar'

const props = withDefaults(defineProps<FinanceFormPropsType>(), {
  model: () => ({}),
  options: {},
  rules: () => ({}),
  hiddenDefaultBtns: false,
  showResetBtn: true,
})

const emits = defineEmits(['search', 'reset'])

const { is1920Screen } = useScreenWidth()

const formRef = ref<FormInstance>()

const collapsed = ref<boolean>(true)

const shouldShowCollapsedBtn = computed(() => {
  if (props.limit) {
    return props.limit
  }
  switch (computedCols.value) {
    case 2:
      return 3
    case 3:
      return 5
    default:
      return 7
  }
})

const computedSchema = computed(() => {
  if (collapsed.value) {
    return props.schema?.slice(0, shouldShowCollapsedBtn.value)
  }
  return props.schema
})

const computedCols = computed(() => {
  if (props.cols) {
    return props.cols
  }
  if (is1920Screen.value) {
    return 4
  } else {
    return 3
  }
})

const setComponent = (component: any) => {
  if (componentsMap.has(component)) {
    return componentsMap.get(component)
  }
  return false
}

const setShow = (item) => {
  return computedSchema.value.some((c) => c.prop === item.prop) ? 'block' : 'none'
}

const computedDefaultBtnSpan = computed(() => {
  // 四列的情况
  if (computedCols.value === 4) {
    switch (computedSchema.value.length % 4) {
      case 1:
        return 18
      case 2:
        return 12
      case 3:
        return 6
      default:
        return 18
    }
  }
  // 两列的情况
  if (computedCols.value === 2) {
    switch (computedSchema.value.length % 2) {
      case 1:
        return 12
      default:
        return 12
    }
  }
  // 三列的情况
  switch (computedSchema.value.length % 3) {
    case 1:
      return 16
    case 2:
      return 8
    default:
      return 16
  }
})

/**
 * 表单搜索事件
 */
const search = async (e: Event) => {
  e?.preventDefault()
  await formRef.value?.validate()
  emits('search')
}

/**
 * 表单重置事件
 */
const reset = () => {
  formRef.value?.resetFields()
  emits('reset')
}

/**
 * elForm表单校验事件
 */
const validate = () => formRef.value?.validate()

defineExpose({
  search,
  reset,
  formRef,
  validate,
})
</script>

<style lang="less" scoped>
.btns {
  // margin-bottom: 20px;
  margin-left: 24px;
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

.finance-form-item {
  width: 100%;
  :deep(.feGitStat-input__wrapper) {
    width: 100%;
  }
  &.financeCollapseItem {
    margin-bottom: 0 !important;
  }
  :deep(.feGitStat-form-item__content) {
    > div {
      width: 100%;
    }
  }
  :deep(.feGitStat-input-number) {
    width: 100% !important;
    .feGitStat-input {
      width: 100%;
      margin: 0 47px;
    }
  }
}
</style>
