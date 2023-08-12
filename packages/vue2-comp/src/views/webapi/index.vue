<template>
  <!--  我是标题的预览页面 -->
  <div class="preview">
    <!-- 这是预览图片 -->
    <h1>IntersectionObserver</h1>
    <div class="container">
      <div class="btnWrap" style="margin: 10px 0">
        <span
          v-for="item in testArr"
          :key="item.value"
          :class="activeVal === item.value ? 'active' : ''"
          @click="handleClick(item.value)"
        >
          {{ item.label }}
        </span>
      </div>

      <div
        class="btnModule"
        style="height: 400px; overflow: auto; text-align: center"
      >
        <ImgVue v-if="activeVal === 1" />
        <Scroll v-if="activeVal === 2" />
        <Animation v-if="activeVal === 3" />
        <Sentry v-if="activeVal === 4" />
      </div>
    </div>
  </div>
</template>

<script>
import ImgVue from '../../components/webapi/IntersectionObserver/Img'
import Scroll from '../../components/webapi/IntersectionObserver/Scroll'
import Sentry from '../../components/webapi/IntersectionObserver/Sentry'
import Animation from '../../components/webapi/IntersectionObserver/Animation'

export default {
  components: { ImgVue, Sentry, Scroll, Animation },
  data() {
    return {
      activeVal: 1,
      testArr: [
        {
          label: '图片懒加载',
          value: 1,
        },
        {
          label: '无限滚动',
          value: 2,
        },
        {
          label: '滚动动画',
          value: 3,
        },
        {
          label: '埋点曝光',
          value: 4,
        },
      ],
    }
  },
  methods: {
    handleClick(val) {
      this.activeVal = val
    },
  },
}
</script>

<style lang="scss" scoped>
.preview {
  margin: 50px;
  padding: 50px;
  background-color: #fafafa;
}
.container {
  display: flex;
  width: 1200px;
  margin: 20px auto;
  .btnWrap {
    display: flex;
    flex-direction: column;
    width: 250px;
  }
  .btnModule {
    width: 690px;
    height: 100%;
  }
  .active {
    color: rgb(5, 109, 232);
  }
}
</style>
