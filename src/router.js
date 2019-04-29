import Vue from 'vue';
import Router from 'vue-router';
import Start from './view/Start.vue';
import Favorite from './view/Favorite.vue';
import Modal from './view/Modal.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/favorite',
            component: Favorite,
            children: [
                { path: ':id', component: Modal, name: 'modalFavorite' },
            ],
        },
        {
            path: '/',
            component: Start,
            children: [
                { path: ':id', component: Modal, name: 'modalStart' },
            ],
        },
    ],
});
