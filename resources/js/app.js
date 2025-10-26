import './bootstrap';
import '../css/app.css'; // this loads Tailwind’s styles

import { createApp } from 'vue';
import MonsterMatch from './components/MonsterMatch.vue';

createApp(MonsterMatch).mount('#app');
