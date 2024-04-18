<template>
  <cs-select
    :modelValue="modelValue"
    :options="users"
    label-key="orgName"
    value-key="orgNo"
    @change="onChange"
  >
    <el-option
      v-for="item in users"
      :key="item?.orgName"
      :label="item?.orgName"
      :value="item.orgNo"
    />
  </cs-select>
</template>

<script setup lang="ts" name="TeamTree">
import { onMounted, ref } from 'vue'
import http from '@/utils/http'

defineOptions({
  name: 'FinanceUserSelect',
})

defineProps<{
  modelValue: string
}>()

const users = ref<any>([])

const queryUser = async () => {
  const res: any = await http.get('org/getOrgNo')
  users.value = res.data
}

const emits = defineEmits(['update:modelValue'])

function onChange(val: any) {
  emits('update:modelValue', val)
}

onMounted(() => {
  queryUser()
})
</script>
