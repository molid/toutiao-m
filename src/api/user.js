/*
    用户相关请求模块
*/
import request from '@/utils/request'
// import store from '@/store'
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

/*
     发送验证码
        注意： 每个手机号每分钟1次
*/
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/*
  获取用户自己信息
*/
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    /* headers: {
      // 注意： 该接口需要授权才能访问
      // token的数据格式： Bearer token数据，注意 Bearer后面有空格
      Authorization: `Bearer ${store.state.user.token} `
    } */
  })
}

/*
  获取用户频道列表
*/
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

/*
  关注用户
*/
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    body: {
      target
    }
  })
}

/*
  取消关注用户
*/
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

/* 获取用户个人资料 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/* 编辑用户个人资料  */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/* 编辑用户照片资料（头像、身份证照片） */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
