import request from '@/utils/request'

// 获取游戏金额
export function gameAmount() {
	return request({
		url: 'index/get_wallet',
		method: 'GET',
	})
}

// 游戏转换
export function walletTransfer(data) {
	return request({
		url: 'index/walletTransfer',
		method: 'POST',
		data
	})
}

// 游戏记录
export function gameRecord(data) {
	return request({
		url: 'index/find_bets',
		method: 'POST',
		data
	})
}

// 充值 提现
export function withdrawRecharge(data) {
	return request({
		url: 'index/Withdraw_recharge',
		method: 'POST',
		data

	})
}

// 获取充值记录
export function rechargeRecord(data) {
	return request({
		url: 'index/Wit_rech_list',
		method: 'POST',
		data
	})
}

// 获取充值选项
export function rechlist() {
	return request({
		url: 'index/get_rechlist',
		method: 'POST',
	})
}