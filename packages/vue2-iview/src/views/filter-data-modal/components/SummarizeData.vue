<script>
export default {
  name: 'SummarizeData',
  props: {
    title: {
      type: String,
      default: '筛选汇总',
    },
    fieldLabel: {
      type: String,
      default: '所选字段：',
    },
    fieldName: {
      type: String,
      required: true,
    },
    filterLabel: {
      type: String,
      required: true,
    },
    filterResult: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="summarize">
    <div class="summarize-title">
      {{ title }}
    </div>
    <div class="summarize-field">
      <span class="summarize-field__left">{{ fieldLabel }}</span>
      <span class="summarize-field__right">{{ fieldName }}</span>
    </div>
    <div class="summarize-field">
      <span class="summarize-field__left">{{ filterLabel }}</span>
      <span class="summarize-field__right">{{ filterResult }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.summarize {
  margin: 20px 0;
  padding: 20px;
  color: #444;
  border-radius: 4px;
  background: #fafafa;
  &-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
  }
  &-field {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    &__left {
      font-weight: 400;
    }
    &__right {
      font-weight: 500;
    }
  }
}
</style>
