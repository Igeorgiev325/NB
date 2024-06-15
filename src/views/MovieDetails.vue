<template>
  <section class="wrapper">
    <img :src='allMovies?.featureImage[0].url ?? urlFromImage'>
    <h2 class="title">
      {{ allMovies?.title }}
    </h2>
    <div class="description">
      {{ allMovies?.description }}
    </div>
    <div class="genre">
      {{ allMovies?.genre }}
    </div>
    <div class="release-and-length">
      <div class="release">
        Release date: {{ allMovies?.release }}
      </div>
      <div class="length">
        Length: {{ allMovies?.length }} mins
      </div>
    </div>
  </section>

</template>

<script lang="ts">
import type { MovieInterface } from '@/type/MovieInterface';
import { type PropType, ref, watch, onMounted } from 'vue'
import { GET_MOVIE_DEFAULT_IMAGE } from '@/query/imageQuery'
import { useLazyQuery } from '@vue/apollo-composable'
import type { FeatureImageModel } from "@/type/FeatureImageModel"

interface AssetImageModel {
  asset: FeatureImageModel
}

export default {
  props: {
    allMovies: {
      type: Object as PropType<MovieInterface>,
      required: false
    }
  },
  setup() {

    const urlFromImage = ref<string>()

    const { result, load } = useLazyQuery<AssetImageModel>(GET_MOVIE_DEFAULT_IMAGE)

    watch(result, value => {
      urlFromImage.value = value?.asset.url
    })

    onMounted(() => {
      load()
    })
    
    return {
      urlFromImage
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