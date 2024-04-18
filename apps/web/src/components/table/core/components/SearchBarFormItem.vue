<template>
  <cs-form-item
    v-if="comp"
    trigger="blur"
    v-bind="$attrs"
    :prop="field"
    class="feGitStat-form-item lalala"
  >
    <component
      :codes="codes"
      :cdata="$props.cdata"
      clearable
      v-bind="Object.assign({}, $attrs, computedprops)"
      v-model="model[field]"
      class="w-full"
      :is="comp"
    />
  </cs-form-item>
</template>

<script setup lang="ts" name="BasicFormItem">
import { computed } from 'vue'
// @ts-ignore
import componentsMap from '../Form/core/componentMap'

// @ts-ignore
import type { ComponentEnums } from '../Form/core/types'

const props = withDefaults(
  defineProps<{
    model: any
    field: string
    component: ComponentEnums
    props?: any
    cdata?: any
  }>(),
  { props: {} },
)
// const emit = defineEmits(['changeValueData'])
// let changeValueData = reactive<any>({})
// const changeValue = (val: any) => {
// 	changeValueData = val
// 	emit('changeValueData', changeValueData)
// 	console.log('changeValueData', changeValueData)
// }
const comp = computed(() => {
  if (componentsMap.has(props.component)) {
    return componentsMap.get(props.component)
  }
  return false
})

const computedprops = computed(() => {
  return props.props
})
const codes = computed(() => {
  return props.model['deptCode']
})
</script>

<style scoped lang="less">
:deep(.feGitStat-form-item) {
  @apply w-full items-center;
  :deep(.feGitStat-date-editor),
  :deep(.feGitStat-input__wrapper) {
    width: 100%;
    height: 100%;
  }
  :deep(.feGitStat-input-number) {
    width: 100% !important;
  }
}
</style>
