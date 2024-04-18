<template>
  <el-checkbox-group v-model="modelValue">
    <el-checkbox v-for="option in options" :key="option.label" :label="option.label" />
  </el-checkbox-group>
</template>

<script lang="ts" setup>
const modelValue = defineModel('modelValue', { default: [] })

defineProps<{
  options: { label: string }[]
  // modelValue: any
}>()

// const emits = defineEmits(['update:modelValue'])

// const onChange = (val: any) => {
//   console.log('val', val)
//   emits('update:modelValue', val)
// }

// const aa = ref(['22'])
</script>
