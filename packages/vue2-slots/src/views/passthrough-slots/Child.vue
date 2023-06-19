<script>
export default {
  name: 'Child',
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$slots, 'child')
  },
}
</script>

<template>
  <div style="margin: 10px; border: 1px solid black">
    <div>组件C</div>

    <slot name="before">
      <div>子组件中before插槽</div>
    </slot>
    <slot>
      <div>子组件中默认插槽</div>
    </slot>
    <slot name="after">
      <div>子组件中after插槽</div>
    </slot>
  </div>
</template>
