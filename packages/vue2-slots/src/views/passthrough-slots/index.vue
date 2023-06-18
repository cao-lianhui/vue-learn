<template>
  <div>
    <h3>使用类型二 三个组件 scoped slots</h3>
    <h4>case3: 插槽透传 3个组件 最外层组件A 中间层B 最里层C 透传效果: A中template中的内容 会透过B把 C中对应的slot中的内容 替换掉</h4>
    <p>case3-1: 组件C中定义了多个slot 组件B中循环多个slot 组件A中传递多个slot给子组件B</p>
    <p>效果: </p>
    <pre>说明: $scopedSlots用来访问作用域插槽。对于包括默认slot在内的每一个插槽</pre>
    <div class="case3">
      组件A
      <Parent>
        <template slot="before">
          <div style="color: blue">组件A中before slot</div>
        </template>
        <template>
          <div style="color: red">组件A中default slot</div>
        </template>
        <template #after>
          <div style="color: #0a8572">组件A中after slot</div>
        </template>
      </Parent>
    </div>
  </div>
</template>

<script>
import Parent from './Parent.vue'

export default {
  name: 'passthrough-slots',
  components: {
    Parent,
  },
}
</script>

<style scoped>
.case3 {
  border: 1px solid black
}
</style>
