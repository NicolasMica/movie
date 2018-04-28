<template>
    <div class="flex flex-wrap shadow hover:shadow-md">
        <div class="w-full sm:w-1/2 lg:w-1/3 bg-grey-darkest">
            <router-link :to="{ name: 'show', params: { id: movie.id } }">
                <img :src="movie.image" :alt="movie.name" class="image">
            </router-link>
        </div>
        <div class="w-full sm:w-1/2 lg:w-2/3 bg-white flex flex-col">
            <div class="p-4">
                <div class="flex">
                    <div>
                        <progress-circle :value="reviews" :options="{ trailColor: '#f1f5f8' }" class="relative z-0 h-10 w-10 mr-4"></progress-circle>
                    </div>
                    <div>
                        <p class="text-black font-semibold text-lg">{{ movie.name }}</p>
                        <p class="text-grey-darker mb-4">{{ release }}</p>
                    </div>
                </div>
                <p class="text-grey-darkest">{{ short_synopsis }}</p>
            </div>
            <div class="mt-auto border-t border-grey-light">
                <router-link :to="{ name: 'show', params: { id: movie.id } }" class="p-4 inline-block no-underline text-black">Plus d'informations</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import 'moment/locale/fr'
    import ProgressCircle from './ProgressCircle.vue'
    moment.locale('fr')

    export default {
        name: 'MovieItem',
        components: { ProgressCircle },
        props: {
            movie: {
                required: true,
                type: Object
            }
        },
        computed: {
            /**
             * Movie shortten synopsis
             * @returns {string}
             */
            short_synopsis () {
                return this.movie.synopsis.split(" ").slice(0, 12).join(' ') + '...'
            },

            /**
             * Movie release date
             * @returns {string}
             */
            release () {
                return moment(this.movie.date).format('DD MMMM YYYY')
            },

            /**
             * Movie reviews avg
             * @returns {number}
             */
            reviews () {
                if (this.movie === undefined || this.movie.reviews.length === 0) return 0
                let sum = this.movie.reviews.reduce((a, b) => a + b, 0)

                return Math.round(sum / this.movie.reviews.length)
            }
        }
    }
</script>