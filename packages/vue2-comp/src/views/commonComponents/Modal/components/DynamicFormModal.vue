<template>
  <div>
    <Modal
      :mask-closable="false"
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
        <Form :label-width="120">
          <FormItem v-for="(item, index) in modelForm" :key="index" :label="item.title">
            <Input v-model="item.value" :placeholder="`请输入${item.title}`" maxlength="50"/>
          </FormItem>
        </Form>
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
    form: {
      type: Array,
      default: () => []
    },
    addRow: {
      type: Function,
      required: true,
    }
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
        this.modelForm = JSON.parse(JSON.stringify(this.form)).map(v => ({...v, value: ''}))
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
    async handleSubmit() {
      const valid = this.modelForm.some(v => v.value.length > 0)
      if (!valid) {
        this.$Message.error('请输入一条数据!')
        return
      }

      const form = {}

      this.modelForm.forEach(item => {
        form[item.key] = item.value
      })

      this.loading = true

      try {
        const res = await this.addRow(form)
        this.$Message.success(res)
        this.$emit('input', false)
        this.$emit('success')
      } catch (error) {
        this.$Message.error(error)
      }
      this.loading = false
    }

  }
}
</script>

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