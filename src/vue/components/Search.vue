<template>
    <section class="bg-white border-b border-grey-light">
        <div class="container mx-auto relative px-8 group relative">
            <!-- INPUT -->
            <label>
                    <span class="absolute pin-y pin-l ml-4 p-4 text-lg text-grey-dark group-hover:text-grey-darkest">
                        <i class="fas fa-search"></i>
                    </span>
                <input type="search"
                       name="search"
                       placeholder="Rechercher un film, une série, un artiste"
                       class="appearance-none p-4 pl-8 w-full text-lg text-grey-darkest"
                       v-model="query">
            </label>
            <!-- RESULTS -->
            <div class="absolute pin-x z-20" :class="{ hidden: !isSearching }">
                <div class="p-4 w-full bg-white border-b border-l border-r border-grey shadow">
                    <ul class="list-reset">
                        <li v-for="movie in items" :key="movie.id" class="p-4 hover:bg-grey-lighter cursor-pointer" @click.prevent="routeTo(movie.id)">
                            <p class="text-black font-semibold text-lg">
                                <span>{{ movie.name }}</span>
                                <span class="text-grey">({{ movie.date.substr(0, 4) }})</span>
                            </p>
                            <p class="text-grey-darker">{{ movie.director.fullname }}</p>
                        </li>
                        <li v-show="items.length < 1" class="p-4">
                            <p class="text-grey-darker">Aucun résultat ne correspond à cette recherche</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vuex from 'vuex'
    import Fuse from 'fuse.js'

    export default {
        name: 'Search',
        props: {
            min: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                query: '',
                fuse: null
            }
        },
        watch: {
            movies (value) {
                if (this.fuse === null && value.length > 0) {
                    this.setup()
                }
            }
        },
        computed: {
            ...Vuex.mapGetters(['movies']),

            /**
             * Returns the search result set
             * @returns [] - Array of movie objects
             */
            items () {
                if (this.fuse === null) return []

                return this.fuse.search(this.query)
            },

            /**
             * Determines whether the search is currently active
             * @returns boolean
             */
            isSearching () {
                return this.query.length >= this.min
            }
        },
        methods: {
            /**
             * Initialize the Fuse search engine
             * @param options - Fuse option object
             */
            initialize (options = {}) {
                this.fuse = new Fuse(this.movies, {
                    shouldSort: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [],
                    ...options
                })
            },

            /**
             * Setup the search component
             */
            setup () {
                let keys = []
                let movie = { ...this.movies[0] }

                for (let key in movie.director) {
                    keys.push('director.' + key)
                }

                delete movie['director']
                keys = [ ...Object.keys(movie), ...keys ]

                this.initialize({ keys })
            },

            routeTo (id) {
                this.query = ''

                return this.$router.push({
                    name: 'show',
                    params: { id }
                })
            }
        }
    }
</script>