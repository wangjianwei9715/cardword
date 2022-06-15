import Vue from 'vue'
import App from './App.vue'
import {
	parsePic
} from '@/tools/util'
import VueTinder from 'vue-tinder'
Vue.use(VueTinder)
Vue.config.productionTip = false
Vue.prototype.$parsePic = parsePic
new App().$mount()
