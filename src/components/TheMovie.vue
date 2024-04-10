<template>
    <section class="wrapper">
        <img :src="featureImage">
        <h2 class="title">
            {{ title }}
        </h2>
        <div class="description">
            {{ description }}
        </div>
        <div class="genre">
            {{ genre }}
        </div>
        <div class="release-and-length">
            <div class="release">
                Release date: {{ release }}
            </div>
            <div class="length">
                Length: {{ length }} mins
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import type { PropType } from 'vue'
// import type movieInterface from '@/type/movieInterface'

interface MovieInterface {
    title: any
    description: any
    release: any
    length: any
}

export default {
    props: {
        title: {
            type: Array,
            required: false
        },
        description: {
            type: Array,
            required: false
        },
        genre: {
            type: Array,
            required: false
        },
        release: {
            type: Array,
            required: false
        },
        length: {
            type: Array,
            required: false
        },
        featureImage: {
            type: String,
            required: false
        }
    },
    setup() {

    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    border: 0.3rem solid teal;
    max-width: 30rem; 
    padding: 1rem;
    margin: 1rem;
}

.title {
    text-align: center;
    padding: 1rem;
}

.description {
    padding-bottom: 0.5rem;
}

.release-and-length {
    display: flex;
    justify-content: space-evenly;
    padding-top: 1rem;
    text-align: center;
}
</style>