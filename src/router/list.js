const routerList = [
    {
        path: '/',
        name: 'index',
        meta: { title: '首页',},
        component: () => import('@/views/index.vue'),
    }
];

export default routerList;