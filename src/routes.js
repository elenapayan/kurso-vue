import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Post from './components/Post.vue';
import BackOffice from './views/BackOffice.vue';
import Home from './views/Home.vue';

Vue.use(VueRouter);


function guardRoute(to, from, next) {
  const token = localStorage.getItem('token');
  if (token) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', component: Home, children: [
      { path: '', component: Post },
      { path: ':id', name: 'PostDetails', component: () => import("./components/PostDetails.vue") },
    ]
  },
  {
    path: '/backOffice', component: BackOffice, beforeEnter: guardRoute, children: [
      { path: '', name: 'BackOffice', component: () => import("./components/BOPost.vue") },
      { path: ':id', name: 'BOPostDetails', component: () => import("./components/BOPostDetails.vue") },
    ]
  },
  {
    path: '/login', name: 'Login', component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router;