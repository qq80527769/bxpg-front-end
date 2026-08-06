import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission'  
import { isLogin, dDelay } from '@/utils/common.js'
import i18n from './lang/index.js'
import config from '@/config.js' 
import uView from "@/uni_modules/uview-ui";

Vue.use(plugins).use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$isLogin = isLogin
Vue.prototype.$dDelay = dDelay

App.mpType = 'app'

const app = new Vue({
	i18n,
  ...App
})

app.$mount()
