<template>
  <div>
    <el-button class="ml-16 mb-16" type="primary" @click="toggleSidebar">
      <icon-menu-report />展开/收起左侧菜单栏
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="getSidebarCollapsed">
      <icon-menu-report />获取左侧菜单栏收缩状态 -- <span>{{ collapsed }}</span>
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="getAppName">
      <icon-menu-report />获取系统名称 -- <span>{{ appName }}</span>
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="setShowMenu">
      <icon-menu-report />只显示内容区域
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="onJump">
      <icon-menu-report />通过主应用路由跳到某个主应用页面
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="onLogout">
      <icon-menu-report />退出登录
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="setBreadCrumbVisible(false)">
      <icon-menu-report />隐藏面包屑导航
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="setBreadCrumbVisible(true)">
      <icon-menu-report />显示面包屑导航
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="mountHeaderSlot()">
      <icon-menu-report />挂载主应用头部扩展槽
    </el-button>
    <el-button class="ml-16 mb-16" type="primary" @click="unMountHeaderSlot()">
      <icon-menu-report />卸载主应用头部扩展槽
    </el-button>

    <!-- <cs-dialog-select-tree
      id="cs-dialog-tree"
      class="hahaha"
      v-model="value"
      multiple
      :tree-props="treeProps"
      :table-props="tableProps"
      :checked-config="checkedConfig"
      :before-submit="beforeSubmit"
      @submit="onSubmit"
      @search-tree="onSearchTree"
      @search-table="onSearchTable"
    /> -->
    <el-button id="hehe">hehehehe</el-button>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, provide } from 'vue'
import { ref } from 'vue'
import type { CsDialogSelectTreeEmits, CsDialogSelectTreeProps } from 'csui'
import { getDataApi, getTableApi } from './data'

const appInstance = getCurrentInstance()
const collapsed = ref('')
const appName = ref('')

const a = () => 123
const b = () => 123
const c = () => 123
const d = () => 123

provide('a', a)

// @ts-ignore
const { actions } = appInstance?.appContext.config.globalProperties ?? {}

// actions.setBreadCrumbVisible(false)

// onBeforeUnmount(() => {
//   actions.setBreadCrumbVisible(true)
// })

const toggleSidebar = () => {
  actions.toggleSidebar()
}
const setShowMenu = () => {
  actions.hideMenu()
}

const onJump = () => {
  actions.onJump('/userCenter/userMgt')
}

const getAppName = () => {
  appName.value = actions.getAppName()
}

const getSidebarCollapsed = () => {
  const res = actions.getSidebarCollapsed()
  collapsed.value = res
}
const onLogout = () => {
  actions.logout()
}

const setBreadCrumbVisible = (visible) => {
  actions.setBreadCrumbVisible(visible)
}

const mountHeaderSlot = () => {
  actions.mountHeaderSlot('#hehe')
}

const unMountHeaderSlot = () => {
  actions.unMountHeaderSlot('#hehe')
}

const value = ref()
interface Tree {
  organizationId: string
  orgUnitName: string
  orgUnitId: string
  children?: Tree[]
}

const checkedConfig = {
  label: (data) => `${data.personName}--${data.deptName}`,
  value: 'personId',
}

const props = {
  label: 'orgUnitName',
  children: 'children',
}
const loadNode = (node: any, resolve: (data: Tree[]) => void) => {
  const data = node.data

  getDataApi({
    orgUnitId: data.orgUnitId,
  }).then((res) => {
    resolve(res.data)
  })
}
const onSearchTree = (keyword: string, resolve: (data: Tree[]) => void) => {
  getDataApi({ keyword }).then((res) => {
    resolve(res.data)
  })
}

const treeProps: CsDialogSelectTreeProps['treeProps'] = {
  props,
  load: loadNode,
  lazy: true,
  nodeKey: 'orgUnitId',
  showCheckbox: true,
}

const tableProps: CsDialogSelectTreeProps['tableProps'] = {
  columns: [
    { label: '姓名', prop: 'personName' },
    { label: '岗位', prop: 'position' },
    { label: '部门', prop: 'deptName' },
  ],
  rowKey: checkedConfig.value,
  selectable: (row: any) => row.personName !== '孟殿原',
}
const onSearchTable: CsDialogSelectTreeEmits['search-table'] = (params, resolve) => {
  getTableApi(params as any)
    .then((res) => resolve(res.data))
    .catch(() => resolve([]))
}

const beforeSubmit: CsDialogSelectTreeProps['beforeSubmit'] = (checkedNodes, checkedKeys) => {
  if ((checkedNodes as any).length) {
    return true
  } else {
    // ElMessage.warning('请选择组织')
    return false
  }
}

const onSubmit: CsDialogSelectTreeEmits['submit'] = (checkedNodes, checkedKeys) =>
  console.log(checkedNodes, checkedKeys)

provide('b', b)
provide('c', c)
provide('d', d)
</script>
