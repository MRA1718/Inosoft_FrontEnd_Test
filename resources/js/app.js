import Vue from 'vue';
import App from './App.vue';
import { store } from './store/index';
import '@fortawesome/fontawesome-free/css/all.css';

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
