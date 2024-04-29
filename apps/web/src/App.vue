<template>
  <cs-config-provider
    :locale="zhCn"
    elNamespace="feGitStat"
    namespace="feGitStat-cs"
    size="default"
  >
    <div>
      <Layout />
    </div>
  </cs-config-provider>
</template>

<script lang="ts" setup>
import Layout from '@/layout/index.vue'
import { CsConfigProvider } from 'csui'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
