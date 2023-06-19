<script>
import Child from './Child.vue'

export default {
  name: 'Parent',
  components: {
    Child,
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$slots, 'parent')
  },
}
</script>

<template>
  <div style="margin: 10px; border: 1px solid black">
    <div>组件B</div>

    <!-- 插槽透传 -->
    <Child>
      <template v-for="(slot, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </Child>

    <!-- 等价于 -->
    <!--
    <Child>
      <template slot="before">
        <slot name="before"></slot>
      </template>
      <template>
        <slot></slot>
      </template>
      <template slot="after">
        <slot name="after"></slot>
      </template>
    </Child>
    -->
  </div>
</template>
