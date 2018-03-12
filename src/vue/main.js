import Vue from 'vue'
import router from './routes'
import store from './store'

import App from './App.vue'

const app = new Vue({
    el: '#app',
    components: { App },
    template: "<App/>",
    router,
    store
})