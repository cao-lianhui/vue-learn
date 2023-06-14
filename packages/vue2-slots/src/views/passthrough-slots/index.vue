<template>
  <div style="border: 1px solid rgb(153, 162, 171);">
    <h2>scoped slots</h2>

    <Parent>
      <template slot="before">
        <div style="color: blue">before slot</div>
      </template>

      <template>
        <div style="color: red">修改默认内容</div>
      </template>

      <template slot="after">
        <div style="color: #0a8572">after slot</div>
      </template>
    </Parent>
  </div>
</template>

<script>
import Parent from './Parent.vue'

export default {
  name: 'passthrough-slots',
  components: {
    Parent,
  },
  data() {
    return {

    }
  },
}
</script>
