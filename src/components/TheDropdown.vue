<template>
  <div class="component">
    <div class="genre-dropdown">
      <label for="length-select">{{ labelGenre }}</label>
      <select v-model="selectedGenre" id="length-select">
        <option v-for="genre in movieGenre">{{ genre }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
export default {
  props: {
    labelGenre: {
      type: String,
      required: true
    },
    movieGenre: {
      required: false
    },
  },
  setup(props, { emit }) {
    const selectedGenre = ref()
    
    watch(selectedGenre, newSelectedGenre => {
      emit('dropdownGenre', newSelectedGenre)
      console.log("SELECTED", newSelectedGenre)
    })

    return {
      selectedGenre
    }
  }
}
</script>

<style>
.component {
  display: flex;
  gap: 1rem;
}
.genre-dropdown {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 5rem;
}
</style>
