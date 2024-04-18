import { ref } from 'vue'

const useLoading = () => {
  const loading = ref(false)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return { loading, setLoading }
}

export default useLoading
