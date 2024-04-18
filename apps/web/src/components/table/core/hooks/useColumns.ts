import type { AnyColumn } from 'element-plus/lib/components/table-v2/src/common'
import { computed, ref, unref, watch } from 'vue'

const handleItem = (col: any) => {
  const defaultType = col.type === 'selection' || col.type === 'index' || col.type === 'expand'
  return {
    showOverflowTooltip: true,
    ...(defaultType ? {} : { minWidth: 120 }),
    ...col,
    align: 'center',
  }
}

const useColumns = (props: any) => {
  const metaCols = ref<AnyColumn>(unref(props.columns))

  watch(
    () => props.columns,
    (curr) => {
      metaCols.value = curr
    },
    { deep: true },
  )

  const computedColumns = computed(() => {
    return unref(metaCols).map(handleItem)
  })

  return {
    computedColumns,
  }
}

export default useColumns
