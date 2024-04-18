<template>
  <div class="flex items-center justify-center mt-100">
    <el-button size="large" type="primary" @click="openForm1">单列弹窗</el-button>
    <el-button size="large" type="primary" @click="openForm2">两列弹窗</el-button>
    <single-cols-form ref="formRef1" />
    <two-cols-form ref="formRef2" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TwoColsForm from './components/two-cols-form.vue'
import SingleColsForm from './components/single-cols-form.vue'

defineOptions({
  name: 'DialogForm',
})

const formRef1 = ref()
const formRef2 = ref()

const openForm1 = () => {
  formRef1.value.visible = true
}

const openForm2 = () => {
  formRef2.value.visible = true
}
</script>
<style scoped lang="less"></style>
