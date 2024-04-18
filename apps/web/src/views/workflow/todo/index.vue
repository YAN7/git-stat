<template>
  <div class="workflow-container">
    <div class="base-info">
      <div
        class="mb-24 inline-block"
        :class="[isSmallScreen ? 'w-[100%]' : 'w-[50%]']"
        style="line-height: 1"
        v-for="base in baseInfo"
        :key="base.label"
      >
        <span class="label">{{ base.label }}</span>
        <span class="value">{{ base.value }}</span>
      </div>
      <div class="mb-24 flex w-[100%]">
        <span class="label">附件</span>
        <div class="value">
          <div class="flex items-center cursor-pointer mb-16">
            <icon-word />
            <p class="ml-8 hover:text-primary">这是一个附件.word</p>
          </div>
          <div class="flex items-center cursor-pointer mb-16">
            <icon-word />
            <p class="ml-8 hover:text-primary">这是一个附件.word</p>
          </div>
          <div class="flex items-center cursor-pointer mb-16">
            <icon-word />
            <p class="ml-8 hover:text-primary">这是一个附件.word</p>
          </div>
        </div>
      </div>
    </div>
    <div class="approve-info">
      <el-tabs :model-value="1">
        <el-tab-pane :name="1" label="审批信息">
          <finance-divider title="申请信息" class="mb-16" />
          <div
            class="flex items-center mb-24"
            style="flex: 0 0 50%"
            v-for="base in applyInfo"
            :key="base.label"
          >
            <span class="base-label pl-8 !text-right">{{ base.label }}</span>
            <span class="value">{{ base.value }}</span>
          </div>
          <finance-divider title="申请意见" class="mb-16" />
          <el-input type="textarea" :rows="4" placeholder="请输入意见" v-model="opinion" />
          <div class="mt-24">
            <el-button @click="blurBtnWhenClose" type="primary">同意</el-button>
            <el-button @click="blurBtnWhenClose" type="primary">重新提交</el-button>
            <el-button @click="blurBtnWhenClose" type="default" plain>拒绝</el-button>
            <el-button @click="blurBtnWhenClose" type="default" plain>撤回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2" label="审批流程">
          <el-timeline class="!ml-2">
            <el-timeline-item
              v-for="(activity, index) in activities"
              size="large"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :hollow="activity.hollow"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import IconRejectNode from '@/components/icons/IconRejectNode.vue'
import IconStarNode from '@/components/icons/IconStartNode.vue'
import IconSuccessNode from '@/components/icons/IconSuccessNode.vue'
import IconPendingNode from '@/components/icons/IconPendingNode.vue'
import IconInvalidNode from '@/components/icons/IconInvalidNode.vue'

import { watch } from 'vue'
import { computed } from 'vue'
import { blurBtnWhenClose } from '@/utils/dom'

const { width: screenWidth } = useWindowSize()

watch(
  () => screenWidth.value,
  () => {
    console.log('screenWidth', screenWidth.value)
  },
)

const isSmallScreen = computed(() => screenWidth.value <= 1281)

const opinion = ref('')

const baseInfo = [
  { label: '核算期间', value: '2022040100001' },
  { label: '收入方', value: '财务团队' },
  { label: '使用单位', value: '网络收益团队' },
  { label: '单价', value: '￥123231' },
  { label: '支出方', value: '网络收益团队' },
  { label: '质量率', value: '100%' },
  { label: '使用单位', value: '网络收益团队' },
  { label: '核算期间', value: '2022040100001' },
  { label: '收入方', value: '财务团队' },
  { label: '使用单位', value: '网络收益团队' },
  { label: '单价', value: '￥123231' },
  { label: '支出方', value: '网络收益团队' },
  { label: '质量率', value: '100%' },
  { label: '使用单位', value: '网络收益团队' },
  { label: '核算期间', value: '2022040100001' },
  { label: '收入方', value: '财务团队' },
  { label: '使用单位', value: '网络收益团队' },
  { label: '单价', value: '￥123231' },
  { label: '支出方', value: '网络收益团队' },
  { label: '质量率', value: '100%' },
  { label: '使用单位', value: '网络收益团队' },
]

const applyInfo = [
  { label: '审批属性', value: '财务团队账单审批' },
  { label: '   申请人', value: '张三' },
  { label: '申请时间', value: '2023-05-23 10:26:19' },
]

const activities: any = [
  {
    content: '蓝色可表示正在进行或其他默认状态',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    icon: IconPendingNode,
  },
  {
    content: '绿色表示已完成或成功状态',
    timestamp: '2018-04-03 20:46',
    icon: IconSuccessNode,
  },
  {
    content: '红色表示告警或错误失败状态',
    timestamp: '2018-04-03 20:46',
    icon: IconRejectNode,
    type: 'danger',
    hollow: true,
  },
  {
    content: '第四条时间线',
    timestamp: '2018-04-03 20:46',
    icon: IconStarNode,
    hollow: true,
  },
  {
    content: '灰色表示未完成或失效状态',
    timestamp: '2018-04-03 20:46',
    icon: IconInvalidNode,
    hollow: true,
  },
]
</script>
<style scoped lang="less">
.workflow-container {
  @apply flex h-full;
  .base-info {
    @apply flex-1  flex-wrap items-start justify-start p-24;
    box-shadow: 0px 1px 6px 0px rgba(174, 174, 174, 0.28);
    border-radius: 6px;
    max-height: 100%;
    overflow: auto;
  }
  .approve-info {
    @apply ml-16;
    padding: 16px 24px;
    flex: 0 0 600px;
    box-shadow: 0px 1px 6px 0px rgba(174, 174, 174, 0.28);
    border-radius: 6px;
    :deep(.feGitStat-icon) {
      font-size: 16px;
    }
    // :deep(.feGitStat-timeline-item__node--normal) {
    //   --feGitStat-timeline-node-size-normal: 16px;
    // }
  }
  .label {
    @apply inline-block  text-right !w-[100px] mr-16  text-[#333] text-[14px];
    white-space: pre;
    line-height: 1;
  }
  .base-label {
    @apply inline-block  text-right mr-16  text-[#333] text-[14px];
    white-space: pre;
    flex: 0 0 70px;
  }
  .value {
    @apply flex-1 text-[#666] text-[14px];
    line-height: 1;
  }
  :deep(.feGitStat-tabs__item:nth-child(2)) {
    padding-left: 0 !important;
  }
  :deep(.feGitStat-tabs__nav-wrap::after) {
    left: 0 !important;
    right: 0;
  }
  :deep(.feGitStat-tabs__content) {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 24px;
  }
  :deep(.feGitStat-timeline-item__wrapper) {
    top: 0px;
  }
}
</style>
