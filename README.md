## pnpm


### 基本命令


`pnpm` 的大部分命令兼容 `npm/yarn`。

比如，安装依赖时，三者是等价的：

```sh
# npm
npm install koa

# yarn
yarn add koa

# pnpm: 可以使用 install 或 add
pnpm install koa
pnpm add koa
```

启动 `package.json` 的脚本时，也兼容 `npm/yarn` 的写法：
```sh
# npm
npm run dev

# yarn
yarn dev

# pnpm: run 可以使用也可以省略
pnpm run dev
pnpm dev
```



### mono-repo

pnpm 支持直接使用 workspace 构建 mono-repo 项目（一个仓库下同时包含多个子项目），关键概念如下：

1. 创建 `pnpm-workspace.yaml` 指定需要解析的子项目：
```yaml
packages:
  # packages 下的所有目录都分别作为独立子项目
  - 'packages/*'
  # docs 目录作为一个子项目
  - docs
```

2. mono-repo 将整个项目视为一个 workspace，理解为由根目录管理众多子项目


3. 保证根目录、每个子项目都存在 `package.json` 文件，并有独立的 `name` 字段：
```
|- vue-learn\
  |- docs\
    |- package.json        ------ here，子项目
    |- ...
  |- packages\
    |- vue2-slots\
      |- package.json      ------ here，子项目
      |- ...
    |- vue2-router\
      |- package.json      ------ here，子项目
      |- ...
  |- package.json          ------ here，根目录
  |- pnpm-workspace.yaml
  |- ...
```


