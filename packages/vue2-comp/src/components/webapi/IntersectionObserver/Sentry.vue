<template>
  <div class="hello">
    <div v-for="(item, idx) in imageList" :key="idx" class="box">
      {{ idx + 1 }}
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
  mounted() {
    const boxList = [...document.querySelectorAll('.box')]

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((item, idx) => {
          // intersectionRatio === 1说明该元素完全暴露出来，符合业务需求
          //   console.log("intersectionRatio", {
          //     intersectionRatio: item.intersectionRatio,
          //   });
          if (item.isIntersecting) {
            // 。。。 埋点曝光代码
            // 做你自己想做的事
            // 接口请求，记录用户浏览到这里
            // requestApi({ id: item });

            item.target.innerHTML = `埋点曝光了${idx + 1}`

            io.unobserve(item.target)
          }
        })
      },
      {
        root: null,
        // threshold: 1, // 阀值设为1，当只有比例达到1时才触发回调函数
      },
    )

    // observe遍历监听所有box节点
    boxList.forEach(box => io.observe(box))
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
