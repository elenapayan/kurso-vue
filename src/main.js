import router from '@/routes';
import { applyPolyfills, defineCustomElements } from 'kurso-st/loader';
import Vue from 'vue';
import App from './components/App.vue';
import store from './store/index.js';


Vue.config.productionTip = false;

Vue.config.ignoredElements = [
  'button-more',
  'layout-home',
  'post-card',
  'post-comments',
  'post-footer'
];


applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
