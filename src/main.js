import Vue from 'vue'
import App from './App.vue'
import {
	parsePic,thumbnail
} from '@/tools/util'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$parsePic = parsePic
Vue.prototype.$thumbnail = thumbnail
new App().$mount()
