<template>
  <div class="search-view">
    <SearchByTitle v-model:title="searchValue"></SearchByTitle>
    <TheButton button="Search" @click="Search()"/>
  </div>
  <div class="button-clear">
    <TheButton button="Clear" @emit-value="handleEmitValue($event)" />
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import SearchByTitle from '@/components/SearchByTitle.vue';
import TheButton from '@/components/TheButton.vue';
import TheDropdown from '@/components/TheDropdown.vue';

export interface moviesModel {
  title: string,
  description: string,
  genre: string[],
  release: string,
  length: number,
  featureImage: featureImageModel[]
}

export interface featureImageModel {
  id: string,
  title: string,
  url: string
}

export default {
  components: {
    SearchByTitle,
    TheDropdown,
    TheButton
  },
  setup(props, { emit }) {

    const searchValue = ref<string>()
    const writtenValue = ref<string>()

    const movies = ref<any>()

    const valueFromEmit = ref<boolean>()

    let getGenre = ref<string[]>()

    const { result } = useLazyQuery(GET_MOVIE_QUERY)

    // const movies = computed(() => result.value?.moviesEntries)

    watch(result, val => {
      movies.value = val.moviesEntries
      getGenre.value = val.moviesEntries.map((e: any) => e.genre)

      emit('emit-movies', movies)
      console.log("Genre", getGenre.value)
      console.log(movies.value)
    })

    const returnTitle = computed(() => movies.value?.map((e: any) => e.title))
    watch(returnTitle, newReturnTitle => {
      console.log("Titles:", newReturnTitle)
    })
    const matchSearch = computed(() => returnTitle.value?.includes((writtenValue.value as string)))
    watch(matchSearch, newMatchSearch => {
      console.log("Is there match:", matchSearch.value)
    })

    const Search = () => {
      writtenValue.value = searchValue.value
      console.log("Written in input:", writtenValue.value)
    }

    const handleEmitValue = (val: boolean) => {
      valueFromEmit.value = val
    }

    watch(valueFromEmit, newValueFromEmit => {
      if (newValueFromEmit) {
        clearQuery()
      }
    })
    
    const clearQuery = () => {
      searchValue.value = ''
    }

    return {
      searchValue,
      Search,
      handleEmitValue
    }
  }
}
</script>

<style scoped>
.search-view {
  display: flex;
  justify-content: center;
}
.button-clear {
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0;
}
</style>