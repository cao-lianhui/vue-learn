<script>
import SimpleTree from './SimpleTree'

export default {
  name: 'FilterFieldSelect',
  components: {
    SimpleTree,
  },
  props: {
    active: {
      type: Object,
      required: true,
    },
    dimensionData: {
      type: Array,
      default: () => [],
    },
    measureData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      keywords: '',
      activeTab: 'dimension',
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.keywords = ''
        this.activeTab = 'dimension'
      }
    },
  },
  methods: {
    setDimensionCheckedKeys(checkedKeys) {
      this.$refs.refDimensionTree.setCheckedKeys(checkedKeys)
    },
    setMeasureCheckedKeys(checkedKeys) {
      this.$refs.refMeasureTree.setCheckedKeys(checkedKeys)
    },
  },
}
</script>

<template>
  <i-poptip
    transfer
    placement="bottom-start"
    popper-class="custom-poptip"
    transfer-class-name="filter-poptip"
    @on-popper-show="visible = true"
    @on-popper-hide="visible = false"
  >
    <i-input
      :value="active.$form?.label || ''"
      disabled
      placeholder="添加过滤字段"
      style="width: 290px"
    >
      <template #prefix>
        <i-icon type="ios-add-circle-outline" size="21" color="#3654E2" />
      </template>
      <template #suffix>
        <i-icon v-if="visible" type="md-arrow-dropup" />
        <i-icon v-else type="md-arrow-dropdown" />
      </template>
    </i-input>

    <template #content>
      <div style="margin-bottom: 20px">
        <i-input
          v-model="keywords"
          placeholder="请输入字段名搜索"
        >
          <!-- <img src="@/assets/search.png" class="search-img" slot="suffix"/> -->
        </i-input>
      </div>

      <i-tabs v-model="activeTab">
        <i-tab-pane label="纬度" name="dimension">
          <SimpleTree
            ref="refDimensionTree"
            :data="dimensionData"
            expand-all
            disabled-selected
            node-key-field="title"
            :filter="keywords"
            @select-node="$emit('select-node', $event, 'dimension')"
          >
            <template #node="{ source, nodeType }">
              <span>
                <i-icon v-if="nodeType === 'root'" type="ios-folder-outline" style="margin-right: 8px" />
                <i-icon v-if="nodeType === 'leaf'" type="ios-leaf-outline" style="margin-right: 8px" />
                <span>{{ source.title }}</span>
              </span>
            </template>
          </SimpleTree>
        </i-tab-pane>

        <i-tab-pane label="度量" name="measure">
          <SimpleTree
            ref="refMeasureTree"
            :data="measureData"
            expand-all
            disabled-selected
            node-key-field="title"
            :filter="keywords"
            @select-node="$emit('select-node', $event, 'measure')"
          >
            <template #node="{ source, nodeType }">
              <span>
                <i-icon v-if="nodeType === 'root'" type="ios-folder-outline" style="margin-right: 8px" />
                <i-icon v-if="nodeType === 'leaf'" type="ios-leaf-outline" style="margin-right: 8px" />
                <span>{{ source.title }}</span>
              </span>
            </template>
          </SimpleTree>
        </i-tab-pane>
      </i-tabs>
    </template>
  </i-poptip>
</template>

<style lang="less" scoped>
::v-deep {
  .ivu-tabs-nav-wrap {
    background-color: #F5F6FD;
    font-size: 16px;
    font-weight: 600;
  }
  .ivu-tabs-ink-bar {
    background-color: #3654E2;
  }
  .ivu-tabs-bar {
    margin-bottom: 5px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    color: #041529
  }
  .ivu-tabs-nav .ivu-tabs-tab-active{
    color: #3654E2 !important;
  }
  .ivu-input[disabled], fieldset[disabled] .ivu-input {
    background-color: #fff;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.search-img {
  width: 17px;
  height: 17px;
  margin: 7px 7px 0 0;
}
.custom-poptip {
  .ivu-poptip-arrow {
    display: none;
    &:after {
      display: none;
    }
  }
}
.filter-poptip {
  width: 290px;
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &-content {
    height: 290px;
  }
  .tabs {
    margin-top: 5px;
  }
  .tree {
    height: 205px;
    overflow-y: auto;
  }
}
</style>
