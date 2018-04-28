<template>
    <button class="h-14 w-14 rounded-full border border-white hover:border-yellow-dark text-white hover:text-yellow-dark" @click="showModal = true">
        <i class="far fa-star"></i>
        <portal to="modal" v-if="showModal">
            <!-- REVIEW MODAL -->
            <modal :dismissable="true" @close="closeModal" v-show="showModal">
                <div class="p-6 rounded bg-white">
                    <p class="mb-4 text-lg tracking-wide text-semi-bold uppercase text-grey-dark">Notation</p>
                    <p class="text-grey-darker text-sm">Choisissez la note en cliquant sur l'une des étoiles</p>
                    <review v-model="stars" class="mb-4"/>
                    <div class="flex justify-end">
                        <button class="button is-secondary mr-4" @click="closeModal">
                            Annuler
                        </button>
                        <button class="button is-success" @click="submitModal">
                            <span class="mr-2">
                                <i class="fas fa-check"></i>
                            </span>
                            <span>Confirmer</span>
                        </button>
                    </div>
                </div>
            </modal>
        </portal>
    </button>
</template>

<script>
    import Vuex from 'vuex'
    import Modal from './Modal.vue'
    import Review from './Review.vue'

    export default {
        components: { Modal, Review },
        props: ['movie'],
        data () {
            return {
                showModal: false,
                stars: 0
            }
        },
        methods: {
            ...Vuex.mapActions(['update']),

            /**
             * Submits the movie review
             * @param event - DOM event
             */
            submitModal (event = null) {
                this.update({
                    ...this.movie,
                    reviews: [
                        ...this.movie.reviews,
                        this.stars
                    ]
                }).then(this.closeModal)
            },

            /**
             * Closes the review modal
             * @param event - DOM event
             */
            closeModal (event = null) {
                this.showModal = false
                this.stars = 0
            }
        }
    }
</script>
