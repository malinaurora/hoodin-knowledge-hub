import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import App from './App.vue';


Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.filter('striphtml', (value) => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const text = div.textContent || div.innerText || '';
    return text;
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
});
