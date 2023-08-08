<template>
  <div class="about">
    <div>轮播图自定义列表</div>
    <Carousel :list="list" autoplay>
      <template #default="{ item }">
        <img :src="item.content" class="carousel-img" />
      </template>
    </Carousel>

    <div class="parent">
      <div class="child"></div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/common/Carousel.vue'

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      list: [
        { id: 1, title: '111', content: 'https://img2.baidu.com/it/u=823515100,3889162028&fm=253&fmt=auto&app=120&f=JPEG?w=741&h=1112' },
        { id: 3, title: '333', content: 'https://img2.baidu.com/it/u=3329909248,3799019568&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
      ],
    }
  },
}
</script>

<style lang="scss">
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.parent {
  width: 500px;
  // 1 height的百分比是相对于父元素的固定高度计算的
  // 父元素的高度如果是写死的固定的比如 height: 100px 那么子元素的百分比的height才能计算出正确的值
  // 父元素的高度如果没有写 是由内容撑开的 那么子元素的百分比的height的值就是0
  // 为什么呢 因为父元素的高度本来就是由内容撑开的 子元素又要根据父元素的高度来计算百分比 就矛盾了 所以值是0

  // 要做一个宽高比固定的盒子 比如宽:高= 10:6 有两种方式:
  // 1 父元素固定宽高 已知 子元素通过百分比设置比例 盒子就是子元素
  // 比如父元素是 100px * 100px 子元素可以是100%(宽 块级元素默认就是100%) * 60%(高)
  // 2 父元素高度由子元素撑开 宽度固定并且已知 子元素设置高度为0 用padding-bottom相对于父元素的content宽度设置比例
  // 比如 子元素的宽度为100% 高度为0 padding-bottom是60%
  // content 有两种情况 当父元素的 box-sizing 值是 border-box 时 content 宽度 = paddingx2 + width

  /**
  父元素这个盒子的width 就是 盒子在页面上 占据的宽高 由3部分组成的 不管box-sizing的值是什么
  默认是 content-box

  盒子的宽度 = 在页面上占据的空间 = padding + border + content-width 不管box-sizing的值是什么 都是一样

  盒子之间的距离 = margin

  父元素的 box-sizing 值是 border-box时
  父元素的 width 属性的值 = 盒子的宽度 = padding  + border + content-width
  子元素的 padding 使用百分比的时候是相对于 父元素的 content-width 来计算的

  父元素的 box-sizing 值不是 border-box时 比如content-box时
  父元素的 width 属性的值 = content-width
  子元素的 padding 使用百分比的时候是相对于 父元素的 content-width = width 来计算的

   */

  // 知识点:
  // 所有的padding和 margin就是相对于父元素的content宽度来计算的(全部都是宽度 不是高度)

  height: 100%;
  padding: 50px;
  margin: 50px;
  border: 50px solid #535bf2;
  background-color: #42b983;
  box-sizing: content-box;
  .child {
    height: 0;
    padding-bottom: 10%;
    background-color: #2c3e50;
    box-sizing: border-box;
  }
}
</style>
