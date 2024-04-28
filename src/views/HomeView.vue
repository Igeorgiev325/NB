<template>
  <div class="movie-count">{{ moviesCount }}</div>
  
  <div class="search-view">
    <SearchByTitle v-model:title="searchValue"></SearchByTitle>
    <TheButton button="Search" isPointer @click="Search()"/>
  </div>
  <div class="dropdown">
    <TheDropdown genre="Genre" date="Date" :movieGenre="arr" :movieRelease="getRelease"></TheDropdown>
  </div>
  <div class="button-clear">
    <TheButton button="Clear" isLarge isPointer @click="clearResult()" />
  </div>

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
import { ref, watch, computed, onMounted, provide } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import type { MoviesModel } from '@/type/MoviesMode'
import SearchByTitle from '@/components/SearchByTitle.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import TheButton from '@/components/TheButton.vue'

export default {
  components: {
    TheMovie,
    SearchByTitle,
    TheDropdown,
    TheButton
  },
  setup() {

    const showEvents = ref<boolean | undefined>(true)

    const movies = ref<MoviesModel[]>()
    const moviesCount = ref<number>()
    const getGenre = ref<string[]>()
    const getRelease = ref<string[]>()
    const getValueFromSearch = ref<string>()

    const searchValue = ref<string>('')

    let arr = ref()

    const { result, load, refetch } = useLazyQuery(GET_MOVIE_QUERY, {
      getValueFromSearch
    })

    watch(result, val => {
      movies.value = val.entries
      getGenre.value = val.entries.map((element: MoviesModel) => element.genre.toString())
      getRelease.value = val.entries.map((element: MoviesModel) => element.release.slice(0, 4))

      let unique = getGenre.value?.join()
      unique = Array.from(new Set(unique?.split(','))).toString()
      arr.value = unique.split(',')
      console.log("arr", arr)
      console.log("Unique", unique)
      console.log("Release", getRelease.value)
      console.log("Genre", getGenre.value)
      console.log(movies.value)
    })

    const Search = () => {
      getValueFromSearch.value = searchValue.value

      console.log("search value", searchValue.value)
      console.log("get value from search", getValueFromSearch.value)
    }
    
    const clearResult = () => {
      searchValue.value = ''
      refetch()
    }

    watch(result, val => {
      moviesCount.value = val.entryCount
    })

    onMounted(() => {
      load()
    })

    return {
      movies,
      showEvents,
      moviesCount,
      searchValue,
      Search,
      clearResult,
      getGenre,
      getRelease,
      arr
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
.search-view {
  display: flex;
  justify-content: center;
}
.button-clear {
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0;
}
.dropdown {
  display: flex;
  justify-content: center;
}
</style>