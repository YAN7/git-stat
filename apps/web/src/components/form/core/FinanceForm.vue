<template>
  <div>
    <cs-form
      label-position="right"
      :model="props.model"
      :rules="rules"
      :label-width="80"
      ref="formRef"
      v-bind="formProps"
    >
      <div class="flex items-end">
        <el-row
          :class="{ oneCol: computedSchema.length === 1, twoCol: computedSchema.length === 2 }"
        >
          <el-col :span="8" v-for="item in computedSchema" :key="item.prop" v-bind="item.colProps">
            <template v-if="item.children">
              <form-item v-bind="item" :model="props.model">
                <el-col
                  :span="8"
                  v-for="child in item.children"
                  :key="child.prop"
                  v-bind="child.colProps"
                >
                  <form-item v-bind="child" :model="props.model" />
                </el-col>
              </form-item>
            </template>
            <form-item v-else v-bind="item" :model="props.model" />
          </el-col>
        </el-row>
        <div class="btns" v-if="!hiddenDefaultBtns">
          <el-button
            v-if="schema.length > defaultCols && needCollapsed"
            type="primary"
            link
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '展开' : '收起' }}
            <IconTriple
              class="ml-4 transform"
              :style="{ '--un-rotate': collapsed ? '180deg' : '0deg' }"
            />
          </el-button>
          <template v-if="!hiddenDefaultBtns">
            <el-button type="primary" @click="search"> <icon-search /> 查询</el-button>
            <el-button type="danger" @click="reset" class="!mr-0"> <icon-reset />重置</el-button>
          </template>
          <slot name="afterSearch" />
        </div>
      </div>
      <div
        v-if="$slots.leftAction || $slots.rightAction"
        class="flex items-center justify-between w-full mb-24 actions"
      >
        <div class="leftAction"><slot name="leftAction" /></div>
        <div class="rightAction"><slot name="rightAction" /></div>
      </div>
    </cs-form>
  </div>
</template>

<script lang="ts" setup>
import FormItem from './components/FormItem.vue'
import { ref } from 'vue'

import type { FormInstance } from 'element-plus'

// eslint-ignore
import type { FinanceFormPropsType } from './index'
import { computed } from 'vue'
import { blurBtnWhenClose } from '@/utils/dom'

const props = withDefaults(defineProps<FinanceFormPropsType>(), {
  model: () => ({}),
  options: {},
  rules: () => ({}),
  btnsOffset: 0,
  defaultCols: 6,
  needCollapsed: true,
})

const computedSchema = computed(() => {
  if (collapsed.value && props.needCollapsed) {
    return props.schema.slice(0, props.defaultCols ?? 6)
  }
  return props.schema
})

const emits = defineEmits(['search', 'reset'])

const formRef = ref<FormInstance>()

const collapsed = ref<boolean>(true)

/**
 * 表单搜索事件
 */
const search = async (e: Event) => {
  e?.preventDefault()
  await formRef.value?.validate()
  emits('search')
  blurBtnWhenClose()
}

/**
 * 表单重置事件
 */
const reset = () => {
  formRef.value?.resetFields()
  emits('reset')
  blurBtnWhenClose()
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
.oneCol {
  flex: 0 0 20rem;
}
.twoCol {
  flex: 0 0 40rem;
}
.btns {
  margin-bottom: 24px;
  margin-left: 16px;
  @apply flex items-center justify-end;
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
