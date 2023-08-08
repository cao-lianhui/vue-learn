<script>
import SummarizeData from './SummarizeData'

export default {
  name: 'NumberForm',
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
      const { items, condition } = this.node.$form.data
      return items.map(v => v.value).join(condition === 1 ? ' 且 ' : ' 或 ')
    },
    handleCreate() {
      this.node.$form.data.items.push({ type: '', value: '' })
    },
    handleDelete(i) {
      this.node.$form.data.items.splice(i, 1)
      if (this.node.$form.error)
        this.validateNode(this.node)
    },
    handleChange() {
      if (this.node.$form.error)
        this.validateNode(this.node)
    },
    handleInput(e, formItem) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      formItem.value = e.target.value
      if (this.node.$form.error)
        this.validateNode(this.node)
    },
  },
}
</script>

<template>
  <div class="number-form">
    <div class="number-form__title">
      数据筛选
    </div>

    <div class="number-form__content">
      <i-select v-model="node.$form.data.condition" style="width: 200px; margin-bottom: 20px">
        <i-option :value="1">
          包含以下所有条件
        </i-option>
        <i-option :value="2">
          包含以下任一条件
        </i-option>
      </i-select>

      <i-row
        v-for="(formItem, i) in node.$form.data.items"
        :key="i"
        :gutter="10"
        style="margin-bottom: 10px"
      >
        <i-col :span="formItem.type === '4' || formItem.type === '5' ? 20 : 10">
          <i-select v-model="formItem.type" placeholder="请选择" @on-change="handleChange">
            <i-option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </i-option>
          </i-select>
        </i-col>

        <i-col v-if="formItem.type !== '4' && formItem.type !== '5'" :span="10">
          <Input :value="formItem.value" placeholder="请输入" @input.native="handleInput($event, formItem)" />
        </i-col>

        <i-col v-show="node.$form.data.items.length > 1" :span="4" style="font-size: 20px; text-align: center;">
          <Icon type="ios-trash-outline" @click="handleDelete(i)" />
        </i-col>
      </i-row>

      <div class="add-button" @click="handleCreate">
        + 新增
      </div>

      <SummarizeData
        :field-name="node.title"
        filter-label="数值范围："
        :filter-result="genFilterResult()"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.number-form {
  &__title {
    height: 40px;
    line-height: 40px;
    color: #1e2540;
    font-size: 20px;
    font-weight: 600;
  }
  &__content {
    display: flex;
    flex-direction: column;
    .add-button {
      z-index: 99;
      width: 90px;
      height: 38px;
      line-height: 38px;
      color: #3654e2;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      border-radius: 2px;
      border: 1px solid #3654e2;
      background: rgba(54, 84, 226, 0.1);
      cursor: pointer;
      pointer-events: auto;
    }
  }
}
</style>
