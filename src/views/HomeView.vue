<template>
  <main>
    <TheMovie
      v-for="movie in movies"
      :title="movie.title"
      :description="movie.description"
      :genre="movie.genre"
      :release="movie.release"
      :length="movie.length"
    />
  </main>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'

export default {
  components: {
    TheMovie
  },
  setup() {

    const button = ref<boolean>(true)

    const { result, loading, refetch } = useQuery(GET_MOVIE_QUERY)
    
    // const title = computed(() => result.value?.moviesEntries.map((e: any) => e.title))
    // const description = computed(() => result.value?.moviesEntries.map((e: any) => e.description))
    // const release = computed(() => result.value?.moviesEntries.map((e: any) => e.release))
    // const length = computed(() => result.value?.moviesEntries.map((e: any) => e.length))

    const movies = computed(() => result.value?.moviesEntries)

    watch(movies, (val) => console.log(val))


    return {
      movies
    }
  }
}

</script>

<style scoped>

</style>