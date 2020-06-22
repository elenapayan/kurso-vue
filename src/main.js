import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';
import Home from './components/Home.vue';


Vue.config.productionTip = false

Vue.use(VueRouter);

const routes= [
  {path:'/home', component: Home},
  {path:'/hello', component: HelloWorld},
  {path:'/', component: Home}
];

const router = new VueRouter({
  routes,
  mode: 'history'
})



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
