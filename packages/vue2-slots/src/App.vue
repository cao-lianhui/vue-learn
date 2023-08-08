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

<template>
  <div id="app">
    <div>
      <details>
        <summary>一 插槽基础概念</summary>
        <pre>
          slot(插槽) 是什么？
          插槽是写在子组件里的一个slot标签对 slot标签对只会写在子组件里面 父组件如果要往子组件中插入内容 必须把插入的内容写在子组件标签对中的位置
          slot 有什么作用？
          插槽是子组件中的提供给父组件使用的一个占位符，在子组件中用slot标签对表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的slot标签对中的所有内容。
          简单理解就是子组件中留下个“坑”，父组件可以使用指定内容来填“坑”。
          让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于将子组件中的数据传递给父组件  子组件 ===> 父组件
          slot标签对中的元素是子组件的默认内容
          slot标签对中可以不写元素 子组件的默认内容就是空
          父组件中可以使用template标签对中的内容替换掉子组件中对应名字的slot标签对中的默认内容 如果template标签对中没有内容 就不替换
          slot 有什么概念?
          两个组件间: 子组件中默认内容 默认插槽 具名插槽 作用域插槽
          多个组件间: 插槽透传
          slot 有什么固定语法和指令?
          子组件中: slot标签 slot标签的name属性决定名字 以及 :value语法决定传给父组件的值
          父组件中: template标签或者其他任何一个标签 template标签的指令: slot slot="name" slot-scope="{ row }" v-slot v-slot:name #name  #name="scope" #name="{ value }" #name="{ value1, value2 }"
          slot 的使用场景? 有几种使用场景?
          使用场景: 只能用于有父子关系的2个组件或者有父子关系的连续多个组件中
          有两种场景:
          类型1: 父子关系的2个组件 父template中的内容 会把 子中对应的slot中的内容 替换掉
          类型2: 插槽透传 有嵌套关系的多个组件 一层套一层 比如有3层 最外层组件A 中间层B 最里层C A中template中的内容 会把 C中对应的slot中的内容 替换掉
          slot 的类型?
          slot 又分三类，默认插槽，具名插槽和作用域插槽：
          函数名 default 表示默认插槽，其他为具名插槽，带参数的函数为作用域插槽。
          - 默认插槽：又名匿名插槽，当 slot 没有指定 name 时默认显示插槽，一个组件内只有一个匿名插槽
          - 具名插槽：带有具体名字的插槽，也就是带有 name属性的 slot，一个组件可以出现多个具名插槽
          - 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽
          作用域插槽: 绑定在slot元素上的 attribute 被称为插槽 prop
          slot 元素上的 attribute 如 :person="person" :games="games"都是插槽prop
          插槽prop 的作用:
          1) :person="person" :games="games" 这2个都是子组件传给父组件的值 这些值都放在一个大对象里面 这个对象包含所有的插槽prop
          2) 父组件可以使用template #default="scope"语法拿到子组件中传过来的大对象 并将这个对象命名为scope，也可以使用任意其他名字 scope类似于函数形参
          3) 父组件可以不用子组件传过来的数据 只是替换子组件对应插槽的内容 template #default xxx emplate语法


          使用场景：定义组件的默认内容，提供外部组件调用时定制该组件的渲染内容能力
          其他需要注意的?
          1) slot标签和template都是空标签 在处理的过程中不会渲染成真实的DOM节点 跟div不一样 父组件中最好把v-slot写在template元素上 因为template元素在处理的过程中不会渲染成真实的DOM节点

          slot的原理?
          插槽本质上是一个返回 vnode 节点的函数
      </pre>
      </details>
    </div>
    <h2>二 从使用插槽的几个组件的组件关系来分 有两种组件关系</h2>
    <p>查看方式: 在父组件中需要查看哪一个代码示例的效果 就把父组件中这个代码的注释放开 再把子组件中与父组件中这个代码示例的class名字相同的代码的注释放开 就能调试并查看效果了</p>
    <ScopedSlots/>
    <PassthroughSlots/>
    <div>
      <h2>三 实际开发中使用slot的例子</h2>
      <p>场景说明</p>
      <pre>开发中 什么情况下需要用到插槽?
      1) 需要自定义组件中的数据的显示形式 例如 1 表格插槽自定义列显示效果 2 大文件上传自定义编辑回显的文件显示效果
      2) 在封装的一个通用模板组件中使用
        例如: 如多个组件的布局使用相似模板，只是具体内容不同，那么我们可以使用这种插槽方式封装成一个通用组件，在其他组件使用的时候只需要传对应的内容到对应名字的插槽即可，不需要将该模板在每个组件重新写一遍，减少代码冗余，大大提高开发效率。
      </pre>
      <p>case1 表格插槽自定义列显示效果</p>
      <p>case2 封装的表格分页组件 插槽透传</p>
    </div>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  background: #F6F9FD;
}

p {
  margin: 0
}
</style>
