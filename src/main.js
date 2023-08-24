import Vue from 'vue'
import App from './App.vue'
import {
	parsePic,thumbnail
} from '@/tools/util'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import VueTinder from 'vue-tinder'
Vue.use(VueTinder)
Vue.config.productionTip = false
Vue.prototype.$parsePic = parsePic
Vue.prototype.$thumbnail = thumbnail
new App().$mount()
