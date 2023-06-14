<template>
  <div id="app">
    <div>
      <h1>透传插槽</h1>
      <PassthroughSlots />
    </div>

    <div>
      <h1>作用域插槽</h1>
      <ScopedSlots />
    </div>
  </div>
</template>

<script>
import PassthroughSlots from './views/passthrough-slots/index.vue'
import ScopedSlots from './views/scoped-slots/index.vue'

export default {
  name: 'App',
  components: {
    PassthroughSlots,
    ScopedSlots,
  },
}
</script>
