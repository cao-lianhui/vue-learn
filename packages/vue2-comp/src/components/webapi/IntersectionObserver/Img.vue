<template>
  <div class="hello">
    <div v-for="(item, idx) in imageList" :key="idx">
      <img :data-abc="item" class="img" style="width: 50px" />
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
    }
  },
  computed: {
    counter() {
      return !!this.bool?.length
    },
  },
  watch: {
    counter: {
      handler() {
        if (this.counter === 10)
          this.counter = 0
      },
    },
  },
  mounted() {
    // 1.获取图片标签
    const imgList = [...document.querySelectorAll('.img')]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          // isIntersecting是一个Boolean值，判断目标元素当前是否可见
          if (item.isIntersecting) {
            // item.target === img
            item.target.src = item.target.dataset.abc
            // 图片加载后即停止监听该元素
            observer.unobserve(item.target)
          }
        })
      },
      {
        root: document.querySelector('.root'),
        // root: document.documentElement,
      },
    )

    // observe遍历监听所有img节点
    imgList.forEach(img => observer.observe(img))
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
