<template>
  <input
    class="search-text" 
    type="text" 
    placeholder="Search by title" 
    :value="title"
    @input="$emit('update:title', ($event.target as HTMLTextAreaElement).value)"
  >
</template>

<script lang="ts">

export default {
  props: {
    title: String
  },
  emits: ['update:title'],
  setup() {

  }
}

</script>

<style scoped>
.search-text {
  width: 30rem;
}
</style>