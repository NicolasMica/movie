<template>
    <main>
        <section>
            <div class="container mx-auto flex flex-col p-8">
                <div class="flex justify-between mb-8">
                    <h3 class="text-2xl font-semibold">
                        {{ exists ? 'Modifier le film' : 'Ajouter un film'}}
                    </h3>
                </div>
                <div class="flex -m-4">
                    <div class="w-2/3 p-4">
                        <form method="POST" enctype="multipart/form-data" @submit.prevent="submit">
                            <!-- NAME -->
                            <div class="flex flex-col">
                                <label for="form-name" class="py-2 font-semibold text-lg">Nom</label>
                                <input type="text" name="name" id="form-name" class="input" v-model="form.name">
                            </div>
                            <div class="flex -m-4">
                                <!-- DATE -->
                                <div class="w-2/5 p-4 flex flex-col">
                                    <label for="form-date" class="py-2 font-semibold text-lg">Date de sortie</label>
                                    <input type="date" name="date" id="form-date" class="input" v-model="form.date">
                                </div>
                                <!-- CATEGORIES -->
                                <div class="w-3/5 p-4 flex flex-col">
                                    <label for="form-categories" class="py-2 font-semibold text-lg">Genres</label>
                                    <input type="text" name="categories" id="form-categories" class="input" v-model="form.categories">
                                </div>
                            </div>
                            <div class="flex -m-4">
                                <div class="w-full md:w-2/5 p-4 flex flex-col">
                                    <!-- IMAGE -->
                                    <label for="form-image" class="py-2 font-semibold text-lg">Affiche</label>
                                    <div class="w-full min-h-88 mb-4 bg-grey-darkest">
                                        <img :src="form.image" class="block w-full h-full" v-show="form.image">
                                    </div>
                                   <div class="flex">
                                       <input type="text" name="image" id="form-image" class="input flex-1 mr-4" placeholder="Lien: http://..." v-model="form.image">
                                       <input type="file" accept="image/*" name="file" id="form-file" class="hidden" @change="handleFile">
                                       <label for="form-file" class="py-3 button is-info text-sm">
                                           <span>
                                               <i class="fas fa-upload"></i>
                                           </span>
                                           <span>Fichier</span>
                                       </label>
                                   </div>
                                </div>
                                <div class="w-full md:w-3/5 p-4 flex flex-col">
                                    <!-- SYNOPSIS -->
                                    <div class="flex flex-col">
                                        <label for="form-synopsis" class="py-2 font-semibold text-lg">Synopsis</label>
                                        <textarea name="synopsis" id="form-synopsis" cols="30" rows="24" class="input" v-model="form.synopsis"></textarea>
                                    </div>
                                </div>
                            </div>
                            <h3 class="text-2xl font-semibold my-8">
                                {{ exists ? 'Modifier le réalisateur' : 'Ajouter le réalisateur'}}
                            </h3>
                            <div class="flex -m-4">
                                <!-- FIRSTNAME -->
                                <div class="w-1/2 p-4 flex flex-col">
                                    <label for="form-firstname" class="py-2 font-semibold text-lg">Prénom</label>
                                    <input type="text" name="firstname" id="form-firstname" class="input" v-model="form.director.firstname">
                                </div>
                                <!-- LASTNAME -->
                                <div class="w-1/2 p-4 flex flex-col">
                                    <label for="form-lastname" class="py-2 font-semibold text-lg">Nom</label>
                                    <input type="text" name="lastname" id="form-lastname" class="input" v-model="form.director.lastname">
                                </div>
                            </div>
                            <div class="flex -m-4">
                                <!-- BIRTHDATE -->
                                <div class="w-1/2 p-4 flex flex-col">
                                    <label for="form-birthdate" class="py-2 font-semibold text-lg">Date de naissance</label>
                                    <input type="date" name="birthdate" id="form-birthdate" class="input" v-model="form.director.birthdate">
                                </div>
                                <!-- NATIONALITY -->
                                <div class="w-1/2 p-4 flex flex-col">
                                    <label for="form-nationality" class="py-2 font-semibold text-lg">Nationalité</label>
                                    <input type="text" name="nationality" id="form-nationality" class="input" v-model="form.director.nationality">
                                </div>
                            </div>
                            <!-- BUTTONS -->
                            <div class="flex justify-between mt-4">
                                <router-link :to="previousRoute" class="button text-grey-darker hover:text-grey-darkest">Annuler</router-link>
                                <button type="submit" class="button is-success" :disabled="!isValid">
                                    <span>Sauvegarder</span>
                                    <span class="ml-2">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="w-1/3 p-4">
                        <div class="flex flex-col -my-2">
                            <div class="block py-2">
                                <label class="block p-2">Associer aux données existantes</label>
                                <div class="relative z-0 block">
                                    <span class="absolute pin-l pin-y text-grey-dark p-2 pointer-events-none">
                                        <i class="fas fa-search"></i>
                                    </span>
                                    <input type="text" class="input w-full pl-8" placeholder="Rechercher sur l'API" v-model="search">
                                </div>
                            </div>
                            <div class="py-2" v-for="result in results" :key="result.imdbID">
                                <div class="flex flex-wrap shadow hover:shadow-md bg-white">
                                    <div class="w-full">
                                        <div class="p-4">
                                            <p class="text-black font-semibold text-lg">{{ result.Title }}</p>
                                            <p class="text-grey-darker">{{ result.Year }}</p>
                                        </div>
                                        <div class="mt-auto border-t border-grey-light">
                                            <button class="p-4 inline-block no-underline text-black" @click="associate(result.imdbID)">Associer au film</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vuex from 'vuex'
    import moment from 'moment'
    import merge from 'deepmerge'

    export default {
        props: ['id'],
        data () {
            return {
                form: null,
                search: null,
                searchTimeout: null,
                results: []
            }
        },
        watch: {
            /**
             * Updates the search result
             * @param value
             */
            search (value) {
                if (value.length <= 3) return
                let timeoutDelay = 300
                if (this.searchTimeout === null) {
                    this.searchTimeout = setTimeout(
                        () => this.registerSearchTimeout(value), timeoutDelay
                    )
                } else {
                    clearTimeout(this.searchTimeout)
                    this.searchTimeout = setTimeout(
                        () => this.registerSearchTimeout(value), timeoutDelay
                    )
                }
            },

            id (value) {
                if (value === undefined) {
                    this.reset()
                }
            }
        },
        computed: {
            ...Vuex.mapGetters(['movies']),

            /**
             * Determins this is an edition
             */
            exists () {
                return this.id !== undefined && this.id !== null
            },

            /**
             * Finds the current movie
             */
            movie () {
                return this.movies.find(item => item.id == this.id)
            },

            /**
             * Validate method shortcut
             */
            isValid () {
                return this.validate(
                    this.form
                )
            },

            /**
             * Determines the previous route
             */
            previousRoute () {
                if (this.exists) {
                    return { name: 'show', params: { id: this.movie.id } }
                }

                return { name: 'index' }
            }
        },
        methods: {
            ...Vuex.mapActions(['store', 'update', 'fetchAll', 'fetch']),

            /**
             * Determines whether the given data is valid or not
             * @param {data} - Form data to validate
             * @returns boolean
             */
            validate (data) {
                let nullable = ['birthdate', 'nationality', 'file', 'image']

                for (let field in data) {
                    if (nullable.includes(field)) continue

                    if (typeof data[field] === "object" && !this.validate(data[field])) {
                        return false
                    } else if (data[field] === null || data[field] === '') {
                        return false
                    }
                }

                return true
            },

            /**
             * Submit the form
             * @param event - DOM event
             */
            submit (event = null) {
                if (!this.isValid) return false

                let req = this.exists ? this.update(this.form) : this.store(this.form)

                req.then((movie) => {
                    this.$router.push({ name: 'show', params: { id: movie.id } })
                })
            },

            /**
             * Cancel the form inputs
             */
            cancel () {
                this.reset()
                this.$router.push({ name: 'index' })
            },

            /**
             * Handles file input change
             * @param event - DOM event
             */
            handleFile (event = null) {
                this.form.file = event.target.files[0]
                this.form.image = URL.createObjectURL(this.form.file)
            },

            /**
             * Fetches & associate a film from the API with the form
             * @param imdbID - Film API unique identifier
             */
            associate (imdbID) {
                this.fetch({ imdbID })
                    .then(({ data }) => {

                        let fullname = data.Director
                        let movie = {
                            name: data.Title,
                            synopsis: data.Plot,
                            categories: data.Genre.split(',').map(category => category.trim()),
                            date: moment(data.Released, 'DD MMM YYYY').format('YYYY-MM-DD'),
                            director: {
                                fullname: fullname,
                                lastname: fullname.split(' ').pop(),
                                firstname: fullname.split(' ').slice(0, -1).join(' ')
                            },
                            imdbID
                        }

                        if (data.Poster !== 'N/A') {
                            movie['image'] = data.Poster
                        }

                        this.form = merge(this.form, movie)
                    })
            },

            /**
             * Resets the form object
             */
            reset () {
                this.form = {
                    name: null,
                    date: null,
                    director: {
                        fullname: null,
                        lastname: null,
                        firstname: null,
                        nationality: null,
                        birthdate: null
                    },
                    synopsis: null,
                    file: null,
                    image: null,
                    categories: null
                }
            },

            /**
             * Search timeout method
             * @param value
             */
            registerSearchTimeout (value) {
                this.searchTimeout = null
                this.fetchAll({ name: value }).then(
                    response => this.results = response.data.Search
                )
            }
        },
        created () {
            this.reset()

            if (this.exists) {
                if (this.movie === undefined) {
                    return this.$router.push({ name: 'error' })
                }

                this.form = merge(this.movie, {})

                this.fetchAll(this.movie).then(
                    ({ data }) => this.results = data.Search
                )
            }
        }
    }
</script>