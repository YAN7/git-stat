<template>
  <finance-divider title="基本信息" class="mb-24" />
  <finance-form
    ref="financeFormRef"
    hidden-default-btns
    :model="baseInfoModel"
    :schema="schema"
    :form-props="{ labelWidth: 100 }"
  />
  <div class="relative form-tabs">
    <el-button type="primary" plain class="add-btn" @click="addRow"><icon-add /> 增行</el-button>
    <el-tabs v-model="currentTab">
      <el-tab-pane label="子表1" name="1">
        <el-form ref="subFormRef1" :model="subList1" :rules="tableRules1">
          <el-table :data="subList1" size="large" align="center">
            <el-table-column label="子表1信息列1" prop="field1" fixed align="center">
            </el-table-column>
            <el-table-column label="子表1信息列2" prop="field2" align="center">
              <template #header>
                <span class="text-danger">* </span><span>子表1信息列2</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field2`">
                  <el-input class="edit" v-model="row.field2" />
                </el-form-item>
                <span v-else>{{ row.field2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子表1信息列3" prop="field3" align="center">
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field3`">
                  <!-- <el-input  v-model="row.field2" /> -->
                  <el-date-picker class="edit" v-model="row.field3" value-format="YYYY-MM-DD" />
                </el-form-item>
                <span v-else>{{ row.field3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="{ row, $index }">
                <el-button link type="primary" @click="row.editable = true">编辑</el-button>
                <el-button link type="primary" @click="onSave(row, $index)">保存</el-button>
                <el-button link type="danger" @click="delRow($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="子表2" name="2">
        <el-form ref="subFormRef2" :model="subList2" :rules="tableRules2">
          <el-table :data="subList2" size="large" align="center">
            <el-table-column label="子表2信息列1" prop="field1" fixed align="center">
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field1`">
                  <el-input class="edit" v-model="row.field1" />
                </el-form-item>
                <span v-else>{{ row.field1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子表2信息列2" prop="field2" align="center">
              <template #header>
                <span class="text-danger">* </span><span>子表2信息列2</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field2`">
                  <el-input class="edit" v-model="row.field2" />
                </el-form-item>
                <span v-else>{{ row.field2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子表2信息列3" prop="field3" align="center">
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field3`">
                  <!-- <el-input  v-model="row.field2" /> -->
                  <el-date-picker class="edit" v-model="row.field3" value-format="YYYY-MM-DD" />
                </el-form-item>
                <span v-else>{{ row.field3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="{ row, $index }">
                <el-button link type="primary" @click="row.editable = true">编辑</el-button>
                <el-button link type="primary" @click="onSave(row, $index)">保存</el-button>
                <el-button link type="danger" @click="delRow($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="子表3" name="3">
        <el-form ref="subFormRef3" :model="subList3" :rules="tableRules3">
          <el-table :data="subList3" size="large">
            <el-table-column label="子表3信息列1" prop="field1" fixed align="center">
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field1`">
                  <el-input class="edit" v-model="row.field1" />
                </el-form-item>
                <span v-else>{{ row.field1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子表3信息列2" prop="field2" align="center">
              <template #header>
                <span class="text-danger">* </span><span>子表3信息列2</span>
              </template>
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field2`">
                  <el-input class="edit" v-model="row.field2" />
                </el-form-item>
                <span v-else>{{ row.field2 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子表3信息列3" prop="field3" align="center">
              <template #default="{ row, $index }">
                <el-form-item v-if="row.editable" :prop="`${$index}.field3`">
                  <!-- <el-input  v-model="row.field2" /> -->
                  <el-date-picker class="edit" v-model="row.field3" value-format="YYYY-MM-DD" />
                </el-form-item>
                <span v-else>{{ row.field3 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="{ row, $index }">
                <el-button link type="primary" @click="row.editable = true">编辑</el-button>
                <el-button link type="primary" @click="onSave(row, $index)">保存</el-button>
                <el-button link type="danger" @click="delRow($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="flex items-center justify-end mt-[20px]">
    <el-button type="default" plain @click="blurBtnWhenClose">返回</el-button>
    <el-button type="primary" @click="onConfirm">确定</el-button>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { FinanceForm } from '@/components/form'

import { baseInfoModel, schema } from './hooks/useBaseInfo'
import { blurBtnWhenClose } from '@/utils/dom'

defineOptions({
  name: 'TabFrom',
})

const subFormRef1 = ref<FormInstance>()
const subFormRef2 = ref<FormInstance>()
const subFormRef3 = ref<FormInstance>()

const currentTab = ref<'1' | '2' | '3'>('1')

const subList1: any = reactive([{ field1: '1', field2: '2', field3: '2023-06-14' }])
const subList2: any = reactive([{ field1: '1', field2: '2', field3: '2023-06-14' }])
const subList3: any = reactive([{ field1: '1', field2: '2', field3: '2023-06-14' }])

const tableRules1 = computed(() => {
  let rules: any = {}
  subList1.forEach((item, index) => {
    for (let key in item) {
      if (key !== 'field3') {
        rules[`${index}.${key}`] = [{ required: true, message: '必填项' }]
      }
    }
  })
  return rules
})
const tableRules2 = computed(() => {
  let rules: any = {}
  subList2.forEach((item, index) => {
    for (let key in item) {
      if (key !== 'field3') {
        rules[`${index}.${key}`] = [{ required: true, message: '必填项' }]
      }
    }
  })
  console.log('rules', rules)
  return rules
})
const tableRules3 = computed(() => {
  let rules: any = {}
  subList3.forEach((item, index) => {
    for (let key in item) {
      if (key !== 'field3') {
        rules[`${index}.${key}`] = [{ required: true, message: '必填项' }]
      }
    }
  })
  return rules
})

const delRow = (index: number) => {
  switch (currentTab.value) {
    case '1': {
      subList1.splice(index, 1)
      break
    }
    case '2': {
      subList2.splice(index, 1)
      break
    }
    case '3': {
      subList3.splice(index, 1)
      break
    }
  }
  blurBtnWhenClose()
}

const addRow = () => {
  switch (currentTab.value) {
    case '1': {
      subList1.push({ field1: 123, field2: '', field3: '', editable: true })
      break
    }
    case '2': {
      subList2.push({ field1: 123, field2: '', field3: '', editable: true })
      break
    }
    case '3': {
      subList3.push({ field1: 123, field2: '', field3: '', editable: true })
      break
    }
  }
  blurBtnWhenClose()
}

const onSave = async (row, index: number) => {
  const toBeValidateFields: any = []
  if (currentTab.value === '1') {
    Object.keys(tableRules1.value).forEach((key) => {
      if (key.split('.')[0] === String(index)) {
        toBeValidateFields.push(key)
      }
    })
    try {
      await subFormRef1.value?.validateField(toBeValidateFields)
      row.editable = false
    } catch (err) {
      console.log('err', err)
    }
  }
  if (currentTab.value === '2') {
    Object.keys(tableRules2.value).forEach((key) => {
      if (key.split('.')[0] === String(index)) {
        toBeValidateFields.push(key)
      }
    })
    await subFormRef2.value?.validateField(toBeValidateFields)
    row.editable = false
  }
  if (currentTab.value === '3') {
    Object.keys(tableRules3.value).forEach((key) => {
      if (key.split('.')[0] === String(index)) {
        toBeValidateFields.push(key)
      }
    })
    await subFormRef3.value?.validateField(toBeValidateFields)
    row.editable = false
  }
  blurBtnWhenClose()
}

const onConfirm = async () => {
  await subFormRef1.value?.validate()
  await subFormRef2.value?.validate()
  await subFormRef3.value?.validate()
  blurBtnWhenClose()
}

const financeFormRef = ref<InstanceType<typeof FinanceForm>>()
</script>
<style scoped lang="less">
.add-btn {
  position: absolute;
  top: 4px;
  right: 0;
  z-index: 99;
}
.form-tabs {
  :deep(.feGitStat-tabs__content) {
    padding: 0;
    padding-top: 16px;
  }
  :deep(.feGitStat-tabs__item:nth-child(2)) {
    padding-left: 0 !important;
  }
  :deep(.feGitStat-tabs__nav-wrap::after) {
    left: 0 !important;
    right: 0;
  }
  :deep(.feGitStat-form .feGitStat-form-item) {
    margin-bottom: 0px;
  }
  :deep(.feGitStat-form-item__error) {
    top: 21%;
    right: 3px;
    left: unset;
    background: white;
  }
  :deep(.feGitStat-form-item__content) {
    justify-content: center;
  }
  :deep(.feGitStat-table__row) {
    &:has(.edit) {
      .feGitStat-table__cell {
        padding: 8px;
        padding-top: 7px;
      }
    }
  }
}
</style>
<style lang="less">
// .feGitStat-table__cell {
//   &:has(.edit) {
//     padding: 0 !important;
//   }
// }
</style>
