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

  /** 首页 */
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

  /** 分类 */
  {
    path: "/category",
    component: Layout,
    redirect: "/category/list",
    name: "Category",
    meta: {
      title: "分类管理",
      icon: "documentation"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/category/edit"),
        name: "CreateCategory",
        meta: {
          title: "创建分类",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        name: "EditCategory",
        component: () => import("@/pages/category/edit"),
        props: true,
        hidden: true,
        meta: {
          title: "编辑分类",
          noCache: true
        }
      },
      {
        path: "list",
        component: () => import("@/pages/category/list"),
        name: "CateogoryList",
        meta: {
          title: "分类列表",
          icon: "list"
        }
      }
    ]
  },

  /** 标签 */
  {
    path: "/tags",
    component: Layout,
    redirect: "/tags/list",
    name: "Tag",
    meta: {
      title: "标签管理",
      icon: "documentation"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/tags/edit"),
        name: "CreateTag",
        meta: {
          title: "创建标签",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        name: "EditTag",
        component: () => import("@/pages/tags/edit"),
        props: true,
        hidden: true,
        meta: {
          title: "编辑标签",
          noCache: true
        }
      },
      {
        path: "list",
        component: () => import("@/pages/tags/list"),
        name: "TagList",
        meta: {
          title: "标签列表",
          icon: "list"
        }
      }
    ]
  },

  /** 文章 */
  {
    path: "/post",
    component: Layout,
    redirect: "/post/list",
    name: "Post",
    meta: {
      title: "博文管理",
      icon: "documentation"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/post/edit"),
        name: "CreatePost",
        meta: {
          title: "创建文章",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        name: "EditPost",
        component: () => import("@/pages/post/edit"),
        props: true,
        hidden: true,
        meta: {
          title: "编辑文章",
          noCache: true
        }
      },
      {
        path: "list",
        component: () => import("@/pages/post/list"),
        name: "PostList",
        meta: {
          title: "文章列表",
          icon: "list"
        }
      }
    ]
  },

  /** 用户 */
  {
    path: "/user",
    component: Layout,
    redirect: "/user/list",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/user/edit"),
        name: "CreateUser",
        meta: {
          title: "创建用户",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        component: () => import("@/pages/user/edit"),
        name: "EditUser",
        meta: {
          title: "编辑用户",
          noCache: true
        },
        hidden: true,
        props: true
      },
      {
        path: "list",
        component: () => import("@/pages/user/list"),
        name: "UserList",
        meta: {
          title: "用户列表",
          icon: "list"
        }
      }
    ]
  },

  /** 评论 */
  {
    path: "/comment",
    component: Layout,
    redirect: "/comment/list",
    name: "Comment",
    meta: {
      title: "评论管理",
      icon: "comment"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/comment/edit"),
        name: "CreateComment",
        meta: {
          title: "创建评论",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        component: () => import("@/pages/comment/edit"),
        name: "EditComment",
        meta: {
          title: "编辑评论",
          noCache: true
        },
        hidden: true,
        props: true
      },
      {
        path: "list",
        component: () => import("@/pages/comment/list"),
        name: "CommentList",
        meta: {
          title: "评论列表",
          icon: "list"
        }
      }
    ]
  },

  /** 任务 */
  {
    path: "/tasks",
    component: Layout,
    redirect: "/tasks/list",
    name: "Task",
    meta: {
      title: "任务管理",
      icon: "documentation"
    },
    children: [
      {
        path: "create",
        component: () => import("@/pages/tasks/edit"),
        name: "CreateTask",
        meta: {
          title: "创建任务",
          icon: "edit"
        }
      },
      {
        path: "edit/:id",
        name: "EditTask",
        component: () => import("@/pages/tasks/edit"),
        props: true,
        hidden: true,
        meta: {
          title: "编辑任务",
          noCache: true
        }
      },
      {
        path: "list",
        component: () => import("@/pages/tasks/list"),
        name: "TaskList",
        meta: {
          title: "任务列表",
          icon: "list"
        }
      }
    ]
  },

  /** 设置 */
  {
    path: "/site",
    component: Layout,
    redirect: "/site/list",
    name: "Site",
    meta: {
      title: "网站管理",
      icon: "setting"
    },
    children: [
      {
        path: "list",
        component: () => import("@/pages/site/list"),
        name: "SiteSettings",
        meta: {
          title: "站点设置",
          icon: "list"
        }
      },

      {
        path: "timeline",
        component: () => import("@/pages/site/list"),
        name: "TimeLine",
        meta: {
          title: "时间轴",
          icon: "list"
        }
      },

      // {
      //   path: "timeline",
      //   component: () =>
      //     import(/* webpackChunkName: 'sitesetting' */ "@/pages/site/list"),
      //   name: "TimeLine",
      //   meta: {
      //     title: "时间轴",
      //     icon: "list"
      //   }
      // },

      {
        path: "banner",
        component: () => import("@/pages/site/list"),
        name: "BannerList",
        meta: {
          title: "轮播设置",
          icon: "list"
        }
      }
    ]
  },

  /** 个人中心 */
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/pages/profile"),
        name: "Profile",
        meta: {
          title: "个人中心",
          icon: "user"
        }
      },
      {
        path: "settings",
        component: () => import("@/pages/profile/settings"),
        name: "Settings",
        meta: {
          title: "个人设置",
          icon: "user"
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
