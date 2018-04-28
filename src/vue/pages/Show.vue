<template>
    <main>
        <section class="bg-brand-dark text-white">
            <div class="container mx-auto p-8">
                <div class="flex flex-wrap items-center justify-center md:-m-4">
                    <div class="p-4 w-full md:w-1/2 lg:w-1/4 flex justify-center">
                        <div class="overflow-hidden rounded-lg w-full">
                            <img :src="movie.image" :alt="movie.name" class="image">
                        </div>
                    </div>
                    <div class="p-4 w-full md:w-1/2 lg:w-1/2 flex flex-col justify-between">
                        <h1 class="mb-4">
                            <span class="text-4xl font-semibold">{{ movie.name }}</span>
                            <span class="font-normal text-3xl text-white-40">({{ year }})</span>
                        </h1>
                        <div class="mb-4 flex">
                            <!-- REVIEW -->
                            <progress-circle :value="reviews" class="relative z-0 h-14 w-14 mr-4"></progress-circle>
                            <!-- EDIT -->
                            <router-link tag="button" :to="{ name: 'edit', params: { id: movie.id } }" class="h-14 w-14 inline-block rounded-full border border-white hover:border-brand-secondary text-white hover:text-brand-secondary mr-4">
                                <i class="far fa-edit"></i>
                            </router-link>
                            <!-- DELETE -->
                            <button class="h-14 w-14 rounded-full border border-white hover:border-red-light text-white hover:text-red-light mr-4" @click="destroyModal = true">
                                <i class="far fa-trash-alt"></i>
                            </button>
                            <!-- REVIEW -->
                            <button class="h-14 w-14 rounded-full border border-white hover:border-yellow-dark text-white hover:text-yellow-dark" @click="reviewModal = true">
                                <i class="far fa-star"></i>
                            </button>
                        </div>
                        <div class="mb-4">
                            <h3 class="font-normal text-xl mb-2">Synopsis</h3>
                            <p class="text-white-80">{{ movie.synopsis }}</p>
                        </div>
                        <div class="flex">
                            <div>
                                <h3 class="font-normal text-lg mb-1">Réalisateur</h3>
                                <p class="text-white-80">{{ movie.director.fullname }}</p>
                            </div>
                            <div class="ml-8">
                                <h3 class="font-normal text-lg mb-1">{{ movie.categories.length > 1 ? 'Genres' : 'Genre'}}</h3>
                                <p class="text-white-80">{{ movie.categories.join(', ') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- FEATURED MOVIES -->
        <section v-show="featured.length">
            <div class="container mx-auto p-8">
                <div class="flex justify-between mb-8">
                    <h3 class="text-2xl font-semibold">Films susceptible de vous intéresser</h3>
                </div>
                <div class="flex flex-wrap md:-m-4">
                    <div class="w-full md:w-1/2 p-2 md:p-4" v-for="movie in featured" :key="movie.id">
                        <movie-item :movie="movie"/>
                    </div>
                </div>
            </div>
        </section>
        <!-- DELETE MODAL -->
        <modal :closeable="false" @close="closeDestroy" v-show="destroyModal">
            <div class="p-6 rounded bg-white">
                <p class="mb-4 text-lg tracking-wide text-semi-bold uppercase text-grey-dark">Confirmation</p>
                <p class="mb-4 text-grey-darkest">Êtes vous sûr de vouloir supprimer le film <b>{{ movie.name }}</b> ?</p>
                <div class="flex justify-end">
                    <button class="px-4 py-2 mr-4 rounded bg-grey-lightest text-grey-darker hover:bg-grey-lighter active:bg-grey-light" @click="closeDestroy">
                        Annuler
                    </button>
                    <button class="px-4 py-2 rounded bg-red hover:bg-red-dark active:bg-red-darker text-white-80" @click="submitDestroy">
                        <span class="mr-2">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                        <span>Confirmer</span>
                    </button>
                </div>
            </div>
        </modal>
        <!-- REVIEW MODAL -->
        <modal :dismissable="true" @close="closeReview" v-show="reviewModal">
            <div class="p-6 rounded bg-white">
                <p class="mb-4 text-lg tracking-wide text-semi-bold uppercase text-grey-dark">Notation</p>
                <p class="text-grey-darker text-sm">Choisissez la note en cliquant sur l'une des étoiles</p>
                <review v-model="stars" class="mb-4"/>
                <div class="flex justify-end">
                    <button class="button is-secondary mr-4" @click="closeReview">
                        Annuler
                    </button>
                    <button class="button is-success" @click="submitReview">
                        <span class="mr-2">
                            <i class="fas fa-check"></i>
                        </span>
                        <span>Confirmer</span>
                    </button>
                </div>
            </div>
        </modal>
    </main>
</template>

<script>
    import Vuex from 'vuex'
    import moment from 'moment'
    import MovieItem from '../components/MovieItem.vue'
    import Modal from '../components/Modal.vue'
    import Review from '../components/Review.vue'
    import ProgressCircle from '../components/ProgressCircle.vue'

    export default {
        components: { MovieItem, Modal, Review, ProgressCircle },
        props: ['id'],
        data () {
            return {
                destroyModal: false,
                reviewModal: false,
                stars: 0
            }
        },
        computed: {
            ...Vuex.mapGetters(['movies']),

            /**
             * Returns the current movie
             * @returns {movie} - Movie object
             */
            movie () {
                return this.movies.find(movie => movie.id == this.id)
            },

            /**
             * List of movies matching one of the current one categorie's
             * @returns [{movie}*] - Movie object collection
             */
            featured () {
                return this.movies.filter(movie => {
                    if (this.movie.id === movie.id) return false

                    for (let category of movie.categories) {
                        if (this.movie.categories.includes(category)) {
                            return true
                        }
                    }

                    return false
                })
            },

            /**
             * Movie year release
             * @returns {number}
             */
            year () {
                return moment(this.movie.date).year()
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
        },
        methods: {
            ...Vuex.mapActions(['update', 'destroy']),

            /**
             * Deletes the movie
             * @param event - DOM event
             */
            submitDestroy (event = null) {
                this.destroy(this.movie)
                this.$router.push({ name: 'index' })
            },

            /**
             * Closes the destroy modal
             * @param event - DOM event
             */
            closeDestroy (event = null) {
                this.destroyModal = false
            },

            /**
             * Submits the movie review
             * @param event - DOM event
             */
            submitReview (event = null) {
                this.update({
                    ...this.movie,
                    reviews: [
                        ...this.movie.reviews,
                        this.stars
                    ]
                }).then(this.closeReview)
            },

            /**
             * Closes the review modal
             * @param event - DOM event
             */
            closeReview (event = null) {
                this.reviewModal = false
                this.stars = 0
            }
        }
    }
</script>