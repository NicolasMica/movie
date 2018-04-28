import Vue from 'vue'
import PortalVue from 'portal-vue'
import router from './routes'
import store from './store'

Vue.use(PortalVue)

import App from './App.vue'

const app = new Vue({
    el: '#app',
    components: { App },
    template: "<App/>",
    router,
    store,
    created () {
        this.$store.dispatch('get')
    }
})