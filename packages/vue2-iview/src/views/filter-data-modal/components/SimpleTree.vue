<script>
export default {
  name: 'SimpleTree',
  props: {
    /**
     * 树节点数据，这里要求必须提供一个唯一的 nodeKey 字段，用于标识节点
     */
    data: {
      type: Array,
      default: () => [],
    },
    // nodeKey 字段，用于标识节点
    nodeKeyField: {
      type: String,
      default: null,
    },
    // 是否展开所有
    expandAll: {
      type: Boolean,
      default: false,
    },
    // 是否展开有 leaf 被选中的节点
    expandSelect: {
      type: Boolean,
      default: false,
    },
    // 禁用选中项
    disabledSelected: {
      type: Boolean,
      default: false,
    },
    // 过滤项
    filter: {
      type: [String, Function],
      default: null,
    },
  },
  data() {
    return {
      // 处理父节点折叠
      expands: [],
      // 深拷贝包装过的数据，用于渲染
      treeData: [],
      // 节点映射：nodeKey => node
      nodesMap: {},
    }
  },
  computed: {
    filteredTreeData() {
      if (!this.filter)
        return this.treeData
      return this.treeData.map((v) => {
        const ret = { ...v }
        ret.children = (v.children || [])
          .filter(node => node._source.title.includes(this.filter))
          .map(v => ({ ...v }))
        return ret
      })
    },
    selectedNodes() {
      return this.treeData
        .reduce((accu, curr) => [...accu, ...curr.children.filter(v => v._selected)], [])
    },
    selectedKeys() {
      return this.selectedNodes.map(v => v.nodeKey)
    },
  },
  watch: {
    data: {
      handler(val) {
        this.treeData = this.genTreeData(val)
        this.nodesMap = this.genNodesMap()
        this.handleExpands()
      },
      immediate: true,
    },
    expandAll: {
      handler(val) {
        this.handleExpands(val)
      },
      immediate: true,
    },
  },
  methods: {
    handleExpands(expands) {
      if (expands)
        this.expands = this.treeData.map(v => v.nodeKey)
      else if (this.expandSelect)
        this.expands = this.getExpands()
      else
        this.expands = []
    },
    genNodesMap() {
      const nodesMap = {}
      this.treeData.forEach((v) => {
        nodesMap[v.nodeKey] = v
        if (v.children) {
          v.children.forEach((child) => {
            nodesMap[child.nodeKey] = child
          })
        }
      })
      return nodesMap
    },
    genTreeData(data, _parent = null, prefix = -1) {
      return data.map((v, i) => {
        const ret = {
          nodeKey: this.nodeKeyField
            ? `${v[this.nodeKeyField]}`
            : prefix > -1 ? `${prefix}-${i}` : `${i}`,
          _source: v, // 原始数据
          _selected: v.selected || false, // 是否选中
          _disabled: this.disabledSelected ? !!v.selected : false, // 是否禁用
          _parent, // 父节点，非原始数据
        }
        if (v.children)
          ret.children = this.genTreeData(v.children, ret, i)

        return ret
      })
    },
    handleSelect(selectedNode) {
      // 筛选后不是原来的 node
      const node = this.nodesMap[selectedNode.nodeKey]
      node._selected = !node._selected
      node._disabled = this.disabledSelected ? !!node._selected : false
      this.$emit('select-node', { node, source: node._source, nodes: this.selectedNodes, keys: this.selectedKeys })
    },
    getExpands() {
      const expands = []
      this.selectedNodes.forEach((v) => {
        if (!expands.includes(v._parent.nodeKey))
          expands.push(v._parent.nodeKey)
      })
      return expands
    },
    getCheckedKeys() {
      return this.selectedKeys
    },
    setCheckedKeys(nodeKeys) {
      this.selectedKeys
        .filter(v => !nodeKeys.includes(v))
        .forEach((nodeKey) => {
          if (this.nodesMap[nodeKey]) {
            this.setChecked(this.nodesMap[nodeKey], false)
            this.updateDisabled(this.nodesMap[nodeKey])
          }
        })

      nodeKeys.forEach((nodeKey) => {
        if (this.nodesMap[nodeKey]) {
          this.setChecked(this.nodesMap[nodeKey], true)
          this.updateDisabled(this.nodesMap[nodeKey])
        }
      })

      if (this.expandSelect)
        this.expands = this.getExpands()
    },
    setChecked(node, flag) {
      node._selected = flag
    },
    updateDisabled(node) {
      node._disabled = this.disabledSelected ? !!node._selected : false
    },
  },
}
</script>

<template>
  <div class="simple-tree">
    <i-collapse v-model="expands" simple>
      <i-panel v-for="node in filteredTreeData" :key="node.nodeKey" :name="node.nodeKey">
        <span class="root">
          <slot
            name="node"
            :node="node"
            :source="node._source"
            node-type="root"
          >{{ node._source.title }}</slot>
        </span>

        <template v-if="node.children && node.children.length" #content>
          <div class="leaf__wrapper">
            <div v-for="child in node.children" :key="child.nodeKey" class="leaf">
              <span
                class="leaf-title"
                :class="{ active: child._selected, disabled: child._disabled }"
                @click="handleSelect(child)"
              >
                <slot
                  name="node"
                  :node="child"
                  :source="child._source"
                  node-type="leaf"
                >{{ node._source.title }}</slot>
              </span>
            </div>
          </div>
        </template>
      </i-panel>
    </i-collapse>
  </div>
</template>

<style lang="less" scoped>
.ivu-collapse {
  border: none;
}

.ivu-collapse>.ivu-collapse-item {
  border: none;
}

.simple-tree {
  & /deep/ .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    height: 20px;
    line-height: 20px;
  }

  & /deep/ .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i {
    margin-right: 8px;
  }

  & /deep/ .ivu-collapse-content-box {
    padding-bottom: 0;
  }
}

.simple-tree {
  .root {
    display: inline-block;
  }

  .leaf__wrapper {
    padding-left: 32px;
  }

  .leaf {
    margin: 5px 0;

    &-title {
      padding: 3px 5px;
      border-radius: 3px;

      &:hover {
        cursor: pointer;
        background-color: #b4d1ed;
      }

      &.active {
        background-color: #ace;
      }

      &.disabled {
        background-color: #ddd;
        pointer-events: none;
        cursor: not-allowed;
      }

      transition: background-color 0.3s;
    }
  }
}
</style>
