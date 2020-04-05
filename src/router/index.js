import Vue from "vue";
import Router from "vue-router";

import store from "@/store";
import Layout from "@/layout";
import { getToken } from "@/utils/auth";

Vue.use(Router);

const whiteList = ["/login"];

export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/pages/redirect")
      }
    ]
  },

  /** 登录 */
  {
    name: "login",
    path: "/login",
    component: () => import("@/pages/login"),
    hidden: true
  },

  /** 仪表盘 */
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/pages/dashboard"),
        name: "Home",
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },

  // {
  //   path: "/blog",
  //   component: Layout,
  //   meta: {
  //     title: "博客管理",
  //     icon: "list"
  //   },
  //   children: [
  //     /** 分类 */
  //     {
  //       path: "category",
  //       component: () => import("@/pages/blog/category"),
  //       name: "Category",
  //       meta: {
  //         title: "分类管理",
  //         // icon: "documentation"
  //       }
  //     },

  //     /** 标签 */
  //     {
  //       path: "tags",
  //       component: () => import("@/pages/blog/tags"),
  //       name: "Tag",
  //       meta: {
  //         title: "标签管理",
  //         // icon: "documentation"
  //       }
  //     },

  //     /** 文章 */
  //     {
  //       path: "post",
  //       component: () => import("@/pages/blog/post"),
  //       name: "Post",
  //       meta: {
  //         title: "博文管理",
  //         // icon: "documentation"
  //       }
  //     },
  //     {
  //       path: "post/create",
  //       component: () => import("@/pages/blog/post/edit"),
  //       name: "CreatePost",
  //       hidden: true,
  //       meta: {
  //         title: "创建文章",
  //         // icon: "documentation"
  //       }
  //     },
  //     {
  //       path: "post/edit/:id",
  //       name: "editPost",
  //       component: () => import("@/pages/blog/post/edit"),
  //       props: true,
  //       hidden: true,
  //       meta: {
  //         title: "编辑文章",
  //         noCache: true
  //       }
  //     },

  //     /** 评论 */
  //     {
  //       path: "comment",
  //       component: () => import("@/pages/blog/comment"),
  //       name: "Comment",
  //       meta: {
  //         title: "评论管理",
  //         // icon: "documentation"
  //       }
  //     },
  //   ]
  // },

  // /** 设置 */
  // {
  //   path: "/site",
  //   component: Layout,
  //   redirect: "/site/list",
  //   name: "Site",
  //   meta: {
  //     title: "网站管理",
  //     icon: "list"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/pages/site/timeline"),
  //       name: "SiteSettings",
  //       meta: {
  //         title: "站点设置",
  //         // icon: "list"
  //       }
  //     },

  //     {
  //       path: "timeline",
  //       component: () => import("@/pages/site/timeline"),
  //       name: "TimeLine",
  //       meta: {
  //         title: "时间轴",
  //         // icon: "list"
  //       }
  //     }
  //   ]
  // },

  // /** 个人中心 */
  // {
  //   path: "/profile",
  //   component: Layout,
  //   redirect: "/profile/index",
  //   hidden: true,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/pages/profile"),
  //       name: "Profile",
  //       meta: {
  //         title: "个人中心",
  //         icon: "user"
  //       }
  //     },
  //     {
  //       path: "settings",
  //       component: () => import("@/pages/profile/settings"),
  //       name: "Settings",
  //       meta: {
  //         title: "个人设置",
  //         icon: "user"
  //       }
  //     }
  //   ]
  // },

  /** 系统设置 */
  {
    path: "/system",
    component: Layout,
    redirect: "/system/menu",
    name: "System",
    meta: {
      title: "系统设置",
      icon: "list"
    },
    children: [
      {
        path: "menus",
        component: () => import("@/pages/system/menu"),
        name: "Menu",
        meta: {
          title: "菜单管理",
          // icon: "list"
        }
      },
      {
        path: "album",
        component: () => import("@/pages/system/album"),
        name: "Album",
        meta: {
          title: "相册管理",
          // icon: "list"
        }
      },
      {
        path: "media",
        component: () => import("@/pages/system/media"),
        name: "Media",
        meta: {
          title: "媒体管理",
          // icon: "list"
        }
      },
      {
        path: "users",
        component: () => import("@/pages/system/user"),
        name: "UserList",
        meta: {
          title: "用户管理",
          // icon: "list"
        }
      },
      {
        path: "roles",
        component: () => import("@/pages/system/roles"),
        name: "list",
        meta: {
          title: "角色管理",
          // icon: "list"
        }
      },
      {
        path: "permissions",
        component: () => import("@/pages/system/permission"),
        name: "PermissionList",
        meta: {
          title: "权限管理",
          // icon: "list"
        }
      }
    ]
  },

  {
    path: "/404",
    component: () => import("@/pages/errorPage/404"),
    hidden: true
  },

  { path: "*", redirect: "/404", hidden: true }
];

const IS_DEV = process.env.NODE_ENV === "development";

let index = new Router({
  mode: IS_DEV ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

index.beforeEach((to, _from, next) => {
  if (getToken()) {
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (!store.getters.username) {
        store.dispatch("GetUserInfo").then(() => {
          next({ ...to, replace: true });
        });
      }
      next();
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      // 否则全部重定向到登录页
    }
  }
});

export default index;
