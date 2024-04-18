<template>
  <div>
    <finance-form
      :model="model"
      :schema="schema"
      :rules="rules"
      :btns-props="btnsProps"
      :form-props="formProps"
      :need-collapsed="false"
      hidden-default-btns
      ref="formRef"
      class="mb-8 two-cols-form"
    />
    <el-row>
      <el-col :span="24">
        <div class="flex items-center justify-end">
          <el-button type="default" plain @click="blurBtnWhenClose">返回</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from './hooks/useForm'
import { FinanceForm } from '@/components/form'
import { blurBtnWhenClose } from '@/utils/dom'

const formRef = ref<InstanceType<typeof FinanceForm>>()

const { model, schema, rules, btnsProps, formProps } = useForm()

const submit = async () => {
  try {
    await formRef.value?.validate()
    window.$message.success(JSON.stringify(model))
  } finally {
    blurBtnWhenClose()
  }
}
</script>

<style scoped lang="less">
.two-cols-form {
  :deep(.form-item-financeDivider),
  :deep(.form-item-financeCollapseItem) {
    .feGitStat-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
