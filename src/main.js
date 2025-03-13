import { createApp } from 'vue';
import { pinia } from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');