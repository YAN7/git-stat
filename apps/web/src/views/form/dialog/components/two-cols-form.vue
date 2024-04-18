<template>
  <el-dialog v-model="visible" title="标题" :width="720">
    <finance-form
      ref="financeFormRef"
      hidden-default-btns
      class="col-form"
      :schema="schema"
      :model="model"
      :rules="rules"
      :form-props="{ labelWidth: 90 }"
    >
      <template #rightAction>
        <div class="mt-8">
          <el-button type="default" plain @click="visible = false">取消</el-button>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </div>
      </template>
    </finance-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { FormSchema, FinanceFormRules } from '@/components/form/core'
import { reactive } from 'vue'
import { ref } from 'vue'
import { FinanceForm } from '@/components/form'
import { blurBtnWhenClose } from '@/utils/dom'
import { h } from 'vue'

defineOptions({
  name: 'TwoColsForm',
})

type FormModel = {
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
  field6: string
  field7: string
  field8: string
}

const financeFormRef = ref<InstanceType<typeof FinanceForm>>()

const model = reactive<FormModel>({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
})

const schema: FormSchema<FormModel>[] = [
  {
    label: '四字标签',
    prop: 'field1',
    component: 'input',
    colProps: { span: 12 },
    slots: { prefix: () => h('div', '123'), append: () => h('div', '123') },
  },
  { label: '四字标签', prop: 'field2', component: 'input', colProps: { span: 12 } },
  {
    label: '四字标签',
    prop: 'field3',
    component: 'select',
    props: {
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
      // @ts-ignore
      multiple: true,
    },
    colProps: { span: 12 },
  },
  { label: '四字标签', prop: 'field4', component: 'input', colProps: { span: 12 } },
  { label: '四字标签', prop: 'field5', component: 'input', colProps: { span: 12 } },
  { label: '四字标签', prop: 'field6', component: 'input', colProps: { span: 12 } },
  { label: '四字标签', prop: 'field7', component: 'input', colProps: { span: 12 } },
  { label: '四字标签', prop: 'field8', component: 'input', colProps: { span: 12 } },
]

const rules: FinanceFormRules<FormModel> = {
  field1: { required: true, message: '选项1不能为空' },
  field2: { required: true, message: '选项2不能为空' },
  field3: { required: true, message: '选项3不能为空' },
  field4: { required: true, message: '选项4不能为空' },
}

const visible = ref<boolean>(false)

const onConfirm = async () => {
  try {
    await financeFormRef.value?.validate()
    console.log(model)
  } finally {
    blurBtnWhenClose()
  }
}

defineExpose({
  visible,
})
</script>
<style scoped lang="less">
.col-form {
  :deep(.actions) {
    margin-bottom: 0px;
  }
  :deep(.rightAction) {
    margin-bottom: 0px;
  }
}
</style>
