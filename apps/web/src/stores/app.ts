import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isCollapse: false,
    topMenu: 'basic',
  }),
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setTopMenu(menu: string) {
      this.topMenu = menu
    },
  },
})
