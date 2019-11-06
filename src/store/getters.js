const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  username: (state) => state.user.username,
  email: (state) => state.user.email,
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  size: (state) => state.app.size
};

export default getters;
