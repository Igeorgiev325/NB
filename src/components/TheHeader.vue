<template>
 <header>
    <div class="wrapper">
      <nav class="flex">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/movie">Movie</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default {
    components: {
        RouterLink,
        RouterView
    },
    setup() {

    }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20rem;
  padding: 0.5rem 1rem 0;
}

a {
  color: teal;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
}

.router-link-active {
  text-decoration: overline white solid 0.1rem; 
}

</style>

