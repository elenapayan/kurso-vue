import router from '@/routes';
import Vue from 'vue';
import App from './components/App.vue';
import store from './store/index.js';


Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
