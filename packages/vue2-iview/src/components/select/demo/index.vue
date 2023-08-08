<script>
import VirtualSelect from '../index.vue'
import Card from '@/components/demo/Card.vue'

function genLargeList(count = 50000) {
  const list = []
  for (let i = 0; i < count; i++) {
    const value = `${i} - ${i.toString(36)}${i}xxxxxxxxxxxxx`
    list.push({
      label: `${value}`,
      value,
    })
  }
  return list
}

export default {
  components: {
    Card,
    VirtualSelect,
  },
  data() {
    return {
      checked: [
        { label: '0 - 00xxxxxxxxxxxxx' },
        { label: '1 - 11xxxxxxxxxxxxx' },
        { label: '3 - 33xxxxxxxxxxxxx' },
        { label: '4 - 44xxxxxxxxxxxxx' },
        { label: '5 - 55xxxxxxxxxxxxx' },
      ],
      checked2: [
        { label: '0 - 00' },
        { label: '1 - 11' },
      ],
      loading: false,
      options: genLargeList(1000),
      options1: [],
      options2: [],
    }
  },
  methods: {
    getData1(timeout = 1000) {
      if (this.options1.length)
        return

      this.loading = true
      setTimeout(() => {
        this.options1 = []
        this.loading = false
      }, timeout)
    },
    getData2(timeout = 1000) {
      // if (this.options2.length) return

      this.loading = true
      setTimeout(() => {
        this.options2 = genLargeList(1000)
        this.loading = false
      }, timeout)
    },
  },
}
</script>

<template>
  <div style="width: 600px">
    <Card
      title="虚拟滚动 - 本地数据"
    >
      <i-row>
        <i-col :span="6">
          <VirtualSelect
            v-model="checked"
            value-field="label"
            :options="options"
            placeholder="请选择"
            filterable
          />
        </i-col>
      </i-row>
    </Card>

    <Card
      title="虚拟滚动 - 请求数据"
      description="异步请求，无数据状态"
    >
      <i-row>
        <i-col :span="12">
          <VirtualSelect
            :loading="loading"
            :options="options1"
            filterable
            placeholder="请选择"
            @open="getData1"
          />
        </i-col>
      </i-row>
    </Card>

    <Card
      title="虚拟滚动 - 请求数据"
      description="监听 open 事件一次性请求数据"
    >
      <i-row>
        <i-col :span="18">
          <VirtualSelect
            v-model="checked2"
            value-field="label"
            filterable
            :loading="loading"
            :options="options2"
            placeholder="请输入文本搜索"
            @open.once="getData2"
          />
        </i-col>
      </i-row>
    </Card>
  </div>
</template>
