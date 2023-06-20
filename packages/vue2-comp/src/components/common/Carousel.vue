<template>
  <div class="vc-carousel">
    <div class="vc-carousel__main">
      <el-carousel
        ref="refCarousel"
        v-bind="$attrs"
        v-on="$listeners"
        @change="handleChange"
      >
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <slot :item="item"></slot>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="vc-carousel__footer">
      <div class="vc-carousel__footer-header">
        <slot v-if="list.length" name="title" :title="list[active].title">
          {{ list[active].title || '' }}
        </slot>
      </div>
      <div class="vc-carousel__footer-indicator">
        <div
          v-for="i in list.length"
          :key="i"
          class="dot"
          :class="{ active: active === i - 1 }"
          @click="handleClickDot(i - 1)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    handleChange(idx) {
      this.active = idx
      this.$emit('change', idx)
    },
    handleClickDot(idx) {
      this.active = idx
      this.$refs.refCarousel.setActiveItem(idx)
      this.$emit('change', idx)
    },
  },
}
</script>

<style lang="scss" scoped>
.vc-carousel {
  box-sizing: border-box;
  border: 1px solid #ace;
  border-radius: 5px;
  &__footer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 10px;
    background-color: #ace;
    &-header {
      flex: 1;
      font-weight: bold;
    }
    &-indicator {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #ccc;
        &.active {
          background-color: #409eff;
        }
      }
    }
  }
}
</style>
