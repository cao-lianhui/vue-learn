<script>
import VirtualSelect from '@/components/select/demo/index.vue'
import RemoteSearchSelect from '@/components/select/demo/remote-search.vue'

export default {
  components: {
    VirtualSelect,
    RemoteSearchSelect,
  },
}
</script>

<template>
  <div style="width: 300px">
    <h1>Demo</h1>
    <h2>Select</h2>

    <VirtualSelect />

    <RemoteSearchSelect />
  </div>
</template>
