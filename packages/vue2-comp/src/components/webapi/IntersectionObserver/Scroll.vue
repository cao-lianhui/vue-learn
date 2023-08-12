<template>
  <div class="hello">
    <div ref="wrap" />
    <div ref="loadMore">
      加载中...
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeVue',
  props: {
    msg: String,
    bool: Array,
  },
  data() {
    return {
      count: 0,
    }
  },
  mounted() {
    const container = this.$refs.wrap
    const loadMore = this.$refs.loadMore
    // 接口
    const loadItems = (count) => {
      [...Array(count).keys()].forEach((key) => {
        const p = document.createElement('P')
        p.innerHTML = `${key + this.count}` // 0 + 0 1+0
        container.appendChild(p)
      })
      // this.count = this.count + count;
      this.count += count // 0 + 20
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting)
        loadItems(20)
    })

    observer.observe(loadMore)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
