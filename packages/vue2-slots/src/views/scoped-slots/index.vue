<template>
  <div style="border: 1px solid black;">
    <h2>scoped slots</h2>

    <!-- <h3 v-bind:a="1"></h3> -->
    <!-- <h3 :a="1"></h3> -->

    <!-- <h3 v-on:some="1"></h3> -->
    <!-- <h3 @some="1"></h3> -->

    <!-- <template v-slot:default="{ person }"> -->
    <!-- <template #default="{ person }"> -->

    <Child>
      <!-- scope（可以是任何名字）是子组件传过来的所有数据，是一个对象 -->
      <!-- <template #default="scope">
        <div>
          <pre>{{ scope }}</pre>
        </div>
      </template> -->

      <!-- 也可以直接解构其中一个变量 -->
      <template #default="{ person }">
        <div>
          <pre>{{ person }}</pre>
        </div>
      </template>

      <!-- <template #after="{ person }">
        <div>
          <pre>{{ person }}</pre>
        </div>
      </template> -->

      <template #after="{ person }">
        <div>
          <div style="color: red">name: {{ person.name }}</div>
          <div style="color: #ace">age: {{ person.age }}</div>
        </div>
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'scoped-slots',
  components: {
    Child,
  },
  data() {
    return {

    }
  },
}
</script>
