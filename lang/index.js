import VueI18n from "vue-i18n";
import Vue from 'vue'
import store from '@/store/index.js'

// 西班牙语
import Portugal from './Portugal.js'
// 中文
import zh from './zh.js' 
Vue.use(VueI18n)

export default new VueI18n({
	// locale: store.state.user.language || 'zh',
	locale: 'Portugal',
	messages: {
		'zh': zh,
		'Portugal': Portugal
	}
});
 