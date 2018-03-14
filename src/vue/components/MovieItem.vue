<template>
    <div class="flex flex-wrap shadow hover:shadow-md">
        <div class="w-full sm:w-1/2 lg:w-1/3 bg-grey-darkest">
            <router-link :to="{ name: 'show', params: { id: movie.id } }">
                <img :src="movie.image" :alt="movie.name" class="image">
            </router-link>
        </div>
        <div class="w-full sm:w-1/2 lg:w-2/3 bg-white flex flex-col">
            <div class="p-4">
                <p class="text-black font-semibold text-lg">{{ movie.name }}</p>
                <p class="text-grey-darker mb-4">{{ release }}</p>
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
    moment.locale('fr')

    export default {
        name: 'MovieItem',
        props: {
            movie: {
                required: true,
                type: Object
            }
        },
        computed: {
            short_synopsis () {
                return this.movie.synopsis.split(" ").slice(0, 12).join(' ') + '...'
            },

            release () {
                return moment(this.movie.date).format('DD MMMM YYYY')
            }
        }
    }
</script>