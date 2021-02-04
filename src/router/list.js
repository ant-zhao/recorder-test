const routerList = [
    {
        path: '/',
        name: 'index',
        meta: { title: '你被录音了'},
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/index',
        name: 'index1',
        meta: { title: '你被录音了'},
        component: () => import('@/views/index.vue'),
    }
];

export default routerList;