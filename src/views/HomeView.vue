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
      :featureImage="movie.featureImage[0]?.url"
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

    const movies = computed(() => result.value?.moviesEntries)

    const moviesCount = computed(() => result.value?.entryCount)

    watch(moviesCount, val => console.log("moviesCount", val))

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