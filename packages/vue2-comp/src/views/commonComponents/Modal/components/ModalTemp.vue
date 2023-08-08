<template>
  <div>
    <Modal
      width="670"
      style="height: 730px;"
      :transfer="true"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div slot="header" class="modal-header">
        <div class="header-title">新增一条</div>
      </div>
      <div class="modal-content">
        弹窗内容区域
      </div>
      <div slot="footer" class="modal-footer">
        <div>
          <Button class="cancel-btn" :loading="loading" @click="handleCancel">取消</Button>
          <Button :loading="loading" class="add-btn" @click="handleSubmit" type="primary">添加</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    // form: {
    //   type: Array,
    //   default: () => []
    // },
  },
  data() {
    return {
      loading: false,
      modelForm: [],
    }
  },
  watch: {
    "$attrs.value"(val) {
      if(val) {
        // 初始化表单值
        // this.modelForm = JSON.parse(JSON.stringify(this.form))
      }
    }
  },
  methods: {
    /**
     * @description 取消
     */
    handleCancel() {
      this.$emit('input', false)
    },
    /**
     * @description 新增提交
     */
    handleSubmit() {
      this.$emit('input', false)
    }
  }
}
</script>
<!--
//@import '@/style/iViewDeep.scss';
// less 怎么转scss?
//.title-style-mixin;


-->
<style lang="scss" scoped>
.title-style-mixin {
  height: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #1e2540;
  line-height: 20px;
}
.btn-size-mixin {
  width: 80px;
  height: 34px;
}
.modal-header {
  height: 66px;
  color: #3654e2;
  display: flex;
  align-items: center;
  .header-title {

    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #1e2540;
    line-height: 20px;

    color: #3654e2;
  }
}
.modal-content {
  width: 100%;
  margin-top: 40px;
}
.modal-footer {
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  .cancel-btn {
    /** .btn-size-mixin; */
    width: 80px;
    height: 34px;

    margin-right: 30px;
  }
  .add-btn {
    /** .btn-size-mixin; */
    width: 80px;
    height: 34px;

    background-color: #3654e2;
  }
}
</style>
