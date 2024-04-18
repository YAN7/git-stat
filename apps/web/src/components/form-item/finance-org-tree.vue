<template>
  <el-tree-select
    ref="orgTree"
    filterable
    collapse-tags
    collapse-tags-tooltip
    class="org-tree-select"
    :modelValue="modelValue"
    :multiple="multiple"
    :check-strictly="allTree"
    :data="products"
    :props="{ multiple: true, value: valueKey, label: labelKey }"
    :render-after-expand="false"
    popper-class="org-tree__popper"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/utils/http'

defineOptions({
  name: 'OrgTree',
})

const props = withDefaults(
  defineProps<{
    modelValue: string
    multiple?: boolean
    all?: boolean
    valueKey?: string
    labelKey?: string
    allTree?: boolean
  }>(),
  {
    multiple: true,
    all: false,
    valueKey: 'orgNo',
    hasPermission: false,
    labelKey: 'orgName',
    filterEnd: false,
    allTree: false,
  },
)
const orgTree = ref()
const products: any = ref([])
const emits = defineEmits(['update:modelValue', 'change', 'mathChild'])

// 设置codeWithName字段
const setCodeAndName = (data: any) =>
  data.map((d: any) => {
    const newValue = {
      ...d,
      codeWidthName: `${d.orgNo}-${d.orgName}`,
    }
    if (d.children) {
      newValue.children = setCodeAndName(d.children)
    }
    return newValue
  })

const queryOrgs = async () => {
  const res = props.hasPermission ? await http.get('org/roleOrgTree') : await http.post('/org/tree')
  if (props.all) {
    products.value = [
      { orgNo: 'ALL', orgName: '全部', codeWidthName: 'ALL-全部' },
      ...setCodeAndName(res.data),
    ]
    return
  }
  products.value = setCodeAndName(res.data)
}
function onChange(val: any) {
  emits('update:modelValue', val)
}
onMounted(() => {
  queryOrgs()
})
</script>

<style lang="less" scoped>
.org-tree-select {
  :deep(.feGitStat-select-tags-wrapper .feGitStat-tag) {
    display: inline-flex;
  }
  :deep(.feGitStat-select__tags) {
    z-index: 5;
  }
}
</style>
