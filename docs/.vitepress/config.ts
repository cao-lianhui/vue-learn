import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 项目基地址
  base: '/vue-learn/',

  // 页面顶部标题
  title: "Frontend Learning",

  // 首页描述，这个会被 index.md 覆盖
  description: "首页描述首页描述首页描述首页描述",

  // 主题配置：一般是导航栏、侧边栏、社交链接等
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 顶部导航
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo/index.md' },
      { text: '业务功能', link: '/business/index.md' },
    ],

    // 侧边栏，可以嵌套，参考文档
    sidebar: {
      '/demo/': [
        {
          text: 'Vue2',
          items: [
            { text: 'Vue2 Slots 的使用', link: '/demo/vue/vue2-slots.md' },
          ]
        },
      ],

      '/business/': [
        { text: 'Vue2 word 转换 html', link: '/business/vue2-word2html.md' },
      ],
    },

    // 导航栏的的社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KILL4M/vue-learn' }
    ]
  }
})
