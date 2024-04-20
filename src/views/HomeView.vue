<template>
  <div class="movie-count">{{ moviesCount }}</div>
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
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'
import TheButton from '@/components/TheButton.vue'
import SearchByTitle from '@/components/SearchByTitle.vue'
import { GET_MOVIE_IMAGE } from '@/query/imageQuery'

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
    TheMovie,
    TheButton,
    SearchByTitle
  },
  setup() {

    const showEvents = ref<boolean | undefined>(true)
    const movies = ref<moviesModel[]>()
    const moviesCount = ref<number>()
    let getGenre = ref<string[]>()

    const { result, load } = useLazyQuery(GET_MOVIE_QUERY)

    // const movies = computed(() => result.value?.moviesEntries)

    watch(result, val => {
      movies.value = val.moviesEntries
      getGenre.value = val.moviesEntries.map((e: any) => e.genre)

      
      console.log("Genre", getGenre.value)
      console.log(movies.value)
    })

    watch(result, val => {
      moviesCount.value = val.entryCount
      console.log("moviesCount", moviesCount.value)
    })

    onMounted(() => {
      load()
    })

    return {
      movies,
      showEvents,
      moviesCount
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