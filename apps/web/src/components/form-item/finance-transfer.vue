<template>
  <el-dialog v-model="show" title="穿梭框">
    <el-transfer
      v-model="dataStr"
      filterable
      class="flex items-center justify-center"
      :titles="['未加入', '已加入']"
      :data="data"
      v-bind="$attrs"
    >
    </el-transfer>
    <div class="flex item-center justify-end mt-8">
      <div>
        <el-button class="m-4" @click="onConfirm" type="primary">确定</el-button>
        <el-button class="m-4" @click="onCancel" type="default">取消</el-button>
      </div>
    </div>
  </el-dialog>
  <el-input readonly @click="show = true" :value="displayLabel" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'

const show = ref<boolean>(false)
// const modelValue = defineModel('modelValue', { default: [] })

defineProps<{
  modelValue: (string | number)[]
}>()

const emits = defineEmits(['update:modelValue'])

const dataStr = ref<(string | number)[]>([])

const generateData = () => {
  const data: any = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const displayLabel = computed(() => {
  if (!dataStr.value) return ''
  if (dataStr.value.length === 0) return ''
  return data.reduce((prev, curr) => {
    if (dataStr.value.includes(curr.key)) {
      return `${prev}${prev === '' ? '' : ','}${curr.label}`
    }
    return prev
  }, '')
})

const onConfirm = () => {
  emits('update:modelValue', dataStr.value)
  show.value = false
}

const onCancel = () => {
  show.value = false
}

const data = generateData()
</script>
<style scoped lang="less"></style>
