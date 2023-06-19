<script>
export default {
  name: 'Child',
  data() {
    return {
      person: {
        name: '李华',
        age: 18,
      },
      games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
    }
  },
}
</script>

<template>
  <div style="margin: 5px; border: 1px solid black;">
    <div class="case1-1 case1-2">
      <p>我是子组件 我没有插槽</p>
    </div>

    <!--    <div class="case1-3"> -->
    <!--      <p>子组件非插槽内容</p> -->
    <!--      <slot>子组件默认插槽的内容</slot> -->
    <!--    </div> -->

    <!--    <div class="case2-1"> -->
    <!--      <p>我是子组件中的非插槽内容</p> -->
    <!--      <slot>我是子组件中插槽部分的默认内容</slot> -->
    <!--    </div> -->
    <!--    <div class="case2-2"> -->
    <!--      <p>我是子组件中的非插槽内容</p> -->
    <!--      <slot name="main">我是子组件中name插槽的默认内容</slot> -->
    <!--    </div> -->

    <!--    <div class="case2-3-1 case2-3-2"> -->
    <!--      <p>我是子组件中的非插槽内容</p> -->
    <!--      <slot :person="person"></slot> -->
    <!--    </div> -->

    <!--    <div class="case2-3-3 case2-3-4"> -->
    <!--      <p>我是子组件中的非插槽内容</p> -->
    <!--      <slot :person="person" :games="games"></slot> -->
    <!--    </div> -->

    <!--    <div class="case2-3-5"> -->
    <!--      <p>我是子组件中的非插槽内容</p> -->
    <!--      <slot name="student" :person="person" :games="games"></slot> -->
    <!--    </div> -->
  </div>
</template>
