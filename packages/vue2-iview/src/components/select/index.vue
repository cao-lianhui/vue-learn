<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  name: 'InfiniteSelect',
  components: {
    RecycleScroller,
  },
  props: {
    /**
     * 选中的值
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * 选项列表
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * 选项高度：定高，用于虚拟滚动
     */
    itemHeight: {
      type: Number,
      default: 32,
    },
    /**
     * 弹出层高度：定高，用于虚拟滚动
     */
    popperHeight: {
      type: Number,
      default: 256,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    /**
     * 是否多选
     */
    filterable: {
      type: Boolean,
      default: false,
    },
    filterMethod: {
      type: Function,
      default: (input, option) => option.label.includes(input),
    },
    // 是否开启远程搜索
    remote: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否分页模式，会在底部添加一个 loading
     */
    pageMode: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示加载中
     * pageMode 为 false 时，仅显示一次 loading
     * pageMode 为 true 时，分页查询都会触发 loading
     */
    loading: {
      type: Boolean,
      default: false,
    },
    keyField: {
      type: String,
      default: 'value',
    },
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      active: false,
      search: '',
      inputWidth: 0,
      shouldLoadMore: true,
      poperWidth: 0,
    }
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    filterList() {
      return this.options.filter(item => this.filterMethod(this.search, item))
    },
    showPlaceholder() {
      return !this.search.length && !this.checked.length
    },
    showVirtualScroll() {
      return this.filterList.length >= Math.ceil(this.popperHeight / this.itemHeight)
    },
  },
  watch: {
    search: {
      handler(val) {
        this.$nextTick(() => {
          this.inputWidth = this.$refs.refInputLabel.clientWidth
        })

        if (this.active)
          this.$emit('search', val)
      },
    },
    showVirtualScroll: {
      handler() {
        this.$nextTick(() => {
          this.startLoadingObserver()
        })
      },
      immediate: true,
    },
  },
  mounted() {
    this.startObserver()
  },
  beforeUnmount() {
    this.endObserver()
    this.endLoadingObserver()
  },
  methods: {
    isChecked(item) {
      return this.checked.some(checked => checked[this.valueField] === item[this.valueField])
    },
    startObserver() {
      if (!this.observer) {
        this.observer = new ResizeObserver(([el]) => {
          if (this.active) {
            const { refDropdown } = this.$refs
            const dropdownComp = refDropdown.$children.find(v => !!v.update)
            this.active && dropdownComp && dropdownComp.update()
          }
          // console.log(el)
          this.poperWidth = el.target.clientWidth
        })
        this.observer.observe(this.$refs.refSearch)
      }
    },
    endObserver() {
      this.observer && this.observer.disconnect()
    },
    startLoadingObserver() {
      this.loadMoreObserver = new IntersectionObserver(([el]) => {
        if (el.isIntersecting)
          this.$emit('load-more', this.search)
      }, {
        // root: null, // 相对的视口 DOM，默认为父元素
        rootMargin: '0px 0px 300px 0px', // 计算交叉值时的便宜量
        thresholds: [0], // 规定了一个监听目标与边界盒交叉区域的比例值，若设为 1 则完全进入视口才算可见
      })

      if (this.$refs.refLoadMore)
        this.loadMoreObserver.observe(this.$refs.refLoadMore)
    },
    endLoadingObserver() {
      this.loadMoreObserver && this.loadMoreObserver.disconnect()
    },
    // 聚焦
    doFocus() {
      if (!this.filterable)
        return
      this.$refs.refInput.focus()
    },
    // 滚动到顶部
    doScrollTop() {
      this.$nextTick(() => {
        this.showVirtualScroll && (this.$refs.refScroller.$el.scrollTop = 0)
      })
    },
    handleVisibleChange(val) {
      if (val) {
        this.doFocus()
        this.doScrollTop()
        this.$emit('open')
      }
      else {
        this.search = ''
        this.$emit('close')
      }
      this.active = val
    },
    handleSelect(item) {
      const idx = this.checked.findIndex(v => v[this.valueField] === item[this.valueField])
      if (idx > -1) {
        this.checked.splice(idx, 1)
        this.$emit('delete', { checked: this.checked, item: null })
      }
      else {
        this.checked.push(item)
        this.$emit('select', { checked: this.checked, item })
      }

      if (!this.remote)
        this.search = ''

      this.doFocus()
      this.$emit('change', this.checked)
    },
    handleDelete(item) {
      this.handleSelect(item)
    },
    handleKeydown(e) {
      const { keyCode } = e
      if (keyCode === 13 && this.filterList.length) {
        // if Enter
        this.handleSelect(this.filterList[0])
      }
      else if (e.keyCode === 8 && !this.search && this.checked.length) {
        // if Backspace
        this.checked.pop()
      }
      // Todo: 可以考虑 Esc 关闭
      // Todo: 可以考虑上下键选择
    },
  },
}
</script>

