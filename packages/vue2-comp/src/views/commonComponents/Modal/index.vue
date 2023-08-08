<template>
  <div class="modal">
    <h1>对话框/弹框 Modal</h1>
    <p>需要用户处理信息，同时又不希望用跳转新页面的方式打断工作流程时使用</p>
    <p class="common-title">
      基本用法
    </p>
    <p>弹窗基础组件 只有打开关闭的最少代码的逻辑控制 无内容</p>
    <div class="modal-content">
      <Button type="default" @click="handleOpenModalTemp('default')">
        点击演示
      </Button>
      <Collapse v-model="detailValue1" class="collapse">
        <Panel name="1">
          代码思路讲解
          <template #content>
            <pre>
              组件位置关系:
                当前组件=父组件 弹窗组件=子组件 Modal组件=子组件中的子组件
                在当前组件中使用弹窗组件 弹窗组件中使用iview的Modal组件
              实现控制弹窗开关最简化代码:
                父组件中: 给子组件ModalTemp绑定v-model 值是showTempModal
                子组件中: 给子组件Modal绑定v-bind="$attrs" v-on="$listeners"
              打开关闭弹窗具体代码:
                打开弹窗: 父组件 this.showTempModal = true
                关闭弹窗: 子组件 this.$emit('input', false)
              代码讲解:
              v-model  this.$emit('input', false) v-bind="$attrs" v-on="$listeners"
              1. v-model
              2. this.$emit('input', false)
              3. v-bind="$attrs"
              4. v-on="$listeners"
            </pre>
          </template>
        </Panel>
      </Collapse>
    </div>
    <p class="common-title">
      应用场景: 树+表格+动态表单项+弹窗+校验 这个没有图片说明不太好写 等会写吧
    </p>
    <p>如下图 点击左侧树元素 查询对应的表格行数据和列数据 点击新增一行按钮 打开新增一行弹窗 填写数据 点击确定时校验 校验通过后就调用新增接口新增数据 然后关闭弹窗</p>
    <p>这里只写按钮</p>
    <!--     图床咋搞 拖拽上传图片的腾讯云图床 -->
    <img src="" class="title-img">
    <div class="modal-content">
      <Button type="default" @click="handleOpenModalTemp('one')">
        点击演示-表单一
      </Button>
      <Button type="default" @click="handleOpenModalTemp('two')">
        点击演示-表单二
      </Button>
      <Collapse v-model="detailValue2" class="collapse">
        <Panel name="1">
          代码思路讲解
          <template #content>
            <pre>
                组件位置关系:
                  当前组件=父组件 弹窗组件=子组件 Modal组件=子组件中的子组件
                  在当前组件中使用弹窗组件 弹窗组件中使用iview的Modal组件
                实现控制弹窗开关最简化代码:
                  父组件中: 给子组件ModalTemp绑定v-model 值是showTempModal
                  子组件中: 给子组件Modal绑定v-bind="$attrs" v-on="$listeners"
                打开关闭弹窗具体代码:
                  打开弹窗: 父组件 this.showTempModal = true
                  关闭弹窗: 子组件 this.$emit('input', false)
                代码讲解:
                v-model  this.$emit('input', false) v-bind="$attrs" v-on="$listeners"
                1. v-model
                2. this.$emit('input', false)
                3. v-bind="$attrs"
                4. v-on="$listeners"
              </pre>
          </template>
        </Panel>
      </Collapse>
    </div>
    <ModalTemp
      v-model="showTempModal"
    ></ModalTemp>
    <DynamicFormModal
      v-model="showDynamicFormModal"
      :form="dynamicForm"
      :add-row="handleAddRow"
      @success="handleSuccess"
    ></DynamicFormModal>
  </div>
</template>

<script>
import ModalTemp from './components/ModalTemp'
import DynamicFormModal from './components/DynamicFormModal'
import { dynamicForm1, dynamicForm2 } from './data.js'

export default {
  components: { DynamicFormModal, ModalTemp },
  data() {
    return {
      showTempModal: false,
      showDynamicFormModal: false,
      detailValue1: '',
      detailValue2: '',
      dynamicForm: [],
    }
  },
  methods: {
    handleSuccess() {

    },
    handleAddRow() {
      // $emit('get-data',{
      //   pageNum: 1,
      //   pageSize: 10
      // })
    },
    handleAddDynamicForm(source) {
      /**
       *
       1. @get-data="@get-data="$emit('get-data',$event)"
       可以替换掉
       @get-data="handleGetData"
       handleGetData(pageInfo) {
        this.$emit('get-data',pageInfo)
      }
       2.

       需求: 弹窗中表单行的lable和id是传进去的 不是固定的 动态表单项 动态校验
       >>v-for渲染表单行

       组件1 弹窗模版 + 样式 >>
       组件2 弹窗+动态表单+校验+新增接口调用+loading 例子

       新增弹窗的iview的模版 最简单化的 √
       打开弹窗 并且初始化数据 关闭弹窗  √
       动态渲染表单 处理数据 √
       数据是先传后处理 还是先处理后传呢 >> 先处理后传入组件 √
       点击新增按钮时 组件内的数据是先在组件内处理成新增接口的入参
       还是先简单处理 再把简单处理后的数据暴露给父组件 再在父组件中处理为入参的格式呢
       >> 第二种
       不需要修改的数据 但是新增接口需要传入的数据 需要传给弹窗组件吗? >> 不需要 数据的详细处理在父组件
       表单校验 至少填一个字段 随便填哪个都可以 但是如果一个字段都没有填 就不能调用新增接口 √

       点击确定
       先表单校验 √ 组件内
       处理表单输出为新增接口的入参形式  √ 组件内(简单处理)+组件外(详细处理)
       然后调用新增接口 √ 组件外(父组件)
       调用接口的同时给新增和取消按钮都加上loading √ 组件内
       接口返回200 就loading结束 然后提示新增成功 然后关闭弹窗 √  组件外=父组件(调用接口 暴露接口返回数据给组件) + 组件内(控制loading和弹窗关闭)
       接口返回其他 就loading结束 然后提示新增失败 然后不关闭弹窗 √ 组件外=父组件(调用接口 暴露接口返回数据给组件) + 组件内(控制loading和弹窗关闭)
       */
      console.log(source, 'source')
      this.dynamicForm = source
      // this.showDynamicFormModal = true
    },
    handleOpenModalTemp(type) {
      if (type === 'default')
        this.showTempModal = true

      else if (type === 'one')
        this.handleAddDynamicForm(dynamicForm1)

      else if (type === 'two')
        this.handleAddDynamicForm(dynamicForm2)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
 padding: 50px 100px;
  &-content {
    display: flex;
    gap: 10px;
    .collapse {
      flex: 1
    }
  }
  .title-img {

  }
}
</style>
