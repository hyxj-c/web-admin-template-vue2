const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  buttons: state => state.user.buttons,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
};

export default getters;
