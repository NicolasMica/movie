import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    movies: [
        {
            id: 1,
            name: 'Forrest Gump',
            date: '1994-11-5',
            director: {
                fullname: 'Robert Zemeckis',
                lastname: 'Zemeckis',
                firstname: 'Robert',
                nationality: 'Américain',
                birthdate: '1952-5-14'
            },
            synopsis: "Quelques décennies d'histoire américaine, des années 1940 à la fin du XXème siècle, à travers le regard et l'étrange odyssée d'un homme simple et pur, Forrest Gump.",
            image: 'http://fr.web.img4.acsta.net/r_1920_1080/pictures/15/10/13/15/12/514297.jpg',
            categories: ['Comédie Dramatique', 'Romance']
        },
        {
            id: 2,
            name: 'Fight Club',
            date: '1999-11-10',
            director: {
                fullname: 'David Fincher',
                lastname: 'Fincher',
                firstname: 'David',
                nationality: 'Américain',
                birthdate: '1962-8-28'
            },
            synopsis: "Le narrateur, sans identité précise, vit seul, travaille seul, dort seul, mange seul ses plateaux-repas pour une personne comme beaucoup d'autres personnes seules qui connaissent la misère humaine, morale et sexuelle. C'est pourquoi il va devenir membre du Fight club, un lieu clandestin ou il va pouvoir retrouver sa virilité, l'échange et la communication. Ce club est dirigé par Tyler Durden, une sorte d'anarchiste entre gourou et philosophe qui prêche l'amour de son prochain.",
            image: 'http://fr.web.img6.acsta.net/r_1920_1080/pictures/17/04/27/09/53/033024.jpg',
            categories: ['Thriller', 'Drame']
        },
        {
            id: 3,
            name: 'Un Homme d\'Exception',
            date: '2002-2-13',
            director: {
                fullname: 'Ron Howard',
                lastname: 'Howard',
                firstname: 'Ron',
                nationality: 'Américain',
                birthdate: '1954-3-1'
            },
            synopsis: `En 1947, étudiant les mathématiques à l'université de Princeton, John Forbes Nash Jr., un brillant élève, élabore sa théorie économique des jeux. Pour lui, les fluctuations des marchés financiers peuvent être calculées très précisément. Au début des années cinquante, ses travaux et son enseignement au Massachusetts Institute of Technology ne passent pas inaperçus et un représentant du Département de la Défense, William Parcher, se présente à lui pour lui proposer d'aider secrètement les États-Unis. La mission de John consiste à décrypter dans la presse les messages secrets d'espions russes, censés préparer un attentat nucléaire sur le territoire américain. Celui-ci y consacre rapidement tout son temps, et ce au détriment de sa vie de couple avec Alicia. Ce job n'est toutefois pas sans risques : des agents ennemis surveillent ses moindres faits et gestes. Mais personne ne le croit.`,
            image: 'http://fr.web.img6.acsta.net/r_1920_1080/medias/nmedia/00/02/33/32/69219828_af.jpg',
            categories: ['Drame']
        },
    ]
}

const mutations = {
    /**
     * Stores a new movie
     * @param state - Store state
     * @param movie - Movie object
     * @returns {number}
     */
    STORE: (state, movie) => state.movies.push(movie),

    /**
     * Updates a given movie
     * @param state - Store state
     * @param movie - Movie object
     */
    UPDATE (state, movie) {
        let index = state.movies.findIndex(item => item.id === movie.id)
        state.movies[index] = movie
    },

    /**
     * Destroy a given movie
     * @param state - Store state
     * @param movie - Movie object
     * @returns {T[]}
     */
    DESTROY: (state, movie) => state.movies = state.movies.filter(item => item.id !== movie.id)
}

const actions = {
    /**
     * Stores the given movie
     * @param store
     * @param movie - Movie object
     */
    store (store, movie) {
        store.commit('STORE', movie)
    },

    /**
     * Update the given movie
     * @param store
     * @param movie - Movie object
     */
    update (store, movie) {
        store.commit('UPDATE', movie)
    },

    /**
     * Deletes the given movie
     * @param store
     * @param movie - Movie object
     */
    destroy (store, movie) {
        store.commit('DESTROY', movie)
    }
}

const getters = {
    /**
     * Returns the movies state prop
     * @param state - Store state
     * @returns {*[]}
     */
    movies: state => state.movies
}

const store = new Vuex.Store({
    strict: (process.env.NODE_ENV !== 'production'),
    state,
    mutations,
    actions,
    getters
})
export default store
