import { type Component, type Ref, ref } from 'vue'

const useInstance = <T extends abstract new (...args: any[]) => Component>() =>
  ref() as Ref<InstanceType<T>>

export default useInstance
