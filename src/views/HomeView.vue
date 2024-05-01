<template>
  <div class="search-view">
    <SearchByTitle v-model:title="searchValue"></SearchByTitle>
    <TheButton button="Search" isPointer @click="Search()"/>
  </div>
  <div class="dropdown">
    <TheDropdown 
      labelGenre="Genre" 
      labelRelease="Date" 
      :movieGenre="genreInDropdown" 
      :movieRelease="getRelease" 
      @dropdown-genre="handleDropdownGenre($event)">
    </TheDropdown>
  </div>
  <div class="wrapper-button-count">
    <div class="button-clear">
      <TheButton button="Clear" isLarge isPointer @click="clearResult()" />
    </div>
    <div class="movie-count">
      <div>
        Movies: {{ moviesCount }}
      </div>
      <div>
        Currently: {{ moviesShowingCount }}
      </div>
    </div>
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
  <h1>{{ isResults }}</h1>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted, provide } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import type { MoviesModel } from '@/type/MoviesMode'
import SearchByTitle from '@/components/SearchByTitle.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import TheButton from '@/components/TheButton.vue'
import AboutView from './AboutView.vue'
import { GET_GENRE_QUERY } from '@/query/genreQuery'

export default {
  components: {
    TheMovie,
    SearchByTitle,
    TheDropdown,
    TheButton,
    AboutView
  },
  setup() {

    const showEvents = ref<boolean | undefined>(true)

    const moviesCount = ref<number>()
    const moviesShowingCount = ref<number>()
    
    const movies = ref<MoviesModel[]>()
    const getGenre = ref<string[]>()
    const getRelease = ref<string[]>()
    const getValueFromSearch = ref<string>()
    const dropdownGenre = ref<string>()

    const moviesGenre = ref<string[]>()
    const genre = ref<string>()

    const searchValue = ref<string>('')

    const genreInDropdown = ref()

    const { result, load, refetch } = useLazyQuery(GET_MOVIE_QUERY, {
      getValueFromSearch,
      dropdownGenre
    })

    watch(result, val => {
      movies.value = val.entries
      moviesCount.value = val.entryCount
      moviesShowingCount.value = val.entries.length

      console.log(val)
    })

    const isResults = computed(() => {
      return moviesShowingCount.value !== 0 ? '' : "No results found"
    })

    const { result: resultGenre, load: loadGenre } = useLazyQuery(GET_GENRE_QUERY, {
      genre
    })

    watch (resultGenre, val => {
      moviesGenre.value = val.entries.map((element: MoviesModel) => element.genre.toString())
      getRelease.value = val.entries.map((element: MoviesModel) => element.release.slice(0, 4))

      let unique = moviesGenre.value?.join()
      unique = Array.from(new Set(unique?.split(','))).toString()
      genreInDropdown.value = unique.split(',')
    })

    const Search = () => {
      getValueFromSearch.value = searchValue.value
    }
    
    const clearResult = () => {
      searchValue.value = ''
      refetch()
    }

    const handleDropdownGenre = (val: string) => {
      dropdownGenre.value = val
    }

    onMounted(() => {
      load()
      loadGenre()
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
      handleDropdownGenre,
      genreInDropdown,
      moviesShowingCount,
      isResults
    }
  }
}

</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.search-view {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.wrapper-button-count {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
.button-clear {
  grid-column-start: 2;
  display: flex;
  justify-content: center;
  margin: 1rem 0 1rem 0;
}
.movie-count {
  grid-column-start: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 2rem 1rem 0;
}
.dropdown {
  display: flex;
  justify-content: center;
}
</style>