const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permisaction: state => state.user.permisaction,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  title: state => state.settings.title,
  logo: state => state.settings.logo,
  isLdap: state => state.settings.isLdap,
  isVerifyCode: state => state.settings.isVerifyCode
}
export default getters
