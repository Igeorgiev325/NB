<template>
  <div class="component">
    <div class="genre-dropdown">
      <label for="length-select">{{ genre }}</label>
      <select id="length-select">
        <option>{{ selectGenre }}</option>
      </select>
    </div>
    <div class="date-dropdown">
      <label for="date-select">{{ date }}</label>
      <select id="date-select">
        <option>{{ selectDate }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
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
    selectGenre: {
      type: String,
      required: false,
      default: 'Genre'
    },
    selectDate: {
      type: String,
      required: false,
      default: 'Date'
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
