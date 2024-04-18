<template>
  <div ref="dragBox" style="display: flex; width: 100%; height: 100%">
    <div ref="dragBoxLeft" class="mr-6 min-w-[200px] w-[23rem] relative">
      <div style="width: 100%; height: 100%">
        <slot name="BoxLeft">默认信息</slot>
      </div>
      <!-- 拖拽条 -->
      <div class="resize" ref="resizeButton">
        <icon-drag style="pointer-events: none" />
      </div>
    </div>
    <div ref="dragBoxRight" style="min-width: 200px; position: relative">
      <div style="width: 100%; height: 100%">
        <slot name="BoxRight">默认信息</slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
import { useCssVar } from '@vueuse/core'
export default {
  name: 'DragWidth',
  mounted() {
    this.setDragItemFlex()
  },
  methods: {
    //  没有定义宽度，则flex=1
    setDragItemFlex() {
      // const dragBoxLeft = this.$refs['dragBoxLeft']
      const dragBoxRight = this.$refs['dragBoxRight']
      if (!dragBoxRight.style.width) {
        dragBoxRight.style.flex = 1
      }
      const resizeButton = this.$refs['resizeButton']
      resizeButton.addEventListener('mousedown', this.onMouseDown, true)
    },
    onMouseDown(e) {
      this.resizeBox = e.target
      this.currentBox = e.target.parentNode // 当前盒子
      this.rightBox = this.getNextElement(this.currentBox) // 当前盒子的下个兄弟节点
      if (!this.rightBox) return
      this.curLen = this.currentBox.clientWidth
      this.otherBoxWidth =
        this.$refs['dragBox'].clientWidth - this.currentBox.clientWidth - this.rightBox.clientWidth // 其他盒子的宽度
      // 颜色改变提醒
      e.target.style.background = '#409EFF'
      this.startX = e.clientX
      document.addEventListener('mousemove', this.onMousemove)
      document.addEventListener('mouseup', this.onMouseup)
    },

    // 获取下一个兄弟元素的兼容函数
    getNextElement(element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling
      } else {
        let next = element.nextSibling // 下一个兄弟节点
        while (next && next.nodeType !== 1) {
          // 有 并且 不是我想要的
          next = next.nextSibling
        }
        return next
      }
    },
    onMousemove(e) {
      const endX = e.clientX
      const moveLen = endX - this.startX // （endx-startx）= 移动的距离
      const CurBoxLen = this.curLen + moveLen // resizeButton.left+移动的距离=左边区域最后的宽度
      const rightBoxLen = this.$refs['dragBox'].clientWidth - CurBoxLen - this.otherBoxWidth // 右侧宽度=总宽度-左侧宽度-其它盒子宽度
      // 当最小宽度时，无法继续拖动
      if (CurBoxLen <= 200 || rightBoxLen <= 200) return
      this.currentBox.style.width = CurBoxLen + 'px' // 当前盒子的宽度
      e.target.style.left = CurBoxLen // 设置左侧区域的宽度
      this.rightBox.style.width = rightBoxLen + 'px'
    },
    onMouseup() {
      // 颜色恢复
      const bgColor = useCssVar('--bg-color')
      this.resizeBox.style.background = bgColor.value
      document.removeEventListener('mousedown', this.onMouseDown)
      document.removeEventListener('mousemove', this.onMousemove)
    },
  },
}
</script>

<style lang="less" scoped>
.resize {
  position: absolute;
  top: 0;
  right: -2px;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}
</style>
