import "@babel/core";
import "@babel/plugin-transform-runtime";
import Vue from 'vue';
import App from './App.vue';

import {myRouter} from "./router/permission";
import "./plugins/filters";
import "./plugins/mixins";
import './plugins/antd';

Vue.config.productionTip = false;

new Vue({
    router: myRouter,
    render: h => h(App),
}).$mount("#app")
