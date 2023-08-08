<script>
export default {
  name: 'PreviewNode',
  props: {
    selectedNodes: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<template>
  <div class="preview-node">
    <div
      v-for="node in selectedNodes"
      :key="node.$form.label"
      class="preview-node__item" :class="[
        { 'preview-node__item--active': active?.$form?.label === node.$form.label },
        { 'preview-node__item--error': node.$form.error },
      ]"
      @click="$emit('update:active', node)"
    >
      <span>{{ node.$form.label }}</span>
      <Icon
        type="ios-trash-outline"
        class="preview-node__item__icon"
        @click.stop="$emit('delete', node)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.preview-node {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #ecf1fe;
    }
    &--active {
      background-color: #ecf1fe;
    }
    &--error {
      background-color: #f56c6c;
      &:hover {
        background-color: #f56c6c;
      }
    }
    &__icon {
      margin-left: 8px;
      cursor: pointer;
    }
  }
}
</style>
