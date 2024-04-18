import { computed, ref, unref } from 'vue'

/**
 * 功能: 获取pagination, 可设置pagination
 */

const usePagination = () => {
  const paginationInfo: any = ref({})

  const pagination = computed((): any => {
    return {
      pageSizes: [10, 20, 50],
      currentPage: 1,
      pageSize: 10,
      layout: 'total, prev, pager, next, sizes, jumper',
      ...unref(paginationInfo),
    }
  })

  const setPagination = (paginationProps: any): void => {
    paginationInfo.value = {
      ...unref(paginationInfo),
      ...paginationProps,
    }
  }

  return { pagination, setPagination }
}

export default usePagination
