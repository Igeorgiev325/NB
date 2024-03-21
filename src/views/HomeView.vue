<template>
  <main>
   
  </main>
  <div>
    {{ title }}
    {{ id }}
  </div>
  <div>
    {{ result }}
  </div>
  <img :src="pic.img">
  <div>{{ pic.img }}</div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import { onMounted } from 'vue'

export default {
  setup() {

   const { result, refetch } = useQuery( GET_MOVIE_QUERY)
    
    let title = result.value?.moviesEntries.map((e: any) => e.title) || []
    let id = result.value?.moviesEntries.map((e: any) => e.id) || []
    let pic = result.value?.moviesEntries.map((e: any) => e.url) || []
    
    console.log("..................", result.value)
    
    onMounted(async () => {
      await refetch()
    })
    
    //console.log("Title: ", title.value)

    return {
      title,
      id,
      result,
      pic
    }
  }
}

</script>