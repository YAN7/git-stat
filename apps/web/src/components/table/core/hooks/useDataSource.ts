import http from '@/utils/http'
import { isFunction } from '@/utils/is'
import { computed, reactive, unref } from 'vue'

interface Options {
  queryType?: 'post' | 'get'
  [key: string]: any
}

const fakeData = [
  {
    id: 1,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 2,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 3,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 4,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 5,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 6,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 7,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 8,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 9,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 10,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
  {
    id: 11,
    field1: '文字',
    field2: '文字',
    field3: '文字',
    field4: '文字',
    field5: '文字',
    field6: '文字',
    field7: '文字',
    field8: '文字',
    field9: '文字',
    field10: '文字',
    field11: '文字',
    field12: '文字',
    field13: '文字',
    field14: '文字',
    field15: '文字',
  },
]

const useDataSource = (options: Options) => {
  const listSource = reactive({
    list: [] as any,
    total: 0,
    loading: false,
  })
  const collectParams = (rawParams = {}) => {
    return {
      pageRequest: {
        pageNum: unref(options.pagination)?.currentPage,
        pageSize: unref(options.pagination)?.pageSize,
      },
      ...unref(options.cachedSearchModel),
      ...(typeof options.extraSearchInfo === 'function' ? options.extraSearchInfo() : {}),
      ...rawParams,
    }
  }

  const loadList = async (rawParams?: any) => {
    try {
      const params = collectParams(rawParams)
      let endpoint = options.endpoint
      // * 测试用
      if (endpoint === '/fake') {
        listSource.list = fakeData
        listSource.total = fakeData.length
        return { listSource, loadList, pagedData }
      }
      options.setLoading(true)
      const { beforeFetch } = options

      if (isFunction(beforeFetch)) {
        const _params = beforeFetch()
        if (_params.endpoint) {
          endpoint = _params.endpoint
        }
      }
      const { data } = await http[options.queryType!](endpoint, params)

      if (options.afterFetch) {
        listSource.list = options.afterFetch(data)
      } else {
        listSource.list = data?.data || []
      }
      listSource.total = data?.totalCount
    } finally {
      options.setLoading(false)
    }
  }
  const pagedData = computed(() => {
    const currentPage = unref(options.pagination)?.currentPage
    const pageSize = unref(options.pagination)?.pageSize
    return listSource.list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  })

  return { listSource, loadList, pagedData }
}

export default useDataSource
