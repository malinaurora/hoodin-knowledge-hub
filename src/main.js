import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import moment from 'moment';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import App from './App.vue';
import 'babel-polyfill';
import i18n from './plugins/i18n';

Vue.use(BootstrapVue);
Vue.use(Vuetify);

Vue.filter('striphtml', value => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const text = div.textContent || div.innerText || '';
    return text;
});
moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '%ds',
        m: '1min',
        mm: '%dmin',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1mth',
        MM: '%dmth',
        y: '1y',
        yy: '%dy',
    },
});

Vue.filter('moment', date => moment(date).fromNow(true));

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    render: html => html(App),
}).$mount('#app');
