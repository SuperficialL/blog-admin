import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
  NProgress.start();
  // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (!store.getters.username) {
        store
          .dispatch("GetUserInfo")
          .then(res => {
            next();
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              location.reload();
              // 为了重新实例化vue-router对象 避免bug
            });
          });
      } else {
        next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
  // finish progress bar
});
