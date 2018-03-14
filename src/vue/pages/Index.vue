<template>
    <section>
        <div class="container mx-auto p-8">
            <div class="flex justify-between mb-8">
                <h3 class="text-2xl font-semibold">Découvrez de nouveaux films et de nouvelles séries</h3>
            </div>
            <div class="flex flex-wrap md:-m-4">
                <div class="w-full md:w-1/2 p-2 md:p-4" v-for="movie in movies" :key="movie.id">
                    <movie-item :movie="movie"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vuex from 'vuex'
    import MovieItem from '../components/MovieItem.vue'

    export default {
        components: { MovieItem },
        computed: {
            ...Vuex.mapGetters(['movies'])
        }
    }
</script>