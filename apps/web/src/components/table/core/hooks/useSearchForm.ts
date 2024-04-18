import { ref } from 'vue'

const useSearchForm = (model: any) => {
  const cachedSearchModel = ref(model)

  const setCachedSearchModel = (value: any) => {
    cachedSearchModel.value = value
  }

  return {
    cachedSearchModel,
    setCachedSearchModel,
  }
}

export default useSearchForm