4. 各个子项目的 `package.json` 的 `name` 可以使用 `@scope/name` 的模式命名加以区分，参考 [vue](https://github.com/vuejs/vue)，`scope` 可以选择项目名字，若觉得太长可以自行控制（非硬性要求，主要是自己能够区分，如本项目使用 `learn` 代替 `vue-learn`）
```json
// 根目录的 package.json，name 对应你的项目
{
  "name": "vue-learn"
}

// docs 的 package.json
{
  "name": "@learn/docs"
}

// vue2-slots 的 package.json
{
  "name": "@learn/vue2-slots"
}

// vue2-router 的 package.json
{
  "name": "@learn/vue2-router"
}
```


5. 在根目录的 `package.json` 中添加快速启动脚本，这里的 `name` 要对应子项目的 `name`
    - 在 mono-repo 项目中执行 `pnpm` 项目时，都会使用根目录的配置
    - `--filter` 表示将命令（如 `serve`）作用于指定子项目（如 `@learn/vue2-slots`）
```json
{
  // ...
  "scripts": {
    "learn:vue2-slots": "pnpm --filter @learn/vue2-slots serve",
    "docs:dev": "pnpm --filter @learn/docs docs:dev",
    "docs:build": "pnpm --filter @learn/docs docs:build",
    "docs:preview": "pnpm --filter @learn/docs docs:preview"
  }
  // ...
}
```


6. 依赖管理：根目录、每个子项目下都存在 `node_modules` 目录，这是由于：
    - 根目录下的 `node_modules` 被所有子项目共享，并可以直接引用
    - 子项目下的 `node_modules` 仅被自身使用
    - TODO：子项目可以被子项目引用（这里暂时未用到，后续补充）
```sh
# 安装到根目录：使用 -w 参数
pnpm add -w lodash-es


# 安装到指定子项目：使用 --filter 指定子项目
# 以下命令将 vitepress-plugin-tabs 安装到子项目 @learn/docs
pnpm --filter @learn/docs add vitepress-plugin-tabs
```




## vitepress


了解更多参考 [官方文档](https://vitepress.dev/)，文件目录简介：
```
|- docs\
  |- .vitepress\         # vitepress 配置目录
    |- cache\            # 本地开发时的缓存目录，不用管
    |- theme\            # 🌈 主题配置，可以定义样式，或者定义自己的布局、主题，参考官方文档
    |- config.ts         # 🚀 核心配置文件，基本上所有东西都在这里配置
  |- index.md            # 文档首页，可以快捷定义一些属性
  |- package.json
  |- demo\               # 文档目录，名字会自动生成路由，这里为 /demo/
    |- vue2\             # 文档目录，名字会自动生成路由，这里为 /demo/vue2/
      |- vue2-slots.md   # 文档路径，当路由跳转到 /demo/vue2/vue2-slots.md 时会渲染这个 md 文件
    |- demo-a.md         # 文档路径，当路由跳转到 /demo/demo-a.md 时会渲染这个 md 文件
  |- hello-world.md      # 文档路径，当路由跳转到 /hello-world.md 时会渲染这个 md 文件
  |- ...                 # 可以根据需要定义任意层级的文件目录
```


备注：如果你熟悉页面的渲染过程，那么对 `index.html` 这个名字的 `.html` 文件会比较敏感，因为访问 `/path/to/index.html` 相当于访问 `/path/to/`，也就是说省略具体的资源路径时浏览器会自动加载 `index.html`（除非服务器进行了其他配置）。

所以，这也是一个约定俗称的东西，很多工具都会将这个概念作为一个标准，如这里，当你访问 `localhost:8080` 时，相当于访问：
  - `localhost:8080/`
  - `localhost:8080/index.md`

这也就说明了，为什么 vitepress 在根目录下创建一个 `index.md` 作为首页的默认渲染内容。

这些概念能加深你对后续的配置文件的编写。


### 配置文件

`config.ts` 下支持很多关于项目的配置，尽量去看官方文档。

不建议记忆这么多东西，所有属性和字段都是约定俗成的，一目了然知道怎么回事就行了，官方文档也会说明白是什么东西。

- `themeConfig.nav`：顶部导航
  - `text`：显示的文本
  - `link`：点击后跳转的路径，没有该字段说明是一个分组
  - `items`：嵌套的分组
```ts
export default defineConfig({
  // ...
  themeConfig: {
    nav: [
      // 简单设置
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo/index.md' },
      { text: '业务功能', link: '/business/index.md' },

      // 设置分组
      {
        text: 'Vue',
        items: [
          { text: 'vue2', link: '/' },
          { text: 'vue3', link: '/' },
        ],
      },

      // 还可以再分组
      {
        text: '前端',
        items: [
          {
            text: 'Vue',
            items: [
              { text: 'vue2', link: '/' },
              { text: 'vue3', link: '/' },
            ]
          },
        ],
      },
    ],
  },
  // ...
})
```

- `themeConfig.sidebar`：页面侧边栏
  - sidebar 的 `key` 是一个路由 path，对应你的文档目录的组成，值是一个数组，表示在这个匹配到的 path 下会显示的 sidebar 列表，也就说是你只有配置好了所有的 sidebar 才会正确显示（当然，你也可以写一个脚本或者插件去自动生成，如果有必要的话）
```ts
export default defineConfig({
  // ...
  themeConfig: {
    sidebar: {
      // 显示列表
      '/business/': [
        { text: 'Vue2 word 转换 html', link: '/business/vue2-word2html.md' },
      ],

      // 分组显示，还可以配置 collapsed 属性显示收起/展开图标
      '/demo/': [
        {
          text: 'Vue2',
          collapsed: true,
          items: [
            { text: 'Vue2 Slots 的使用', link: '/demo/vue/vue2-slots.md' },
          ]
        },
      ],
    },
  },
  // ...
})
```


### 主题

可以定义很多客制化的东西，喜欢折腾或者要好看的效果可以去做，或者用第三方现成的主题。


### 使用组件

可以在 md 文档中引入 Vue 组件，如：
1. 创建 `theme/HelloWorld.vue` 组件：
```vue
<template>
  <div>
    <h1>hello world</h1>
  </div>
</template>
```

2. 在 `theme/index.ts` 中全局注册：
```ts
import HelloWorld from './HelloWorld.vue'

export default {
  // ...
  enhanceApp({ app, router, siteData }) {
    app.component('HelloWorld', HelloWorld)
  },
}
```

3. 在你的文档中使用，如 `demo/index.md`
```md
## 这是标题

这个页面会出现在 `/demo/vue` 路由下面

<HelloWorld />
```


### 更多功能


- 支持插件：支持自定义或使用官方/第三方插件，如本项目配置了 [vitepress-plugins-tabs](https://vitepress-plugins.sapphi.red/tabs/) 插件
- 支持组件库：支持安装 vue3 组件库，用来定义更丰富的界面
- ...
