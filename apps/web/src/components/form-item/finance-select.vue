<template>
  <el-select v-model="modelValue">
    <el-option
      v-for="item in options"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="bindObjectToValue ? item : item[valueField]"
    />
    <!-- <template #prefix>
      <slot name="prefix" :msg="{ hehe: 123 }" />
    </template> -->
  </el-select>
</template>
<script setup lang="ts" name="FinanceSelect">
// 合并使用ElSelect的类型会报错
// type ElSelectProps = InstanceType<typeof ElSelect>['$props']

export type FinanceSelectProps = {
  /**
   * @description 下拉框选项
   */
  options: Record<string, any>[]
  /**
   * @description label的键名
   * @default label
   */
  labelField?: string
  /**
   * @description value的键值
   * @default value
   */
  valueField?: string
  /**
   * @description 是否使用对象作为绑定值
   * @default false
   */
  bindObjectToValue?: boolean
  slots?: any
}

withDefaults(defineProps<FinanceSelectProps>(), {
  labelField: 'label',
  valueField: 'value',
  bindObjectToValue: false,
})

const modelValue = defineModel('modelValue', { default: '' })
</script>
<style scoped lang="less"></style>
