import Vue from 'vue';
import Router from 'vue-router';
import Start from './view/Start.vue';
import Favorite from './view/Favorite.vue';
import Modal from './view/Modal.vue';
import lang from './plugins/i18n';
import config from './config.json';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/favorite',
            meta: {
                title: `${lang.t('navitemFavorites')} - ${config.documentTitle}`,
            },
            component: Favorite,
            children: [
                {
                    meta: {
                        title: `${lang.t('navitemFavorites')} - ${config.documentTitle}`,
                    },
                    path: ':id',
                    component: Modal,
                    name: 'modalFavorite',
                },
            ],
        },
        {
            path: '//',
            meta: {
                title: `${lang.t('navitemHome')} - ${config.documentTitle}`,
            },
            component: Start,
            children: [
                {
                    meta: {
                        title: `${lang.t('navitemHome')} - ${config.documentTitle}`,
                    },
                    path: ':id',
                    component: Modal,
                    name: 'modalStart',
                },
            ],
        },
    ],
});
