<template>
  <drag-width>
    <template #BoxLeft>
      <left-tree @node-change="nodeChange" />
    </template>
    <template #BoxRight>
      <div class="right-form">
        <finance-form
          hidden-default-btns
          :model="model"
          :schema="schema"
          :btns-props="{ align: 'left' }"
          :form-props="{ labelWidth: 100 }"
        >
          <template #leftAction>
            <div class="mt-8">
              <el-button type="primary" class="ml-100" @click="blurBtnWhenClose">确定</el-button>
              <el-button type="default" plain @click="blurBtnWhenClose">返回</el-button>
            </div>
          </template>
        </finance-form>
      </div>
    </template>
  </drag-width>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import LeftTree from './components/left-tree.vue'
import { FormSchema } from '@/components/form/core'
import { blurBtnWhenClose } from '@/utils/dom'
defineOptions({
  name: 'LeftTreeForm',
})

type FormModel = {
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
  field6: string
}

const model = reactive<FormModel>({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
})

const colProps = { span: 24 }

const schema: FormSchema<FormModel>[] = [
  { component: 'financeDivider', colProps, props: { title: '基本信息' }, labelWidth: '0' },
  {
    label: '组织结构编码',
    prop: 'field1',
    component: 'input',
    colProps,
  },
  { label: '上级机构编码', prop: 'field2', component: 'input', colProps },
  {
    label: '组织机构名称',
    component: 'select',
    prop: 'field3',
    colProps,
    props: {
      options: [
        { label: '机构1', value: '1' },
        { label: '机构2', value: '2' },
        { label: '机构3', value: '3' },
      ],
    },
  },
  {
    label: '选择日期',
    prop: 'field4',
    component: 'datePicker',
    colProps,
    props: { type: 'date' },
  },
  {
    label: '描述',
    prop: 'field5',
    component: 'input',
    colProps,
    props: { type: 'textarea', rows: 5 },
  },
  {
    label: '启用状态',
    prop: 'field6',
    component: 'switch',
    colProps,
    props: { inactiveValue: 0, activeValue: 1 },
  },
]

const nodeChange = (currentData) => {
  model.field1 = currentData.orgCode
  model.field2 = currentData.parentCode
  model.field3 = currentData.orgName
  model.field4 = currentData.date
  model.field5 = currentData.desc
  model.field6 = currentData.enable
}
</script>
<style scoped lang="less">
.right-form {
  background-color: #fff;
  box-shadow: 0px 1px 6px 0px rgba(174, 174, 174, 0.28);
  border-radius: 6px;
  padding: 16px 24px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  :deep(.feGitStat-form-item__content > div) {
    width: 50% !important;
  }
}
</style>
