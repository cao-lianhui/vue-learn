<script>
import dayjs from 'dayjs'
import SummarizeData from './SummarizeData'

export default {
  name: 'DateForm',
  components: {
    SummarizeData,
  },
  inject: ['validateNode'],
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  methods: {
    genFilterResult() {
      const [start, end] = this.node.$form.data
      return `${dayjs(start).format('YYYY-MM-DD')} ~ ${dayjs(end).format('YYYY-MM-DD')}`
    },
    handleChange() {
      if (this.node.$form.error)
        this.validateNode(this.node)
    },
  },
}
</script>

<template>
  <div class="date-form">
    <div class="date-form__title">
      日期范围
    </div>

    <div class="date-form__content">
      <i-date-picker
        v-model="node.$form.data"
        style="width: 100%"
        type="daterange"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        @on-change="handleChange"
      />

      <SummarizeData
        :field-name="node.title"
        filter-label="日期范围："
        :filter-result="genFilterResult()"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.date-form {
  &__title {
    height: 40px;
    font-size: 20px;
    font-weight: 600;
    color: #1e2540;
    line-height: 40px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
