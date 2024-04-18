type MessageTypes = 'success' | 'info' | 'warning' | 'error'
interface Window {
  $message: Record<MessageTypes, any>
  actions: any
  setGlobalState: any
}
