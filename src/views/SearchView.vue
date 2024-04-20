<template>
  <div class="search-view">
    <SearchByTitle v-model:title="searchValue"></SearchByTitle>
    <TheButton button="Search" @click="Search()"/>
  </div>
  <div class="dropdown">
    <TheDropdown genre="Genre" date="Date"></TheDropdown>
  </div>
  <div class="button-clear">
    <TheButton button="Clear" @is-button="handleEmitValue($event)" />
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { GET_MOVIE_QUERY } from '@/query/movieQuery'
import SearchByTitle from '@/components/SearchByTitle.vue';
import TheButton from '@/components/TheButton.vue';
import TheDropdown from '@/components/TheDropdown.vue';

export default {
  components: {
    SearchByTitle,
    TheDropdown,
    TheButton
  },
  setup() {

    const searchValue = ref<string>()
    const writtenValue = ref<string>()

    const isTrue = ref<boolean>()

    // const returnTitle = computed(() => movies.value?.map((e: any) => e.title))

    // watch(returnTitle, newReturnTitle => {
    //   console.log("Titles:", newReturnTitle)
    // })

    // const matchSearch = computed(() => returnTitle.value?.includes((writtenValue.value as string)))

    // watch(matchSearch, newMatchSearch => {
    //   console.log("Is there match:", matchSearch.value)
    // })

    const Search = () => {
      writtenValue.value = searchValue.value
      console.log("Written in input:", writtenValue.value)
    }

    const handleEmitValue = (val: boolean) => {
      isTrue.value = val
    }

    watch(isTrue, newIsTrue => {
      if (newIsTrue) {
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
.dropdown {
  display: flex;
  justify-content: center;
}
</style>