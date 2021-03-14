import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import toyApp from '../views/toyApp.vue';
import about from '../views/about.vue';
import edit from '../views/edit.vue';
import toyDetails from '../views/toyDetails.vue';
import userPage from '../views/user.vue';
import reviewPage from '../views/review.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/about',
    name: 'About',
    component: about,
  },
  {
    path: '/user',
    name: 'User',
    component: userPage,
  },
  {
    path: '/review',
    name: 'Review',
    component: reviewPage,
  },
  {
    path: '/toy',
    name: 'Toy',
    component: toyApp,
  },
  {
    path: '/toy/:toyId',
    name: 'toyDetails',
    component: toyDetails,
  },
  {
    path: '/edit/:toyId?',
    name: 'edit',
    component: edit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
