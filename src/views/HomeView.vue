<template>
  <div class="search-view">
    <SearchByTitle v-model:title="searchTitle"></SearchByTitle>
    <TheButton id="btn-search" name="Search" @click="Search()"/>
  </div>
  <div class="dropdown">
    <TheDropdown 
      labelGenre="Genre" 
      :movieGenre="filteredGenresDropdown"
      @dropdown-genre="handleDropdownGenre($event)">
    </TheDropdown>
  </div>
  <div class="wrapper-button-count">
    <div class="change-view">
      <div class="grid-view">
        <TheButton name="grid" isRadius></TheButton>
      </div>
      <div class="list-view">
        <TheButton name="list" isRadius></TheButton>
      </div>
    </div>
    <div class="button-clear">
      <TheButton name="Clear" isLarge isPointer @click="clearResult()" />
    </div>
    <div class="movie-count">
      <div>
        Movies: {{ countMovies }}
      </div>
      <div>
        Currently: {{ countCurrentMovies }}
      </div>
    </div>
  </div>

  <main class="main">
    <TheMovie v-show="isShowEvents"
      v-for="movie in allMoviesDetails"
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
import { ref, watch, computed, onMounted } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import SearchByTitle from '@/components/SearchByTitle.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import TheButton from '@/components/TheButton.vue'
import AboutView from './AboutView.vue'
import { GET_DROPDOWN_ITEMS_QUERY } from '@/query/dropdownItemsQuery'
import type { EntriesInterface } from '@/type/EntriesInterface'
import type { MovieInterface } from '@/type/MovieInterface'
import type { DropdownInterface, GenreReleaseInterface } from '@/type/DropdownInterface'

export interface QuerySearchModel {
  getMovieTitle: string | null,
  getGenreParam: string | null
}

export default {
  components: {
    TheMovie,
    SearchByTitle,
    TheDropdown,
    TheButton,
    AboutView
  },
  setup() {
    const isShowEvents = ref<boolean | undefined>(true)

    const countMovies = ref<number>()
    const countCurrentMovies = ref<number>()
    
    const allMoviesDetails = ref<MovieInterface[]>()
    
    const searchTitle = ref<string | undefined>()
    const newSearchTitle = ref<string | undefined | null>()
    
    const allGenres = ref<string[]>()
    const filteredGenresDropdown = ref()
    const selectedGenreInDropdown = ref<string | null>()

    const gridView = <boolean>(true)
    const listView = <boolean>(false)
    
    const isResults = computed(() => {
      return countCurrentMovies.value !== 0 ? '' : "No results found"
    })

    const { result: resultDropdown, load: loadDropdown } = useLazyQuery<DropdownInterface>(GET_DROPDOWN_ITEMS_QUERY)

    watch (resultDropdown, val => {
      allGenres.value = val?.entries.map((element: GenreReleaseInterface) => element.genre.toString())

      let uniqueGenres = allGenres.value?.join()
      filteredGenresDropdown.value = Array.from(new Set(uniqueGenres?.split(',')))
    })
    
    let handleDropdownGenre = (val: string) => {
      selectedGenreInDropdown.value = val
    }

    const { result: resultMovies, load: loadMovies, refetch: refetchMovies } = useLazyQuery<EntriesInterface>(GET_MOVIE_QUERY)

    watch(resultMovies, val => {
      allMoviesDetails.value = val?.entries
      countMovies.value = val?.entryCount
      countCurrentMovies.value = val?.entries.length

      console.log("All Movies ", allMoviesDetails.value)
      console.log("All Entries ", val)
    })

    const loadQueries = () => {
      const queryObj: QuerySearchModel = {
        getMovieTitle: null,
        getGenreParam: null
      } 

      if (newSearchTitle.value) {
        queryObj.getMovieTitle = newSearchTitle.value
      }

      if (selectedGenreInDropdown.value) {
        queryObj.getGenreParam = selectedGenreInDropdown.value
      }
      
      loadMovies(undefined, queryObj)
    }

    
    watch(selectedGenreInDropdown,  () => {
      loadQueries()
    })

    watch(newSearchTitle,  () => {
      loadQueries()
    })
    
    const Search = () => {
      newSearchTitle.value = searchTitle.value
      loadQueries()
    }

    const clearResult = () => {
      searchTitle.value = undefined
      newSearchTitle.value = null
      selectedGenreInDropdown.value = null
      refetchMovies()
    }

    
    onMounted(() => {
      loadQueries()
      loadDropdown()
      
      const inputSearch = document.getElementById('search-text')
      
      inputSearch?.addEventListener('keyup', (event: any) => {
        if (event.key === 'Enter') {
          console.log("Pressed ", event.key)
          Search()
        }
      })
    })

    return {
      allMoviesDetails,
      isShowEvents,
      countMovies,
      searchTitle,
      Search,
      clearResult,
      handleDropdownGenre,
      filteredGenresDropdown,
      countCurrentMovies,
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
}
.change-view {
  grid-column-start: 1;
  display: flex;
  align-items: end;
  margin-left: 1.5rem;
}
.button-clear {
  grid-column-start: 2;
  display: grid;
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