import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMoon, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'

library.add(faMoon)
library.add(faCircleHalfStroke)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
