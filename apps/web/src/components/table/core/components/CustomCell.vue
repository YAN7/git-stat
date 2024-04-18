<template>
  <custom-cell />
</template>
<script setup lang="ts">
defineOptions({
  name: 'CustomCell',
})

const props = defineProps<{
  render?: any
  row?: any
  index?: any
}>()

const CustomCell = () => props.render(props.row, props.index)
</script>
<style scoped lang="less"></style>
