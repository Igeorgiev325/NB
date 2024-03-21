<template>
    <section class="wrapper">
        <h2>
            {{ title }}
        </h2>
        <div>
            {{ description }}
        </div>
        <div>
            {{ release }}
        </div>
        <div>
            {{ length }}
        </div>
    </section>
</template>

<script lang="ts">

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: "Title"
        },
        description: {
            type: String,
            required: false,
            default: "..."
        },
        release: {
            type: Number,
            required: false,
            default: 1999
        },
        length: {
            type: Number,
            required: false,
            default: 0
        }
    },
    setup() {

    }
}
</script>

<style scoped>
.wrapper {
    border: 0.5rem solid green;
    width: fit-content;
    padding: 1rem;
    margin: 1rem;
}
</style>