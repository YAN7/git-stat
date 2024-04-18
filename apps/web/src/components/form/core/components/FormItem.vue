<template>
  <cs-form-item
    v-if="comp"
    class="finance-form-item !w-full"
    v-model="model[prop]"
    :prop="prop"
    :slots="slots"
    :class="'form-item-' + component"
    :component="comp"
    :props="props"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import componentMap from '../componentMap'
import type { ComponentEnums } from '../index'

const formItemProps = withDefaults(
  defineProps<{
    model: Record<string, any>
    prop: string
    component: ComponentEnums
    props?: Record<string, any>
    slots?: Record<string, any>
  }>(),
  {},
)

const comp = computed(() => {
  if (componentMap.has(formItemProps.component)) {
    return componentMap.get(formItemProps.component)
  }
  return false
})
</script>

<style scoped lang="less">
.finance-form-item {
  width: 100%;
  :deep(.feGitStat-input__wrapper) {
    width: 100%;
  }
  &.financeCollapseItem {
    margin-bottom: 0 !important;
  }
  :deep(.feGitStat-form-item__content) {
    > div {
      width: 100%;
    }
  }
  :deep(.feGitStat-input-number) {
    width: 100% !important;
    .feGitStat-input {
      width: 100%;
      margin: 0 47px;
    }
  }
}
</style>