<template>
  <div class="virtual-select">
    <Dropdown
      ref="refDropdown"
      trigger="click"
      @on-visible-change="handleVisibleChange"
    >
      <div
        ref="refSearch"
        class="select-checked" :class="[
          { 'select-checked--active': active },
        ]"
      >
        <div v-for="item in checked" :key="item[valueField]" class="select-checked__item">
          <span class="select-checked__item-label">{{ item[labelField] }}</span>
          <span class="select-checked__item-close">
            <Icon type="ios-close" @click.stop="handleDelete(item)" />
          </span>
        </div>

        <div class="select-checked__search">
          <template v-if="filterable">
            <div class="select-checked__search-inner">
              <input
                ref="refInput"
                v-model="search"
                class="select-checked__search-input"
                :style="{ width: `${inputWidth}px` }"
                @keydown="handleKeydown"
              >
              <span ref="refInputLabel" class="select-checked__search-label">{{ search }}&nbsp;</span>
            </div>
          </template>
          <span v-if="showPlaceholder" class="select-checked__search-hidden">{{ placeholder }}</span>
        </div>
      </div>

      <template #list>
        <div class="select-options" :style="{ width: `${poperWidth}px` }">
          <!-- 本地搜索 && 筛选数据为空 -->
          <div v-if="!remote && !filterList.length">
            <!-- 单次加载 -->
            <div v-if="loading">
              <div class="select-options__content-loading">
                <Icon type="ios-loading" />
              </div>
            </div>
            <div v-else-if="!filterList.length">
              <slot name="empty">
                <div class="select-options__empty">
                  暂无数据
                </div>
              </slot>
            </div>
          </div>

          <!-- 其他 -->
          <template v-else>
            <div
              v-if="showVirtualScroll"
              class="select-options__content"
              :style="{ height: `${popperHeight}px` }"
            >
              <RecycleScroller
                ref="refScroller"
                class="select-options__content-scroller"
                :items="filterList"
                :item-size="itemHeight"
                :key-field="keyField"
              >
                <template #default="{ item }">
                  <div
                    class="select-options__content-item" :class="[
                      { 'select-options__content-item--active': isChecked(item) },
                    ]"
                    @click="handleSelect(item)"
                  >
                    <span class="select-options__content-item__label">{{ item[labelField] }}</span>
                    <slot v-if="isChecked(item)" name="icon">
                      <Icon type="md-checkmark" />
                    </slot>
                  </div>
                </template>

                <template #after>
                  <!-- 分页加载 -->
                  <template v-if="pageMode">
                    <div v-if="hasMore" ref="refLoadMore" key="loading" class="select-options__content-loading">
                      <Icon type="ios-loading" />
                    </div>
                    <div v-else class="select-options__content-success">
                      <span>没有更多数据</span>
                    </div>
                  </template>
                </template>
              </RecycleScroller>
            </div>

            <template v-else>
              <div class="select-options__content-scroller">
                <div
                  v-for="item in filterList"
                  :key="item[valueField]"
                  class="select-options__content-item" :class="[
                    { 'select-options__content-item--active': isChecked(item) },
                  ]"
                  @click="handleSelect(item)"
                >
                  <span class="select-options__content-item__label">{{ item[labelField] }}</span>
                  <slot v-if="isChecked(item)" name="icon">
                    <Icon type="md-checkmark" />
                  </slot>
                </div>
              </div>

              <!-- 远程搜索 -->
              <template v-if="remote">
                <div v-if="loading" key="loading" class="select-options__content-loading">
                  <Icon type="ios-loading" />
                </div>
                <div v-else-if="!filterList.length">
                  <slot name="empty">
                    <div class="select-options__content-success">
                      暂无数据
                    </div>
                  </slot>
                </div>
              </template>
            </template>
          </template>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style lang="less" scoped>
// 颜色变量
@checked-color: #57a3f3;

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ccc;
}
.virtual-select {
  display: flex;
  width: 100%;
  & /deep/ .ivu-dropdown {
    width: 100%;
  }
}

.select-checked {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  width: 100%;
  // width: 300px;
  min-height: 28px;
  padding: 2px 4px;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    border-color: #57a3f3;
  }
  &--active {
    border-color: #57a3f3;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
  }
  &__item {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22px;
    padding: 0px 3px 0 5px;
    border-radius: 4px;
    border: 1px solid #0505050f;
    background-color: #f0f0f0;
    &-label {
      flex: 1;
      .ellipsis();
    }
    &-close {
      margin-left: 5px;
      color: #050505;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  &__search {
    display: flex;
    align-items: center;
    overflow: hidden;
    &-input {
      min-width: 4px;
      height: 22px;
      outline: none;
      border: none;
      // background-color: #ace;
    }
    &-label {
      position: absolute;
      visibility: hidden;
    }
    &-hidden {
      color: #ccc;
    }
  }
}
.select-options {
  width: 120px;
  padding: 3px;
  font-size: 16px;
  &__content {
    &-scroller {
      height: 100%;
    }
    &-item {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3px 5px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
      &--active {
        color: var(--checked-color, @checked-color);
        background-color: #fff;
        &:hover {
          background-color: #fff;
        }
      }
      &__label {
        flex: 1;
        .ellipsis();
      }
    }
    &-loading {
      padding: 3px 5px;
      text-align: center;
      // background-color: #ace;
      .ivu-icon {
        color: var(--checked-color, @checked-color);
        animation: rotate 1s linear infinite;
      }
    }
    &-success {
      .empty();
    }
  }
  &__empty {
    .empty();
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
