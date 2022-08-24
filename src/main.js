import Vue from 'vue'
import App from './App.vue'
import {
	parsePic
} from '@/tools/util'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import VueTinder from 'vue-tinder'
Vue.use(VueTinder)
Vue.config.productionTip = false
Vue.prototype.$parsePic = parsePic
new App().$mount()
