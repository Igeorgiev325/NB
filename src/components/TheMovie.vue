<template>
  <section class="wrapper">
    <img :src='featureImage ?? (defaultImage as string)'>
    <h2 class="title">
      {{ title }}
    </h2>
    <div class="description">
      {{ description }}
    </div>
    <div class="genre">
      {{ genre }}
    </div>
    <div class="release-and-length">
      <div class="release">
        Release date: {{ release }}
      </div>
      <div class="length">
        Length: {{ length }} mins
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { GET_MOVIE_DEFAULT_IMAGE } from '@/query/imageQuery'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { watch, ref, onMounted } from 'vue'
import  type defaultImageInterface  from '@/type/defaultImageInterface'
import type { PropType } from 'vue'
// import type movieInterface from '@/type/movieInterface'

interface MovieInterface {
  title: any
  description: any
  genre: any
  release: any
  length: any
  featureImage: any
}

export default {
  props: {
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    genre: {
      type: Array,
      required: false
    },
    release: {
      type: String,
      required: false
    },
    length: {
      type: Number,
      required: false
    },
    featureImage: {
      type: String,
      required: false
    }
  },
  setup() {
    //const defaultImage: string = `@/assets/alien.jpg`
    const defaultImage = ref<defaultImageInterface>()

    const { result, load } = useLazyQuery(GET_MOVIE_DEFAULT_IMAGE)

    onMounted(() => {
      load()
    })
    watch(result, value => {
      defaultImage.value = value.asset.url
    })

  
    return {
      defaultImage
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  border: 0.3rem solid teal;
  max-width: 30rem; 
  padding: 1rem;
  margin: 1rem;
}

.title {
  text-align: center;
  padding: 1rem;
}

.description {
  padding-bottom: 0.5rem;
}

.release-and-length {
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
  text-align: center;
}
</style>