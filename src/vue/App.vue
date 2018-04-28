<template>
    <div id="app" class="min-h-full min-w-full flex flex-col bg-brand-muted">
        <!-- HEADER -->
        <section class="bg-brand-dark-to-brand-primary">
            <div class="container mx-auto">
                <div class="flex flex-wrap justify-center md:justify-between items-center p-6">
                    <!-- LEFT NAV -->
                    <nav class="flex flex-wrap items-center">
                        <router-link class="brand-logo border-brand-primary text-brand-primary mr-6" :to="{ name: 'index' }">
                            <span class="block">The</span>
                            <span class="block">Movie</span>
                            <span class="block">Db</span>
                        </router-link>
                        <a class="inline-flex p-4 text-green-lightest hover:text-white">Découvrir</a>
                        <router-link class="inline-flex p-4 text-green-lightest hover:text-white" :to="{ name: 'index' }">Films</router-link>
                        <a class="inline-flex p-4 text-green-lightest hover:text-white">Télévision</a>
                        <a class="inline-flex p-4 text-green-lightest hover:text-white">Artistes</a>
                    </nav>
                    <!-- RIGHT NAV -->
                    <nav class="flex items-center">
                        <router-link class="inline-flex p-4 text-green-lightest hover:text-white" :to="{ name: 'create' }">
                            <span class="mr-2 text-brand-primary">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span>Ajouter un film</span>
                        </router-link>
                    </nav>
                </div>
            </div>
        </section>
        <!-- SEARCH -->
        <search></search>
        <!-- CONTENT -->
        <router-view/>
        <!-- FOOTER -->
        <section class="bg-brand-dark-to-brand-secondary mt-auto lg:py-8">
            <div class="container mx-auto p-4 md:p-8">
                <!-- FOOTER NAV -->
                <div class="flex flex-wrap justify-center -m-4 text-center sm:text-left">
                    <div class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
                        <p class="uppercase font-semibold text-lg text-white md:mb-1">Les Fondamentaux</p>
                        <ul class="list-reset leading-tight">
                            <li><a class="text-white-80 hover:text-white">À propos</a></li>
                            <li><a class="text-white-80 hover:text-white">Contactez-nous</a></li>
                            <li><a class="text-white-80 hover:text-white">Forum d'aide</a></li>
                            <li><a class="text-white-80 hover:text-white">API</a></li>
                            <li><a class="text-white-80 hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div class="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
                        <p class="uppercase font-semibold text-lg text-white md:mb-1">S'impliquer</p>
                        <ul class="list-reset leading-tight">
                            <li><a class="text-white-80 hover:text-white">Bible de contribution</a></li>
                            <li><a class="text-white-80 hover:text-white">Applications externes</a></li>
                            <li><a class="text-white-80 hover:text-white">Ajouter un nouveau film</a></li>
                            <li><a class="text-white-80 hover:text-white">Ajouter une nouvelle série</a></li>
                        </ul>
                    </div>
                    <div class="p-4 w-full sm:w-1/2 md:w-auto lg:w-1/5">
                        <p class="uppercase font-semibold text-lg text-white md:mb-1">Communauté</p>
                        <ul class="list-reset leading-tight">
                            <li><a class="text-white-80 hover:text-white">Règles</a></li>
                            <li><a class="text-white-80 hover:text-white">Classement</a></li>
                            <li><a class="text-white-80 hover:text-white">Forums</a></li>
                            <li><a class="text-white-80 hover:text-white">Twitter</a></li>
                            <li><a class="text-white-80 hover:text-white">Facebook</a></li>
                        </ul>
                    </div>
                    <div class="p-4 w-full sm:w-1/2 md:w-auto lg:w-1/5">
                        <p class="uppercase font-semibold text-lg text-white md:mb-1">Légal</p>
                        <ul class="list-reset leading-tight">
                            <li><a class="text-white-80 hover:text-white">Conditions d'utilisation</a></li>
                            <li><a class="text-white-80 hover:text-white">Politique de confidentialité</a></li>
                        </ul>
                    </div>
                    <div class="p-4 w-full md:w-1/3 lg:w-1/5 flex justify-center items-center">
                        <router-link class="brand-logo inline-block text-brand-secondary border-brand-secondary" :to="{ name: 'index' }">
                            <span class="block">The</span>
                            <span class="block">Movie</span>
                            <span class="block">Db</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import Search from './components/Search.vue'

    export default {
        components: { Search },
        computed: {
            ...Vuex.mapGetters(['movies'])
        }
    }
</script>