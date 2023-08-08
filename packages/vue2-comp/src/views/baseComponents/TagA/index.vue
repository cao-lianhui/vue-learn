<template>
  <div class="modal">
    <h1>a标签</h1>
    <p>功能: 点击跳转</p>
    <p class="common-title">
      基本用法
    </p>
    <p>纯前端实现需求: 已读数据置灰 当天数据标红效果</p>
    <div class="modal-content">
      <div class="detail-before detail">
        <div class="title">
          原来的效果 都是黑色 点击也不会变灰
        </div>

        <div v-for="item in list" :key="item.id" class="item" @click="handleClick(item)">
          <div class="item-title" :title="item.title">
            <span>{{ item.title }}</span>
          </div>
          <div class="item-date">
            {{ item.create_time }}
          </div>
        </div>
      </div>

      <div class="detail-now detail">
        <div class="title">
          现在的效果 就是实际需求效果
        </div>

        <div v-for="item in list" :key="item.id">
          <router-link
            class="list-link" :class="[item.create_time.startsWith(today) ? 'is-new' : '']"
            :to="getTargetRoute(item)"
          >
            <div :title="item.title" class="list">
              <div class="list-title">
                {{ item.title }}
              </div>
              <div class="list-date">
                {{ item.create_time }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <Collapse v-model="detailValue1" class="collapse">
        <Panel name="1">
          实现的思路:
          <template #content>
            <pre>
       实际需求:
  实现已读数据置灰 当天数据标红效果
  为了节约时间 用的前端实现 所以换浏览器 或者换电脑 或者用新的浏览器打开 或者是用无痕模式打开浏览器网页 这个效果就没有了
  分析需求:
  1. 没有点击时 是当天的数据 字体颜色是红色;不是当天的数据 字体颜色是黑色
  2. 点击后 没有跳转页面 或者 跳转页面再跳回来 或者 刷新页面 数据字体颜色都是灰色
  3. 点击后 如果跳转页面 效果是:
    a 在当前tab页(tab1)点击一条数据
    b 把这条数据自带的路由/超链接作为新tab页的url 打开这个新tab页(tab2)并跳转过去
    c 点击tab1标签切换回tab1时 调用查询接口获取数据 重新渲染页面
    d 页面渲染完成后 当前点击的这条数据还是灰色
  5. 点击后 如果刷新当前页面 效果是:
    a 调用查询接口获取数据 重新渲染页面
    b 页面渲染完成后 当前点击的这条数据还是灰色
  实现底层原理:
  1. a标签的visited属性
  2. a标签在浏览器中的缓存机制 因为有缓存 所以刷新页面 以及查询接口后 还是保存着之前的点击效果
  3. 如果用无痕模式浏览 如果清空缓存 或者换浏览器或者换电脑登陆 不会有这样的效果
  实现进阶原理:
  1. vue2的route-link标签就是一个a标签 所以可以用他来代替a标签的url和div的click事件来实现点击打开新tab页 跳转路由的效果
  2. route-link的to属性 = this.$router.push(route) 都是跳转路由页面
            </pre>
          </template>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      showTempModal: false,
      showDynamicFormModal: false,
      detailValue1: '',
      detailValue2: '',
      dynamicForm: [],
      today: dayjs().format('YYYY-MM-DD'),
      list: [
        {
          id: '80',
          title: 'HXtest月度重点工作新增',
          create_time: `${dayjs().format('YYYY-MM-DD')} ` + '19:22:13',
        },
        {
          id: '4',
          title: '关于印发集团公司2023年5月工作计划',
          create_time: '2023-06-12 09:48:03',
        },
        {
          id: '3',
          title: '关于印发集团公司2023年4月工作计划',
          create_time: '2023-06-12 09:22:03',
        },
        {
          id: '5',
          title: '关于印发集团公司2023年6月工作计划',
          create_time: '2023-06-12 09:05:04',
        },
      ],
    }
  },
  methods: {
    handleClick(item) {
      // 动态路由
      const route = {
        path: `/routeTest/${item.id}`,
        query: {
          title: item.title,
        },
      }
      this.$router.push(route)
    },
    getTargetRoute(item) {
      const route = {
        path: `/routeTest/${item.id}`,
        query: {
          title: item.title,
        },
      }
      return route
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin ellipsis {
  max-width: 12em;/* 超出11个字隐藏，之所以设置12em是因为省略号占一个位置 */
  overflow: hidden; /* 超出隐藏 */
  white-space: nowrap; /* 文本不换行 */
  /* 显示省略符号来代表被修剪的文本 */
  text-overflow: ellipsis; /* 超出显示省略号 */
}

.modal {
  padding: 50px 100px;
  &-content {
    display: flex;
    gap: 30px;
    .detail {
      width: 300px;
      .title {
        margin-bottom: 15px;
      }
    }
    .collapse {
      width: 500px;
      overflow-y: auto;
    }
    .item {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      &-title {
        @include ellipsis;
        color: #313131;
      }
      &-date {
        color: #666;
      }
    }

    .list {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      &-link {
        /** 去除a标签的下划线 */
        text-decoration: none;
        /** 设置默认颜色是黑色 */
        color: #000;
        /** 设置默认颜色是黑色 */
        &.is-new {
          color: #C23E25;
        }
        /** 浏览过的标题是灰色 */
        &:visited {
          color: #aaa;
        }
      }
      &-title {
        @include ellipsis;
      }
      &-date {
        color: #666;
      }
    }
  }
}
</style>
