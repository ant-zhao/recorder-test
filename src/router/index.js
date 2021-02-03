import Vue from 'vue';
import Router from 'vue-router';
import routerList from './list';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: routerList
})
