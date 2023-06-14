<template>
  <div style="margin: 10px; border: 1px solid black">
    <h2>child</h2>

    <slot name="before">
      <div>before 插槽</div>
    </slot>
    <slot>
      <div>默认内容</div>
    </slot>
    <slot name="after">
      <div>after 插槽</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'child',
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.$scopedSlots, 'child');
  }
}
</script>
