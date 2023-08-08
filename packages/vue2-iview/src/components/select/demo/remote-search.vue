<script>
import VirtualSelect from '../index.vue'
import Card from '@/components/demo/Card.vue'

function genLargeList(count = 50000) {
  const list = []
  for (let i = 0; i < count; i++) {
    const value = `${i + 1} - ${i.toString(36)}${i}`
    list.push({
      label: `${value}`,
      value,
      disabled: i === 10,
    })
  }
  return list
}

const data = genLargeList()

export default {
  components: {
    Card,
    VirtualSelect,
  },
  data() {
    return {
      options: [],
      loading: false,
      page: 1,
      pageSize: 20,
      hasMore: true,
      searchId: 1,
      value: [
        { label: '1 - 00' },
      ],
    }
  },
  methods: {
    handler(type) {
      console.log(type)
    },
    // 模拟请求
    getData({
      page = 1,
      pageSize = 20,
      search = '',
    } = {}, timeout = 1000) {
      const limit = pageSize
      const offset = (page - 1) * pageSize
      console.log(offset, limit, search)

      // this.options.length < total
      // const pageInfo = {
      //   page: 2,
      //   pageSize: 20,
      //   total: 1000,
      //   hasMore: true,
      // }

      const list = data
        .filter(v => v.label.includes(search))
        .slice(offset, offset + limit)

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(list)
        }, timeout)
      })
    },
    // 搜索
    async handleSearch(search = '') {
      console.log('search:', search)
      this.searchId++
      const searchId = this.searchId

      this.options = []
      this.page = 1
      this.hasMore = true
      this.loading = true
      try {
        const options = await this.getData({
          page: this.page,
          pageSize: this.pageSize,
          search,
        })

        if (searchId !== this.searchId)
          return

        this.options = options

        // this.page = res.data.pageInfo.page + 1
        // this.pageSize = res.data.pageInfo.pageSize
        // this.hasMore = res.data.pageInfo.hasMore
        // this.hasMore = this.options.length < res.data.pageInfo.total
      }
      catch (error) {
        console.log(error)
      }

      this.page++
      this.loading = false
    },
    // 分页加载
    async handleLoadMore(search) {
      console.log('load more...', search)

      this.loading = true
      try {
        const options = await this.getData({
          page: this.page,
          pageSize: this.pageSize,
          search,
        })

        this.options.push(...options)

        this.page++
        if (!options.length)
          this.hasMore = false

        // this.page = res.data.pageInfo.page + 1
        // this.pageSize = res.data.pageInfo.pageSize
        // this.hasMore = res.data.pageInfo.hasMore
        // this.hasMore = this.options.length < res.data.pageInfo.total
      }
      catch (error) {
        console.log(error)
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <div class="demo" style="width: 600px">
    <Card
      title="虚拟滚动 + 无限滚动 - 监听 load-more 事件请求分页数据"
    >
      <i-row>
        <i-col :span="24">
          <VirtualSelect
            v-model="value"
            value-field="label"
            class="my-select"
            :loading="loading"
            :options="options"
            placeholder="请输入文本搜索"
            remote
            page-mode
            filterable
            :has-more="hasMore"
            :item-height="30"
            :popper-height="256"
            @open="handleSearch"
            @search="handleSearch"
            @load-more="handleLoadMore"
            @select="handler('select')"
            @change="handler('change')"
            @delete="handler('delete')"
          />
        </i-col>
      </i-row>
    </Card>
  </div>
</template>

<style lang="less">
// .virtual-select {
.select-options__content-item{
  // --checked-color: red;
  /* background-color: #ccc; */
}
</style>
