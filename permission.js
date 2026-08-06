import {
	getToken
} from '@/utils/auth'
import store from '@/store/index.js'
// const loginPage = "/"
store.dispatch('LoginPopup', false)
// 页面白名单
const whiteList = [
	'/', '/pages/first-storage/index', '/pages/return-cash/index',
	'/pages/telegram/index', '/pages/buddy/index', '/pages/jogos/game-details/index', 
	'/'
]

// 检查地址白名单
function checkWhite(url) {
	const path = url.split('?')[0]
	return whiteList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
	uni.addInterceptor(item, {
		invoke(to) {
			if (getToken()) {
				// if (to.url === loginPage) {
				// 	uni.reLaunch({
				// 		url: "/"
				// 	})
				// }
				return true
			} else {
				if (checkWhite(to.url)) {
					return true
				}
				store.dispatch('LoginPopup', true)
				return false
			}
		},
		fail(err) {
			console.log(err)
		}
	})
})