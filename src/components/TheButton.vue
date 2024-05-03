<template>
  <button :class="{
    'larger-button': isLarge,
    'pointer-button': isPointer
  }" type="button">
    {{ button }}
  </button>
</template>

<script lang="ts">

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
  setup() {

    return {
    }
  }
}
</script>

<style scoped>
.larger-button {
  padding: 0.5rem 1.5rem;
}

.pointer-button {
  cursor: cell;
}

</style>