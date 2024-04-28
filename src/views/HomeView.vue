<template>
  <div class="movie-count">{{ moviesCount }}</div>
  <SearchView @emit-search="handleEmitSearch($event)"></SearchView>
  <main class="main">
    <TheMovie v-show="showEvents"
      v-for="movie in movies"
      :key ="movie.id"
      :title="movie.title"
      :description="movie.description"
      :genre="movie.genre"
      :release="movie.release"
      :length="movie.length"
      :featureImage="movie.featureImage[0].url"
    />
  </main>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import SearchView from './SearchView.vue'
import type { MoviesModel } from '@/type/MoviesMode'

export default {
  components: {
    TheMovie,
    SearchView
  },
  setup() {

    const showEvents = ref<boolean | undefined>(true)
    const movies = ref<MoviesModel[]>()
    const moviesCount = ref<number>()
    const getGenre = ref<string[]>()
    const getRelease = ref<string[]>()
    const getValueFromSearch = ref<string>()

    const { result, load } = useLazyQuery(GET_MOVIE_QUERY, {
      getValueFromSearch
    })

    watch(result, val => {
      movies.value = val.entries
      getGenre.value = val.entries.map((element: MoviesModel) => element.genre.toString())
      getRelease.value = val.entries.map((element: MoviesModel) => element.release.slice(0, 10))

      console.log("Release", getRelease.value)
      console.log("Genre", getGenre.value)
      console.log(movies.value)
    })

    watch(result, val => {
      moviesCount.value = val.entryCount
    })

    onMounted(() => {
      load()
    })

    const handleEmitSearch = (val: string) => {
      getValueFromSearch.value = val
      console.log("GET VALUE", getValueFromSearch.value)
    }

    return {
      movies,
      showEvents,
      moviesCount,
      handleEmitSearch
    }
  }
}

</script>

<style scoped>
.movie-count {
  display: flex;
  justify-content: end;
  margin-right: 2rem;
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>