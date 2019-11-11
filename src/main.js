import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

// 按需导入elementUI
import "./plugins/element.js";

import "normalize.css/normalize.css";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

import "@/styles/index.scss";
// global css
import { getToken } from "@/utils/auth";

// icon
import "@/icons";
import * as filters from "@/utils/filters";
// global filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.mixin({
  computed: {
    uploadUrl() {
      // return process.env.VUE_APP_UPLOAD_URL || '/admin/uploads'
      // return '/admin/uploads'
      return "http://127.0.0.1:3000/admin/uploads";
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        // Authorization: `Bearer ${localStorage.token || ''}`
        Authorization: `Bearer ${getToken() || ""}`
      };
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
