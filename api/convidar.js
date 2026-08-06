import request from '@/utils/request'

// 邀请链接
export function inviteLink() {
  return request({
    url: 'index/get_links',
    method: 'GET',
  })
}

// 邀请数据
export function invitationList() {
  return request({
    url: 'index/allThirdLevelUsers',
    method: 'POST',
  })
}