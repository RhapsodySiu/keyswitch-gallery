import { createApp } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon, faCircleHalfStroke, faMagnifyingGlass, faXmark, faFilter } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
import App from './App.vue'

library.add(faMoon)
library.add(faCircleHalfStroke)
library.add(faMagnifyingGlass)
library.add(faXmark)
library.add(faFilter)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
