import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import Start from './components/Start.vue';
import App from './App.vue';


Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
    // Add your routes here and import them above
    { path: '/', component: Start },
];

const router = new VueRouter({
    routes,
});

Vue.filter('striphtml', (value) => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const text = div.textContent || div.innerText || '';
    return text;
});

Vue.component('modal', {
    template: '#modal-template',
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
