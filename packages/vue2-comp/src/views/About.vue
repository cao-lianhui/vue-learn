<template>
  <div class="about">
    <Carousel :list="list" autoplay>
      <template #default="{ item }">
        <h1>
          {{ item.content }}
        </h1>
      </template>
    </Carousel>
  </div>
</template>

<script>
import Carousel from '@/components/common/Carousel.vue'

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      list: [
        { id: 1, title: '111', content: 'content 1' },
        { id: 2, title: '222', content: 'content 2' },
        { id: 3, title: '333', content: 'content 3' },
      ],
    }
  },
}
</script>
