<template>
  <label for="length-select">{{ genre }}</label>
  <select id="length-select">
    <option>Dog</option>
  </select>
  <label for="date-select">{{ date }}</label>
  <select id="date-select">
    <option>Cat</option>
  </select>
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
    }
  },
  setup() {
    
    return {

    }
  }
}
</script>
