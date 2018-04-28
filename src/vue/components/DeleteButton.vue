<template>
    <button class="h-14 w-14 rounded-full border border-white hover:border-red-light text-white hover:text-red-light mr-4" @click="showModal = true">
        <i class="far fa-trash-alt"></i>
        <portal to="modal" v-if="showModal">
            <!-- DELETE MODAL -->
            <modal :closeable="false" @close="closeModal" v-show="showModal">
                <div class="p-6 rounded bg-white">
                    <p class="mb-4 text-lg tracking-wide text-semi-bold uppercase text-grey-dark">Confirmation</p>
                    <p class="mb-4 text-grey-darkest">Êtes vous sûr de vouloir supprimer le film <b>{{ movie.name }}</b> ?</p>
                    <div class="flex justify-end">
                        <button class="button is-secondary mr-4" @click="closeModal">
                            Annuler
                        </button>
                        <button class="button is-danger" @click="submitModal">
                            <span class="mr-2">
                                <i class="fas fa-trash-alt"></i>
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

    export default {
        components: { Modal },
        props: ['movie'],
        data () {
            return {
                showModal: false,
                stars: 0
            }
        },
        methods: {
            ...Vuex.mapActions(['destroy']),

            /**
             * Deletes the movie
             * @param event - DOM event
             */
            submitModal (event = null) {
                this.destroy(this.movie)
                this.$router.push({ name: 'index' })
            },

            /**
             * Closes the destroy modal
             * @param event - DOM event
             */
            closeModal (event = null) {
                this.showModal = false
            }
        }
    }
</script>
