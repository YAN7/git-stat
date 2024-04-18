import { useBreakpoints } from '@vueuse/core'

const useScreenWidth = () => {
  const breakpoints = useBreakpoints({
    '1280screen': 1310,
    '1440screen': 1440,
    '1920screen': 1919,
  })
  return {
    is1280Screen: breakpoints.isSmaller('1280screen'),
    is1440Screen: breakpoints.greater('1440screen'),
    is1920Screen: breakpoints.greater('1920screen'),
  }
}

export default useScreenWidth
