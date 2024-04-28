<template>
  <div class="component">
    <div class="genre-dropdown">
      <label for="length-select">{{ genre }}</label>
      <select id="length-select">
        <option v-for="genre in movieGenre">{{ genre }}</option>
      </select>
    </div>
    <div class="date-dropdown">
      <label for="date-select">{{ date }}</label>
      <select id="date-select">
        <option v-for="release in movieRelease">{{ release }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
export default {
  props: {
    genre: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    movieGenre: {
      required: false
    },
    movieRelease: {
      required: false
    }
  },
  setup() {
    
    return {
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
.date-dropdown {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 5rem;
}
</style>
