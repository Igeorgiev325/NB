<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" placeholder="Enter Pokemon name" v-model="pokemonName">
    <TheButton button="Fetch" @click=fetchData()></TheButton>
    <div>
      <img :class="{ 'hide-element': !isSprite }" :src="pokemonSprite" alt="Pokomon Sprite">
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import TheButton from '@/components/TheButton.vue'

export default {
  components: {
    TheButton
  },
  setup() {
    const pokemonName = ref<string>()
    const pokemonSprite = ref()
    
    const lowerCasePokemon = computed(() => {
      return pokemonName.value?.toLowerCase()
    })
    
    const isSprite = computed(() => {
      return pokemonSprite.value ? true : false
    })
    
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon.value}`)
        if(!response.ok) {
          throw new Error("Could not fetch resource")
        }
        const data = await response.json()
        pokemonSprite.value = data.sprites.front_default
        console.log(data.name)
        
      }
      catch(error) {
        console.error(error)
      }
    }

    // fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    // .then(response => {
    //   if(!response.ok) {
    //     throw new Error("Could not fetch resource")
    //   }
    //   return response.json()
    // })
    // .then(data => console.log(data.name))
    // .catch(error => console.error(error))
    
    return {
      pokemonName,
      pokemonSprite,
      isSprite,
      fetchData
    }
  }
}
</script>

<style>
.hide-element {
  display: none;
}
</style>
