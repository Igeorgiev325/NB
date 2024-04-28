<template>
  <button :class="{
    'larger-button': isLarge,
    'pointer-button': isPointer
  }" @click="changeButtonValue()" type="button">
    {{ button }}
  </button>
</template>

<script lang="ts">
import { ref, computed, watch }  from 'vue'

export default {
  props: {
    button: {
      type: String,
      default: 'Push'
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    isPointer: {
      type: Boolean,
      default: false
    }
  },
  emits: ["isButton"],
  setup(props, { emit }) {
    let buttonValue = ref<boolean>(false)

    const changeButtonValue = () => buttonValue.value = !buttonValue.value  

    watch(buttonValue, (val) => {
        emit("isButton", val)
    })

    return {
        buttonValue,
        changeButtonValue
    }
  }
}
</script>

<style scoped>
.larger-button {
  padding: 0.5rem 1.5rem;
}

.pointer-button {
  cursor: pointer;
}

</style>