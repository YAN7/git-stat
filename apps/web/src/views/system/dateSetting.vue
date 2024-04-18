<template>
  <p class="mb-24">当前设置的时间区间为：{{ currDateRange }}</p>
  <cs-date-picker
    v-model="dateRange"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
  />
  <el-button
    class="ml-24"
    type="primary"
    :disabled="!dateRange || !dateRange.length"
    @click="onConfirm"
    >确定</el-button
  >
</template>
<script lang="ts" setup>
import http from '@/utils/http'
import { onMounted, ref } from 'vue'

const dateRange = ref<any>([])
const currDateRange = ref('')

const queryCurrDateRange = async () => {
  // @ts-ignore
  const { startDate, endDate } = await http.get('/getDateRange')
  dateRange.value = [startDate, endDate]
  currDateRange.value = `${startDate} 至 ${endDate}`
}

const onConfirm = async () => {
  const [startDate, endDate] = dateRange.value
  await http.post('/setDateRange', { startDate, endDate })
  window.$message.success('设置成功')
  queryCurrDateRange()
}

onMounted(async () => {
  await queryCurrDateRange()
})
</script>
