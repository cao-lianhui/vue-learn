<script>
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { validate } from './validate'
import TextForm from './TextForm'
import DateForm from './DateForm'
import NumberForm from './NumberForm'
import PreviewNode from './PreviewNode'
import FilterFieldSelect from './FilterFieldSelect'

export default {
  name: 'Business',
  components: {
    TextForm,
    DateForm,
    NumberForm,
    PreviewNode,
    FilterFieldSelect,
  },
  provide() {
    return {
      validateNode: this.validateNode,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    dimensionData: {
      type: Array,
      default: () => [],
    },
    measureData: {
      type: Array,
      default: () => [],
    },
    defaultSelectedNodes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: {},
      dataTypeMap: {
        1: '文本名称',
        2: '时间名称',
        3: '数值名称',
      },
      /**
       * 维护一份临时的已选节点数据，用于预览，所有表单信息、错误标记存储在 $form 上
       * 取消弹窗：提示是否保存，若不保存，不做任何操作
       * 确认弹窗：校验通过后，将 $form 的数据同步到 defaultSelectedNodes 上
       */
      selectedNodes: [],
    }
  },
  computed: {
    dimensionSelected() {
      return this.selectedNodes.filter(v => v.systemColumnType === 1).map(v => v.title)
    },
    measureSelected() {
      return this.selectedNodes.filter(v => v.systemColumnType === 2).map(v => v.title)
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val)
          this.initData()
      },
      immediate: true,
    },
  },
  methods: {
    initData() {
      this.active = {}
      this.initSelectedNodes()
      this.initSimpleTreeSelected()
    },
    // 初始化选中的节点
    initSelectedNodes() {
      const ret = []
      this.defaultSelectedNodes.forEach((node) => {
        const tmpNode = this.genNode(node, true)
        ret.push(tmpNode)
      })
      this.selectedNodes = ret
    },
    // 设置默认选中项
    initSimpleTreeSelected() {
      this.$nextTick(() => {
        const { setDimensionCheckedKeys, setMeasureCheckedKeys } = this.$refs.refFieldSelect
        setDimensionCheckedKeys(this.dimensionSelected)
        setMeasureCheckedKeys(this.measureSelected)
      })
    },
    // 拷贝节点，初始化临时数据
    genNode(source, hasFormData = false) {
      const node = cloneDeep(source)
      const { title, systemColumnType, dataType } = node
      node.$form = {
        error: false,
        label: `${systemColumnType === 1 ? '维度' : '度量'}/${title}/${this.dataTypeMap[dataType]}`,
      }
      if (node.dataType === 1) {
        node.$form.data = hasFormData ? node.formData : []
      }
      else if (node.dataType === 2) {
        node.$form.data = hasFormData ? node.formData : []
      }
      else if (node.dataType === 3) {
        node.$form.data = hasFormData
          ? node.formData
          : {
              condition: 1,
              items: [
                { type: '', value: '' }, // 类型 - 值
              ],
            }
      }
      return node
    },
    // 校验节点
    validateNode(node) {
      const valid = validate(node)
      node.$form.error = !valid
      return valid
    },
    // 选择节点
    handleSelectNode({ source }, type) {
      const { title } = source
      if (type === 'dimension' && this.dimensionSelected.includes(title))
        return
      if (type === 'measure' && this.measureSelected.includes(title))
        return
      const node = this.genNode(source)
      this.selectedNodes.push(node)
    },
    // 删除节点
    handleDeleteNode(node) {
      const { title, systemColumnType } = node
      const { setDimensionCheckedKeys, setMeasureCheckedKeys } = this.$refs.refFieldSelect
      const idx = this.selectedNodes.findIndex(v => v.title === title && v.systemColumnType === systemColumnType)
      if (idx > -1) {
        this.selectedNodes.splice(idx, 1)
        // 删除的是 active
        if (title === this.active.title)
          this.active = {}

        // 更新树结构的选中项
        if (systemColumnType === 1)
          setDimensionCheckedKeys(this.dimensionSelected)
        else
          setMeasureCheckedKeys(this.measureSelected)
      }
    },
    // 关闭弹窗
    handleCancel() {
      // 1. 在这里做取消的提醒
      this.$Modal.confirm({
        title: '提示',
        content: '还未保存，确认关闭？',
        onOk: () => {
          // 2. 关闭弹窗
          this.$emit('update:visible', false)
        },
      })
    },
    // 确认保存
    handleSave() {
      // 1. 校验
      const nodes = this.selectedNodes
      let valid = true
      nodes.forEach((node) => {
        if (!this.validateNode(node))
          valid = false
      })

      if (!valid) {
        this.$Message.error('请确保添加的字段合法')
        return
      }

      // 2. 在这里做保存的逻辑，数据从 $form.data 取出来
      const res = cloneDeep(nodes)
      res.forEach((node) => {
        // iview 返回的是 Date 对象，这里转换成字符串
        if (node.dataType === 2)
          node.$form.data = node.$form.data.map(v => dayjs(v).format('YYYY-MM-DD'))

        node.formData = node.$form.data
        delete node.$form
      })
      this.$emit('update:defaultSelectedNodes', res)

      // 3. 提示以及关闭弹窗
      this.$emit('update:visible', false)
      this.$Message.success('保存成功', nodes.length)
    },
  },
}
</script>

<template>
  <i-modal
    :value="visible"
    :closable="false"
    :mask-closable="false"
    title="添加过滤字段"
    footer-hide
    class-name="business-modal"
    :styles="{
      width: '80vw',
    }"
  >
    <div class="business__wrapper">
      <div class="business">
        <div class="business-left">
          <FilterFieldSelect
            ref="refFieldSelect"
            :active="active"
            :dimension-data="dimensionData"
            :measure-data="measureData"
            @select-node="handleSelectNode"
          />

          <div class="business-left__preview">
            <PreviewNode
              :active.sync="active"
              :selected-nodes="selectedNodes"
              @delete="handleDeleteNode"
            />
          </div>
        </div>

        <div class="business-right">
          <template v-if="active.$form">
            <TextForm v-if="active.dataType === 1" :node="active" />
            <DateForm v-if="active.dataType === 2" :node="active" />
            <NumberForm v-if="active.dataType === 3" :node="active" />
          </template>
          <h2 v-else>
            请选择筛选字段
          </h2>
        </div>
      </div>

      <div class="footer">
        <Button @click="handleCancel">
          取消
        </Button>
        <Button type="primary" @click="handleSave">
          确定
        </Button>
      </div>
    </div>
  </i-modal>
</template>

<style lang="less" scoped>
.business__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.business {
  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 20px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #000;
  &-left {
    width: 290px;
    overflow-y: auto;
  }
  &-right {
    flex: 1;
    overflow-y: auto;
  }
  &-left {
    &__preview {
      margin-top: 20px;
    }
  }
}
</style>

<style lang="less">
.business-modal {
  .ivu-modal-body {
    height: 60vh;
  }
}
</style>
