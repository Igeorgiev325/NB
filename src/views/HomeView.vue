<template>
  <main class="main">
    <TheMovie v-show="showEvents"
      v-for="movie in movies"
      :title="movie.title"
      :description="movie.description"
      :genre="movie.genre"
      :release="movie.release"
      :length="movie.length"
      :featureImage="movie.featureImage[0].url"
    />
  </main>
  <TheButton @emit-value="handleEmitValue($event)"/>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import TheButton from '@/components/TheButton.vue'
import { GET_MOVIE_IMAGE } from '@/query/imageQuery'

export default {
  components: {
    TheMovie,
    TheButton
  },
  setup() {

    const valueFromEmit = ref<boolean>()
    const showEvents = ref<boolean | undefined>(true)

    const { result, load } = useLazyQuery(GET_MOVIE_QUERY)

    const { result: ImageResult } = useQuery(GET_MOVIE_IMAGE)

    // const title = computed(() => result.value?.moviesEntries.map((e: any) => e.title))
    // const description = computed(() => result.value?.moviesEntries.map((e: any) => e.description))
    // const release = computed(() => result.value?.moviesEntries.map((e: any) => e.release))
    // const length = computed(() => result.value?.moviesEntries.map((e: any) => e.length))

    const movies = computed(() => result.value?.moviesEntries)

    const moviesImages = computed(() => ImageResult.value?.moviesEntries)

    console.log("movieImages", moviesImages.value)

    watch(movies, (val) => console.log(val))


    const handleEmitValue = (val: boolean) => {
      valueFromEmit.value = val
    }

    onMounted(() => {
      load()
    })

    watch(valueFromEmit, newValueFromEmit => {
      if (newValueFromEmit) {
        clearQuery()
      }
    })

    const clearQuery = () => {
      console.log("Clear the query")
      // movies = ''
    }

    return {
      movies,
      handleEmitValue,
      showEvents
    }
  }
}

</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
}
</style>