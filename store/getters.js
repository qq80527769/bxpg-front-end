const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permissions: state => state.user.permissions,
  loginPopup: state => state.user.loginPopup
}
export default getters
