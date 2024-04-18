<template>
  <div>
    <finance-search-bar
      ref="searchFormRef"
      :model="formModel"
      :schema="formSchema"
      :rules="formRules"
      :cols="cols"
      :limit="limit"
      :hiddenDefaultBtns="hiddenDefaultBtns"
      :showResetBtn="showResetBtn"
      v-bind="formOptions"
      v-if="showSearchForm"
      @search="search"
      @reset="search"
    >
      <template v-if="$slots.afterSearch" #afterSearch>
        <slot name="afterSearch" />
      </template>
      <template #leftAction>
        <div class="mb-16">
          <slot name="leftAction"></slot>
        </div>
      </template>
      <template #rightAction> </template>
    </finance-search-bar>
    <cs-table v-loading="loading" :data="listSource.list" size="large" v-bind="$attrs">
      <template v-for="col in computedColumns" :key="col.key">
        <cs-table-column
          v-if="col.type === 'index'"
          type="index"
          label="序号"
          key="index"
          :index="indexMethod"
          :width="60"
          align="center"
        />
        <cs-table-column v-else :prop="col.key" :label="col.title" align="center" v-bind="col">
          <template v-if="col.slot" #default="scope">
            <slot :name="col.slot" :row="scope.row" :index="scope.$index" :col="col" />
          </template>
          <template v-if="col.children">
            <cs-table-column
              v-for="colChild in col.children"
              :key="colChild.key"
              align="center"
              :prop="colChild.key"
              :label="colChild.title"
              v-bind="colChild"
            ></cs-table-column>
          </template>
        </cs-table-column>
      </template>
    </cs-table>
    <div class="flex items-center justify-between mt-24">
      <div>
        <slot name="leftPaginationContent" />
      </div>
      <cs-pagination
        background
        v-if="showPagination"
        class="flex justify-end"
        popper-class="table-pagination"
        :total="listSource.total"
        @update:current-page="onPageChange"
        @update:page-size="onPageSizeChange"
        v-bind="pagination"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import FinanceSearchBar from './components/SearchBar.vue'

import useColumns from './hooks/useColumns'
import useDataSource from './hooks/useDataSource'
import useLoading from './hooks/useLoading'
import usePagination from './hooks/usePagination'
import useSearchForm from './hooks/useSearchForm'

const props = withDefaults(
  defineProps<{
    formModel?: any
    formSchema?: any
    formRules?: any
    columns: any
    formOptions?: any
    extraSearchInfo?: any
    endpoint: string
    queryType: 'post' | 'get'
    beforeFetch?: any
    afterFetch?: any
    frontPage?: boolean
    immediate?: boolean
    showSearchForm?: boolean
    hiddenDefaultBtns?: boolean
    cols?: 1 | 2 | 3 | 4
    limit?: number
    showPagination?: boolean
    showResetBtn?: boolean
  }>(),
  {
    immediate: true,
    queryType: 'post',
    showPagination: true,
    showSearchForm: true,
    hiddenDefaultBtns: false,
    showResetBtn: true,
  },
)

const searchFormRef = ref()

const { pagination, setPagination } = usePagination()
const { cachedSearchModel } = useSearchForm(props.formModel)
const { setLoading, loading } = useLoading()
const { listSource, loadList } = useDataSource({
  pagination,
  cachedSearchModel,
  extraSearchInfo: props.extraSearchInfo,
  endpoint: props.endpoint,
  queryType: props.queryType,
  beforeFetch: props.beforeFetch,
  afterFetch: props.afterFetch,
  frontPage: props.frontPage,
  setLoading,
})
const { computedColumns } = useColumns(props)

onMounted(() => {
  if (props.immediate) {
    loadList()
  }
})

const indexMethod = (index: number) => {
  return index + 1 + (pagination.value.currentPage - 1) * pagination.value.pageSize
}

const onPageChange = (currentPage: number) => {
  setPagination({ currentPage })
  if (props.frontPage) return
  loadList()
}

const onPageSizeChange = (pageSize: number) => {
  setPagination({
    currentPage: 1,
    pageSize,
  })
  if (props.frontPage) return
  loadList()
}

/**
 * *description 只重置分页参数并重新请求列表
 */
const search = () => {
  setPagination({
    currentPage: 1,
  })
  loadList()
}
/**
 * * @description 重置查询参数和分页参数并重新请求列表
 */

const resetAll = () => {
  searchFormRef?.value?.formRef.resetFields()
  setPagination({
    page: 1,
  })
  loadList()
}

defineExpose({
  loadList,
  setPagination,
  searchFormRef,
  search,
  resetAll,
  setLoading,
  listSource,
})
</script>
