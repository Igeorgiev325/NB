<template>
  <main>
    <TheMovie
      :title="title" 
      :description="description" 
      :release="release"
      :length="length"
    />
  </main>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import TheMovie from '@/components/TheMovie.vue'

export default {
  components: {
    TheMovie
  },
  setup() {

   const { result } = useQuery( GET_MOVIE_QUERY)
    
    const title = result.value?.moviesEntries.map((e: any) => e.title)
    const description = result.value?.moviesEntries.map((e: any) => e.description)
    const release = result.value?.moviesEntries.map((e: any) => e.release)
    const length = result.value?.moviesEntries.map((e: any) => e.length)
    const pic = result.value?.moviesEntries.map((e: any) => e.url)
    
    console.log("..................", result.value)
    
    //console.log("Title: ", title.value)

    return {
      result,
      title,
      description,
      pic,
      release,
      length
    }
  }
}

</script>