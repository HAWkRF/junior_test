import Music from './components/Music.vue'
import Main from './components/Main'

let url = process.env.MIX_APP_PATH;

export const routes = [
    { path: url + 'music', name: 'music', component: Music },
    { path: url, name: 'main', component: Main },
];