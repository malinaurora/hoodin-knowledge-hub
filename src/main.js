import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import moment from 'moment';
import router from './router';
import App from './App.vue';


Vue.use(BootstrapVue);

Vue.filter('striphtml', (value) => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const text = div.textContent || div.innerText || '';
    return text;
});
moment.locale('en', {
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
    render: h => h(App),
});
