<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  
  <div v-for="movie in getResult" :key="movie.id">
    {{ movie.title }}
  </div>
</template>

<script lang="ts">
import { GET_SPECIFIC_MOVIE } from '@/query/specificMoviesQuery';
import { useLazyQuery } from '@vue/apollo-composable'
import { computed, watch, ref, onMounted } from 'vue'


export default {
  components: {
  },
  setup() {
    const getResult = ref<any>()

    // const genre = ref<string>('drama')
    // const section = ref<string[]>(['Movies', 'Books'])

    const { result, load } = useLazyQuery(GET_SPECIFIC_MOVIE, {
      // genre, 
      // section
    })

    watch(result, value => {
      getResult.value = value.entries

    })

    onMounted(() => {
      load()
    })

    return {
      getResult,
    }
  }
}
</script>

<style>

</style>
