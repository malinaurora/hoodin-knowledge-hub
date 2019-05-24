import Vue from 'vue';
import moment from 'moment';
import router from './router';
import App from './App.vue';
import 'babel-polyfill';
import i18n from './plugins/i18n';

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
        yy: '%y',
    },
});

Vue.filter('moment', date => moment(date).fromNow());

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    render: html => html(App),
}).$mount('#app');
