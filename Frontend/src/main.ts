import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

export function redirectTo(action: string) {
    router.push({ name: action });
}
