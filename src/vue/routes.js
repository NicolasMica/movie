import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('./pages/Index.vue')
const Show = () => import('./pages/Show.vue')
const Form = () => import('./pages/Form.vue')
const Error = () => import('./pages/Error.vue')

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
            path: '/movie/create',
            component: Form,
            meta: {
                name: "Ajouter un film"
            }
        },
        {
            name: 'show',
            path: '/movie/:id',
            component: Show,
            props: true,
            meta: {
                name: "Informations sur le film"
            }
        },
        {
            name: 'edit',
            path: '/movie/:id/edit',
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