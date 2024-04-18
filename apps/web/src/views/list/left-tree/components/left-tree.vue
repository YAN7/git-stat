<template>
  <div class="left-tree">
    <div class="top-left">
      <el-button type="primary" @click="blurBtnWhenClose">按钮1</el-button>
      <el-button type="primary" @click="blurBtnWhenClose">按钮2</el-button>
      <el-button type="primary" @click="blurBtnWhenClose">按钮3</el-button>
    </div>
    <div class="flex items-center justify-center mb-12">
      <el-input v-model="filterText" placeholder="请输入关键字进行搜索" />
      <el-tooltip placement="top" effect="light" :content="isTreeExpand ? '收起' : '展开'">
        <icon-tree-spread
          v-if="isTreeExpand"
          class="cursor-pointer ml-16"
          style="flex: 0 0 16px"
          @click="onToggleTree"
        />
        <icon-tree-fold
          v-else
          class="cursor-pointer ml-16"
          style="flex: 0 0 16px"
          @click="onToggleTree"
        />
      </el-tooltip>
    </div>
    <el-tree
      ref="treeRef"
      highlight-current
      class="tree"
      :props="defaultProps"
      :data="data"
      :check-strictly="true"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="onNodeClick"
    >
      <template #default="{ node }">
        <span class="w-full flex flex-justify-between">
          <span>{{ node.label }}</span>
          <div class="flex items-center">
            <el-tooltip placement="top" content="新增" effect="light">
              <IconAdd class="opt-btn text-primary ml-8" />
            </el-tooltip>
            <el-tooltip placement="top" content="编辑" effect="light">
              <IconEdit class="opt-btn text-primary ml-8" />
            </el-tooltip>
            <el-tooltip placement="top" content="删除" effect="light">
              <IconDel class="opt-btn text-danger ml-8" />
            </el-tooltip>
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import { blurBtnWhenClose } from '@/utils/dom'

interface Tree {
  [key: string]: any
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const isTreeExpand = ref<boolean>(false)

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const onToggleTree = () => {
  isTreeExpand.value = !isTreeExpand.value
  for (let key in treeRef.value?.store.nodesMap) {
    treeRef.value.store.nodesMap[key].expanded = isTreeExpand.value
  }
}

const data: Tree[] = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
]

const onNodeClick = () => {}
</script>

<style scoped lang="less">
.top-left {
  :deep(.feGitStat-button) {
    margin-bottom: 16px;
  }
  :deep(.feGitStat-button:first-of-type) {
    margin-right: 16px;
  }
  :deep(.feGitStat-button + .feGitStat-button) {
    margin-left: 0px !important;
    margin-right: 16px;
  }
  :deep(.feGitStat-button:first-of-type) {
    @apply ml-0;
  }
}
.left-tree {
  padding: 16px 24px;
  background: #ffffff;
  margin-right: 10px;
  box-shadow: 0px 1px 6px 0px rgba(174, 174, 174, 0.28);
  height: 100%;
  border-radius: 5px;
  :deep(.opt-btn) {
    &:last-of-type {
      @apply mr-8;
    }
  }
  .tree {
    max-height: calc(100% - 24px - 24px - 30px);
    overflow: auto;
  }
}
</style>
