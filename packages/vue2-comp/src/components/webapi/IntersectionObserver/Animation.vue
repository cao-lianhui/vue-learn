<template>
  <div class="hello">
    <div id="wrap">
      <img
        src="https://pic1.zhimg.com/v2-d58ce10bf4e01f5086c604a9cfed29f3_r.jpg?source=1940ef5c"
        class="imgWrap"
      />
    </div>
    <div id="loadMore">
      加载中...
    </div>
  </div>
</template>

<script>
import { imgArr } from './helper'

export default {
  name: 'HomeVue',
  props: {
    msg: String,
    bool: Array,
  },
  data() {
    return {
      imageList: imgArr,
      count: 0,
    }
  },
  mounted() {
    //   const imgList = [...document.querySelectorAll(".box")];
    const container = document.querySelector('#wrap')
    const loadMore = document.querySelector('#loadMore')
    const loadItems = (count) => {
      [...Array(count).keys()].forEach(() => {
        const p = document.createElement('img')
        p.src
          = 'https://pic1.zhimg.com/v2-d58ce10bf4e01f5086c604a9cfed29f3_r.jpg?source=1940ef5c'
        container.appendChild(p)
      })

      this.count += count
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting)
          loadItems(2)
      })
    })

    observer.observe(loadMore)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@keyframes imgAni {
  0% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(0.3);
  }
  50% {
    transform: scale(1);
  }
}
#wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#wrap img {
  display: block;
  width: 400px;
  animation: imgAni 3s linear 1;
}
</style>
