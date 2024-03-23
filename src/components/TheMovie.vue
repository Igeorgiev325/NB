<template>
    <section class="wrapper">
        <h2 class="title">
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
            type: Array,
            required: false
        },
        description: {
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
        }
    },
    setup() {

    }
}
</script>

<style scoped>
.wrapper {
    border: 0.3rem solid green;
    width: fit-content;
    padding: 1rem;
    margin: 1rem;
}

.title {
    text-align: center;
}
</style>