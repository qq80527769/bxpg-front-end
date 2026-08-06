import request from '@/utils/request'

// 登录方法
export function login(data) {
	const {
		username,
		password
	} = data
	return request({
		'url': 'user/login',
		'method': 'POST',
		data: {
			username,
			password
		}
	})
}

// 注册方法
export function register(data) {
	const {
		username,
		password,
		codes,
		invitation_code
	} = data
	return request({
		url: 'user/register',
		method: 'POST',
		data: {
			username,
			password,
			codes,
			invitation_code
		}
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		url: 'user/getUserinfo',
		method: 'POST'
	})
}

// 退出方法
export function logout() {
	return request({
		url: '/logout',
		method: 'POST'
	})
}

// 获取验证码
export function verificationCode(data) {
	return request({
		url: 'index/send_email_mobile',
		method: 'POST',
		data
	})
}

// 忘记密码
export function forgotPassword(data) {
	const {
		username,
		password,
		code
	} = data
	return request({
		url: 'user/change_pwd',
		method: 'POST',
		data: {
			username,
			password,
			code
		}
	})
}