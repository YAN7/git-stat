import { ref } from 'vue'

export const useExpend = (list: any, tableRef: any) => {
  const isExpend = ref(false)

  const toggleRowExpansion = () => {
    isExpend.value = !isExpend.value
    toggleRowExpansionAll(list.value, isExpend.value)
  }
  const toggleRowExpansionAll = (data, isExpansion) => {
    data.forEach((item) => {
      tableRef.value?.csTableRef.toggleRowExpansion(item, isExpansion)
      if (item.children !== undefined && item.children !== null) {
        toggleRowExpansionAll(item.children, isExpansion)
      }
    })
  }

  return { isExpend, toggleRowExpansion }
}
