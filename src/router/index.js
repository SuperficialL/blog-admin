import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

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

  {
    path: "/blog",
    component: Layout,
    meta: {
      title: "博客管理",
      icon: "list"
    },
    children: [
      /** 分类 */
      {
        path: "categories",
        component: () => import("@/pages/blog/category"),
        name: "Category",
        meta: {
          title: "分类管理",
          // icon: "documentation"
        }
      },

      /** 标签 */
      {
        path: "tags",
        component: () => import("@/pages/blog/tags"),
        name: "Tag",
        meta: {
          title: "标签管理",
          // icon: "documentation"
        }
      },

      /** 文章 */
      {
        path: "posts",
        component: () => import("@/pages/blog/post"),
        name: "Post",
        meta: {
          title: "博文管理",
          // icon: "documentation"
        }
      },
      {
        path: "posts/create",
        component: () => import("@/pages/blog/post/edit"),
        name: "CreatePost",
        hidden: true,
        meta: {
          title: "创建文章",
          // icon: "documentation"
        }
      },
      {
        path: "posts/edit/:id",
        name: "editPost",
        component: () => import("@/pages/blog/post/edit"),
        props: true,
        hidden: true,
        meta: {
          title: "编辑文章",
          noCache: true
        }
      },

      /** 评论 */
      {
        path: "comments",
        component: () => import("@/pages/blog/comment"),
        name: "Comment",
        meta: {
          title: "评论管理",
          // icon: "documentation"
        }
      },
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

  /** 系统设置 */
  {
    path: "/system",
    component: Layout,
    name: "System",
    meta: {
      title: "系统设置",
      icon: "list"
    },
    children: [
      {
        path: "picture",
        component: () => import("@/pages/system/album"),
        name: "Picture",
        meta: {
          title: "相册集",
          icon: "user"
        }
      },
      {
        path: "music",
        component: () => import("@/pages/system/media"),
        name: "Music",
        meta: {
          title: "音乐库",
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

export default new Router({
  mode: IS_DEV ? "hash" : "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => { x: 0; y: 0; },
  routes: constantRouterMap
});
