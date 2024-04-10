<template>
    <button class="button-style" @click="changeButtonValue()" type="button">
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
        }
    },
    emits: ["emitValue"],
    setup(props, { emit }) {
        let buttonValue = ref<boolean>(false)

        const changeButtonValue = () => buttonValue.value = !buttonValue.value
        

        watch(buttonValue, (val) => {
            emit("emitValue", val)
        })
        return {
            buttonValue,
            changeButtonValue
        }
    }
}
</script>

<style scoped>

</style>