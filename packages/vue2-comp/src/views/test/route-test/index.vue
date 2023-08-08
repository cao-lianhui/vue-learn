<template>
  <!--  我是标题的预览页面 -->
  <div class="preview">
    <!-- 这是预览图片 -->
    <div>我是预览页面</div>
    <p>id: {{ id }}</p>
    <p>title: {{ title }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.id || ''
    },
    title() {
      return this.$route.query.title || ''
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
</style>
