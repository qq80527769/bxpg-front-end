import request from '@/utils/request'

// banner
export function banner() {
	return request({
		url: 'index/getban',
		method: 'POST',
	})
}

// 公告
export function notice() {
	return request({
		url: 'index/get_msg',
		method: 'POST'
	})
}

// 公告
export function popup() {
	return request({
		url: 'index/getPopupImg',
		method: 'POST'
	})
}

// 公告
export function receiveBonus() {
	return request({
		url: 'index/receiveBonus',
		method: 'POST'
	})
}

// 游戏列表
export function gameList(data) {
	return request({
		url: 'index/game_index',
		method: 'POST',
		data
	})
}

// 进入游戏
export function enterGame(data) {
	return request({
		url: 'index/in_game',
		method: 'POST',
		data
	})
}

// 活动详情
export function eventDetails(type) {
	return request({
		url: 'index/get_contents',
		method: 'POST',
		data: {
			type
		}
	})
}

// 获取联系方式
export function information(data) {
	return request({
		url: 'index/get_c',
		method: 'GET',
	})
}

// 获取某个分类下游戏列表
export function gameLists(data) {
	return request({
		url: 'index/game_detai',
		method: 'POST',
		data
	})
}

// 获取下载地址
export function downloadAddress() {
	return request({
		url: 'index/get_c',
		method: 'POST',
	})
}

// 模糊查询游戏
export function fuzzyQueryGame(data) {
	return request({
		url: 'index/game_like',
		method: 'POST',
		data
	})
}