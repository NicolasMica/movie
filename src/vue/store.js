import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'

Vue.use(Vuex)

window.axios = axios.create({
    baseURL: window.location.origin + '/api/movies'
})

const state = {
    movies: []
}

const mutations = {
    /**
     * Fetches the state from the localStorage
     * @param state - Store state
     */
    INIT(state) {
        let store = window.localStorage.getItem('store')
        if (store) {
            this.replaceState(
                JSON.parse(store)
            )
        }
    },

    /**
     * Stores an existing movie collection
     * @param state - Store state
     * @param movies - Movie collection
     * @constructor
     */
    FETCH: (state, movies) => state.movies = movies,

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
    UPDATE: (state, movie) => state.movies = state.movies.map(item => item.id === movie.id ? movie : item),

    /**
     * Destroy a given movie
     * @param state - Store state
     * @param movie - Movie object
     */
    DESTROY: (state, movie) => state.movies = state.movies.filter(item => item.id !== movie.id)
}

const actions = {

    /**
     * Fetches every matching movie from the API
     * @param store
     * @param movie - Movie entity or data
     * @param page
     * @returns {AxiosPromise<any>}
     */
    fetchAll(store, movie, page = 1) {
        let params = {
            apikey: window.App.api_key,
            s: movie.name,
            type: 'movie',
            y: movie.hasOwnProperty('date') ? moment(movie.date).year() : null,
            page,
            v: 1
        }

        return axios.get('https://www.omdbapi.com/', {params})
    },

    /**
     * Fetches a single movie from the API
     * @param store
     * @param movie - Movie entity or data
     * @returns {AxiosPromise<any>}
     */
    fetch(store, movie) {
        let params = {
            apikey: window.App.api_key,
            i: movie.imdbID,
            type: 'movie',
            plot: 'full',
            v: 1
        }

        return axios.get('https://www.omdbapi.com/', {params})
    },

    /**
     * Fetches the existing movies
     * @param store
     * @returns {*|PromiseLike<{data?: *}>|Promise<{data?: *}>}
     */
    get(store) {
        return window.axios.get('/').then(
            ({data}) => store.commit('FETCH', data)
        )
    },

    /**
     * Stores the given movie
     * @param store
     * @param movie - Movie object
     */
    store(store, movie) {
        return new Promise((resolve, reject) => {
            window.axios.post('/', movie)
                .then(({data}) => {
                    store.commit('STORE', data)
                    resolve(data)
                })
                .catch(reject)
        })
    },

    /**
     * Update the given movie
     * @param store
     * @param movie - Movie object
     */
    update(store, movie) {
        return new Promise((resolve, reject) => {
            window.axios.put(`/${movie.id}`, movie)
                .then(({data}) => {
                    store.commit('UPDATE', data)
                    resolve(data)
                })
                .catch(reject)
        })
    },

    /**
     * Deletes the given movie
     * @param store
     * @param movie - Movie object
     */
    destroy(store, movie) {
        return new Promise((resolve, reject) => {
            window.axios.delete(`/${movie.id}`)
                .then(({data}) => {
                    store.commit('DESTROY', data)
                    resolve(data)
                })
                .catch(reject)
        })
    }
}

const getters = {
    /**
     * Returns the movies state prop
     * @param state - Store state
     * @returns {*} - Movie object collection
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

/**
 * Sync localStorage /w Vuex store
 */
store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
})

export default store
