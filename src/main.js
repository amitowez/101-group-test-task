import { createApp } from 'vue';
import { pinia } from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);
app.use(pinia)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios;
app.mount('#app');