<!--
问题:
1) 是写在vue里面还是写到md文档里?
vue里面不行 不好控制标题正确的大小和缩进 样式不行 而且代码很丑
写在md文档里 要写代码吗?
要写代码 代码很长怎么办 折叠
有父子组件怎么办 tab栏切换 tab栏切换写到折叠块里面 需要安装vuepress插件 没安装成功 语法为:

md文档中
页面上文字显示缩进效果怎么做? 不同的文字 缩进效果不一样 pre中可以 但是 pre中放div就不行

如何不解析template标签 把template标签作为字符串显示在页面
md文档中用``可以

2) md文档
1 在哪写 哪个文件中写
2 怎么预览md文档的效果 修改实时看
运行docs项目
3 怎么启动md文档的项目
用pnpm命令

怎么安装包 在目录下 安装命令
用pnpm命令 安装部分依赖 elementUI dayjs

-->

<script>
import Child from './Child.vue'

export default {
  name: 'ScopedSlots',
  components: {
    Child,
  },
  data() {
    return {

    }
  },
}
</script>

<template>
  <div>
    <pre>
      简写:
        父组件提供内容 = 父组件中使用子组件 给子组件中的插槽提供内容
        父组件没有提供内容 = 父组件中使用子组件 没有给子组件中的插槽提供内容
        替换内容 = 替换掉子组件中对应名字的插槽的内容
        子组件有默认内容 = 子组件中一个插槽设置了默认内容
    </pre>
    <h3>使用类型一 两个组件</h3>
    <h4>case1 如果子组件中没有写插槽或者没有对应名字的插槽 那父组件就没法替换子组件中的内容</h4>

    <p>case1-1 子组件中没有插槽 父组件不提供内容</p>
    <p>结果: 显示子组件的内容</p>
    <!--    <Child class="case1-1"></Child> -->

    <p>case1-2  子组件中没有插槽 父组件提供内容</p>
    <p>结果: 显示子组件的内容</p>
    <!--    <Child class="case1-2">我是父组件提供的内容</Child> -->

    <p>case1-3  子组件中没有name是footer的插槽 父组件中使用子组件 给子组件中name是footer的插槽提供了内容</p>
    <p>结果: 显示子组件的内容</p>
    <!--    <Child class="case1-3"> -->
    <!--      <template #footer> -->
    <!--        我是父组件提供的内容 -->
    <!--      </template> -->
    <!--    </Child> -->

    <h4>case2 如果子组件中写了插槽 并且 有对应名字的插槽 那父组件可以提供内容 就会替换内容; 也可以不提供内容 就不会替换内容</h4>
    <p>case2-1 默认内容</p>
    <pre>
    说明: 默认内容就是子组件中slot标签对中的内容 如果没有写 那默认内容就是空
    在子组件中一个插槽的默认内容只会在父组件没有提供内容的时候被渲染
    </pre>
    <p>case2-1-1 子组件有默认内容 父组件不提供内容</p>
    <p>结果: 子组件的插槽部分显示子组件默认内容</p>
    <!--    <div class="box case2-1"> -->
    <!--      <p>我是父组件</p> -->
    <!--      <Child></Child> -->
    <!--    </div> -->
    <p>case2-1-2 子组件有默认内容 父组件提供内容</p>
    <p>结果: 子组件中的插槽部分显示父组件提供的内容</p>
    <p>说明: 父组件提供内容有多种写法 效果都是替换内容 下面的几种写法 子组件中都是默认插槽:</p>
    <div class="box case2-1-2">
      <!--      <p>我是父组件</p> -->
      <pre>写法1: 在子组件标签对中 不写template标签 直接写内容 说明: 如果不写template并指定插槽名 直接写内容 会替换掉子组件中默认插槽的内容</pre>
      <!--      <Child>我是父组件提供的内容</Child> -->
      <pre>写法2(推荐): 在template标签对中写内容</pre>
      <!--      <Child> -->
      <!--        <template>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法3: 在template标签对中写内容 在template标签上加上v-slot指令 说明: v-slot 等价于v-slot:default 表示替换掉子组件中默认插槽的内容</pre>
      <!--      <Child> -->
      <!--        <template v-slot>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法4: 在template标签对中写内容 在template标签上加上v-slot:default指令</pre>
      <!--      <Child> -->
      <!--        <template v-slot:default>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法5: 在template标签对中写内容 在template标签上加上#default指令 说明: #是v-slot:指令的简写</pre>
      <!--      <Child> -->
      <!--        <template #default>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法6(废弃 未移除 可用 不推荐): 在template标签对中写内容 在template标签上加上slot指令 说明: slot 等价于 slot="default" 表示替换掉子组件中默认插槽的内容</pre>
      <pre>说明: slot-scope和slot都是废弃语法 虽然没有移除 使用有效果也不报错 但是最好不要使用废弃语法 使用官方推荐的v-slot指令</pre>
      <!--      <Child> -->
      <!--        <template slot>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法7(废弃 未移除 可用 不推荐): 在template标签对中写内容 在template标签上加上slot="default"指令</pre>
      <!--      <Child> -->
      <!--        <template slot="default">我是父组件提供的内容</template> -->
      <!--      </Child> -->
    </div>
    <p>case2-2 name属性 => 默认插槽 具名插槽</p>
    <pre>
      说明: 子组件的插槽slot有name属性
        如果在slot标签中没有写name属性 那么这个slot就是默认插槽 name属性值就是默认的default
        如果在slot标签中有写name属性 并且name属性的值不等于default 那么这个slot就是具名插槽
        上面已经讲完了默认插槽 这里就只讲具名插槽
        项目中具名插槽比较常用，可以在一个通用模板组件中使用。如多个组件的布局使用相似模板，只是具体内容不同，那么我们可以使用这种插槽方式封装成一个通用组件，在其他组件使用的时候只需要传对应的内容到对应名字的插槽即可，不需要将该模板在每个组件重新写一遍，减少代码冗余，大大提高开发效率。
    </pre>
    <p>case2-2 子组件具名插槽 父组件提供内容</p>
    <p>结果: 子组件中的插槽部分显示父组件提供的内容</p>
    <div class="box case2-2">
      <pre>写法1(推荐) 在template标签对中写内容 在template标签上加上#main指令 说明: #是v-slot:指令的简写 #name表示替换掉子组件中这个name的slot标签对中的内容</pre>
      <!--      <p>我是父组件</p> -->
      <!--      <Child> -->
      <!--        <template #main>我是父组件提供的内容</template> -->
      <!--      </Child> -->
      <pre>写法2 在template标签对中写内容 在template标签上加上v-slot:main指令</pre>
      <pre>写法3(废弃 未移除 可用 不推荐) 在template标签对中写内容 在template标签上加上slot="main"指令</pre>
    </div>
    <p>case2-3 作用域插槽 => 子组件通过slot给父组件传值</p>
    <pre>
      说明: scope用于父组件往子组件插槽放的html结构接收子组件的数据
      理解：数据在子组件自身，但根据数据生成的结构由组件的使用者来决定。（obj数据在子组件B中，但使用数据所遍历出来的结构由父组件A决定）
      绑定在 slot 元素上的 attribute 被称为插槽 prop 现在在父级作用域中，我们可以使用带值的 #name 来定义我们提供的插槽 prop 的名字
    </pre>

    <p>case2-3-1 默认插槽 传一个值 父组件不接收数据 只提供内容替换内容</p>
    <!--    <div class="box case2-3-1"> -->
    <!--      <p>我是父组件</p> -->
    <!--      <Child> -->
    <!--        <template>我是父组件提供的内容</template> -->
    <!--      </Child> -->
    <!--    </div> -->

    <p>case2-3-2 默认插槽 传一个值 父组件接收一个对象并渲染 提供内容替换内容</p>
    <div class="box case2-3-2">
      <pre>写法1: 不写template标签对 直接在子组件标签上加上#default="scope"</pre>
      <pre>说明: default表示给子组件中的默认slot传值 scope是子组件传过来的所有数据，是一个对象 类似于形参 可以是任何名字</pre>
      <!--      <Child #default="scope"> -->
      <!--        <div>scoped的值: <pre>{{scope}}</pre> </div> -->
      <!--        <p>name: {{scope.person.name}}</p> -->
      <!--        <p>age: {{scope.person.age}}</p> -->
      <!--      </Child> -->
      <pre>写法2(推荐): 在template标签对中写内容 在template标签上加上#default="scope"指令</pre>
      <!--      <Child> -->
      <!--        <template #default="scope"> -->
      <!--          <div>scoped的值: <pre>{{scope}}</pre> </div> -->
      <!--          <p>name: {{scope.person.name}}</p> -->
      <!--          <p>age: {{scope.person.age}}</p> -->
      <!--        </template> -->
      <!--      </Child> -->
      <pre>写法3(废弃 未移除 可用 不推荐): 在template标签对中写内容 在template标签上加上slot-scope="scope"指令</pre>
      <!--      <Child> -->
      <!--        <template slot-scope="scope"> -->
      <!--          <div>scoped的值: <pre>{{scope}}</pre> </div> -->
      <!--          <p>name: {{scope.person.name}}</p> -->
      <!--          <p>age: {{scope.person.age}}</p> -->
      <!--        </template> -->
      <!--      </Child> -->
    </div>

    <p>case2-3-3 默认插槽 传多个值 父组件接收一个对象并渲染 提供内容替换内容</p>
    <div class="box case2-3-3">
      <pre>写法1: 不写template标签对 直接在子组件标签上加上#default="scope"</pre>
      <!--      <p>我是父组件</p> -->
      <!--      <Child #default="scope"> -->
      <!--        <div>scoped的值: <pre>{{scope}}</pre> </div> -->
      <!--        <p>{{scope.person.age}}岁的{{scope.person.name}}喜欢玩{{scope.games[0]}}</p> -->
      <!--      </Child> -->
      <pre>写法2(推荐): 在template标签对中写内容 在template标签上加上#default="scope"指令 同上</pre>
      <pre>写法3(废弃 未移除 可用 不推荐): 在template标签对中写内容 在template标签上加上slot-scope="scope"指令 同上</pre>
    </div>
    <p>case2-3-4 默认插槽 传多个值 父组件接收到一个对象并解构 渲染数据 提供内容替换内容</p>
    <div class="box case2-3-4">
      <pre>写法1: 不写template标签对 直接在子组件标签上加上#default="scope"</pre>
      <!--      <p>我是父组件</p> -->
      <!--      <Child #default="{ person, games }"> -->
      <!--        <p>{{ person.age }}岁的{{ person.name }}喜欢玩{{ games[0] }}</p> -->
      <!--      </Child> -->
      <pre>写法2: 在template标签对中写内容 在template标签上加上#default="scope"指令 同上</pre>
      <pre>写法3: 在template标签对中写内容 在template标签上加上slot-scope="scope"指令 同上</pre>
    </div>
    <p>case2-3-5 具名插槽 传多个值 父组件接收到一个对象并解构 渲染数据 提供内容替换内容</p>
    <div class="box case2-3-5">
      <pre>写法1: 不写template标签对 直接在子组件标签上加上#default="scope"</pre>
      <!--      <p>我是父组件</p> -->
      <!--      <Child #student="{ person, games }"> -->
      <!--        <p>{{ person.age }}岁的{{ person.name }}喜欢玩{{ games[0] }}</p> -->
      <!--      </Child> -->
      <pre>写法2: 在template标签对中写内容 在template标签上加上#default="scope"指令 同上</pre>
      <pre>写法3: 在template标签对中写内容 在template标签上加上slot-scope="scope"指令 同上</pre>
    </div>
  </div>
</template>

<style scoped>
.box {
  margin: 5px;
  border: 1px solid black;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(212,223,237,0.5);
}
</style>
