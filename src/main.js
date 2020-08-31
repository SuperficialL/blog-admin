import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons";

// 按需导入elementUI
import "./plugins/element.js";

import "normalize.css/normalize.css";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

import "@/styles/index.scss";
// global css

import { getToken } from "@/utils/auth";

import "./permission";

// icon
import * as filters from "@/utils/filters";
// global filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.mixin({
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_UPLOAD_URL || "/api/uploads";
    }
  },
  methods: {
    getAuthHeaders() {
      return {
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
