<template>
  <div style="margin: 10px; border: 1px solid black">
    <h2>parent</h2>

    <!-- 插槽透传 -->
    <Child>
      <template v-for="(slot, name) in $scopedSlots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </Child>

    <!-- 等价于 -->
    <!-- <Child>
      <template slot="before">
        <slot name="before"></slot>
      </template>
      <template>
        <slot></slot>
      </template>
      <template slot="after">
        <slot name="after"></slot>
      </template>
    </Child> -->
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'parent',
  components: {
    Child,
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$scopedSlots, 'parent');
  }
}
</script>
