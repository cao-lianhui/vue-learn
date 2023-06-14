<template>
  <div style="margin: 10px; border: 1px solid black;">
    <h2>child</h2>

    <!-- 默认插槽的名字是 default，可以省略 -->
    <slot name="default" :person="person" :a="123" :b="'111'">
      <div>
        <div>名字：{{ person.name }}</div>
        <div>年龄：{{ person.age }}</div>
      </div>
    </slot>

    <slot name="after" :person="person" :a="123" :b="'111'">
      <div>
        <div>名字：{{ person.name }}</div>
        <div>年龄：{{ person.age }}</div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'child',
  data() {
    return {
      person: {
        name: 'zhangsan',
        age: 18,
      }
    }
  },
}
</script>
