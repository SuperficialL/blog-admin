import router from './router';
import store from './store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
// import { buildMenus } from '@/api/login';
import { filterAsyncRouter } from './store/modules/permission';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to, _from, next) => {
  NProgress.start()
  // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log(store.getters.roles, "store.getters.roles");
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
          // 拉取user_info
          buildMenus().then(res => {
            const asyncRouter = filterAsyncRouter(res.detail)
            asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
            store.dispatch('GenerateRoutes', asyncRouter).then(() => {
              // 存储路由
              router.addRoutes(asyncRouter)
              // 动态添加可访问路由表
              next({ ...to, replace: true })
              // hack方法 确保addRoutes已完成
            })
          })
        }).catch((err) => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            // location.reload()
            // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  // finish progress bar
})
