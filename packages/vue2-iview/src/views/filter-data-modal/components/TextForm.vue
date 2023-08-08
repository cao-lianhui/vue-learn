<script>
import SummarizeData from './SummarizeData'

export default {
  name: 'TextForm',
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
  data() {
    return {
      options: [
        { label: '大于', value: '1' },
        { label: '大于等于', value: '2' },
        { label: '等于', value: '3' },
        { label: '不等于', value: '4' },
        { label: '等于空', value: '5' },
        { label: '不等于空', value: '6' },
        { label: '小于', value: '7' },
        { label: '小于等于', value: '8' },
      ],
    }
  },
  methods: {
    genFilterResult() {
      return this.node.$form.data.join(' ')
    },
    handleCreate(val) {
      this.node.$form.data.push(val)
    },
    handleChange() {
      if (this.node.$form.error)
        this.validateNode(this.node)
    },
  },
}
</script>

<template>
  <div class="text-form">
    <div class="text-form__title">
      列表筛选
    </div>

    <div class="text-form__content">
      <div>
        <i-select
          v-model="node.$form.data"
          filterable
          allow-create
          multiple
          @on-create="handleCreate"
          @on-change="handleChange"
        >
          <i-option v-for="item in options" :key="item.value" :value="item.value">
            {{ item.label }}
          </i-option>
        </i-select>
        <span class="info">输入内容后回车，可以输入多个</span>
      </div>

      <SummarizeData
        :field-name="node.title"
        filter-label="数据筛选："
        :filter-result="genFilterResult()"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.text-form {
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

    .info {
      font-size: 12px;
      font-weight: 400;
      color: #878787;
    }
  }
}
</style>
