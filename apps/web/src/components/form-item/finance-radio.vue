<template>
  <el-radio-group v-model="modelValue">
    <component
      v-for="option in options"
      :is="ComponentType"
      :key="option.label"
      :label="option.label"
      >{{ option.label }}</component
    >
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElRadioButton, ElRadio } from 'element-plus'

defineOptions({
  name: 'FinanceRadio',
})

const props = withDefaults(
  defineProps<{
    options: { label: string }[]
    type?: 'radio' | 'button'
  }>(),
  {
    type: 'radio',
  },
)

const modelValue = defineModel('modelValue', { default: '' })

const ComponentType = computed(() => (props.type === 'button' ? ElRadioButton : ElRadio))
</script>
