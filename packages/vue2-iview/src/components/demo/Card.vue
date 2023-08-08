<script>
export default {
  props: {
    title: {
      type: String,
      default: '示例',
    },
    description: {
      type: String,
      default: '说明',
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-title">
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </div>

    <div class="card-description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #fff;

  .card-title {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
  }

  .card-description {
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  .card-content {
    padding: 10px 20px;
  }
}
</style>
