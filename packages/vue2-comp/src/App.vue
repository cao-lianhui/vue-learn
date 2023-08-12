<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">
        基础元件
      </router-link> |
      <router-link to="/modal">
        常用组件
      </router-link> |
      <router-link to="/base">
        html css基础
      </router-link>
      <router-link to="/webapi">
        webapi
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 50px 100px;
  p {
    line-height: 30px;
    + button {
      //margin-top: 5px;
    }
  }
  .common-title {
    height: 35px;
    font-weight: 500;
    color: #232b40;
    line-height: 35px;
    font-size: 18px;
    margin-top: 30px;
    // 设置后面的第一个兄弟元素是p的line-height是50px
    + p {
      line-height: 50px;
    }
  }
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/** 我想写一个方法 让写class="mt-n" 自动渲染为mt: npx
怎么写?
*/
.mt-10 {
  margin-top: 10px;
}
</style>
