<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" placeholder="Enter Pokemon name" v-model="pokemonSearch">
    <TheButton name="Fetch sprite" @click=fetchSprite()></TheButton>
    <TheButton name="Fetch names" @click="fetchNames()"></TheButton>
    <div :class="{ 'border-for-sprite': isSprite }">
      <img :class="{ 'hide-element': !isSprite }" :src="pokemonSprite" alt="Pokomon Sprite">
    </div>
    <div>
      {{ pokemonName }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import TheButton from '@/components/TheButton.vue'

interface PokemonDataInterface {
  name: string,
  url: string
}

interface PokemonInterface {
  count: number,
  next: string,
  previous: null,
  results: PokemonDataInterface[]
}

export default {
  components: {
    TheButton
  },
  setup() {
    const pokemonSearch = ref<string>()
    const pokemonSprite = ref<string>()
    const pokemonName = ref<string>()
    
    const lowerCasePokemon = computed(() => {
      return pokemonSearch.value?.toLowerCase().trim()
    })
    
    const isSprite = computed(() => {
      return pokemonSprite.value ? true : false
    })
    
    const fetchSprite = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon.value}`)
        if(!response.ok) {
          throw new Error("Could not fetch resource")
        }
        const data = await response.json()
        pokemonSprite.value = data.sprites.front_default
        
      }
      catch(error) {
        console.error(error)
      }
    }

    const fetchNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
        if(response.ok) {
          const data: PokemonInterface = await response.json()
          pokemonName.value = data.results.map((element: PokemonDataInterface) => element.name).join(' ')
          console.log(pokemonName.value)
        } else {
          throw new Error("Could not fetch resource")
        }
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
      pokemonSearch,
      pokemonName,
      pokemonSprite,
      isSprite,
      fetchSprite,
      fetchNames
    }
  }
}
</script>

<style>
.border-for-sprite {
  border: 0.5rem solid green;
  width: fit-content;
}
.hide-element {
  display: none;
}
</style>
