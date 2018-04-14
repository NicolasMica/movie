import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from './pages/Index.vue'
import Show from './pages/Show.vue'
import Form from './pages/Form.vue'
import Error from './pages/Error.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: Index,
            meta: {
                name: "Films"
            }
        },
        {
            name: 'create',
            path: '/movies/create',
            component: Form,
            meta: {
                name: "Ajouter un film"
            }
        },
        {
            name: 'show',
            path: '/movies/:id',
            component: Show,
            props: true,
            meta: {
                name: "Informations sur le film"
            }
        },
        {
            name: 'edit',
            path: '/movies/:id/edit',
            component: Form,
            props: true,
            meta: {
                name: 'Modifier un film'
            }
        },
        {
            name: 'error',
            path: '*',
            component: Error,
            meta: {
                name: 'Page introuvable'
            }
        }
    ]
})