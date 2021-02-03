import router from './index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
    NProgress.start()
    to.meta.title && (document.title = to.meta.title);
    next();
})

router.afterEach(() => {
    NProgress.done()
})

export const myRouter = router;