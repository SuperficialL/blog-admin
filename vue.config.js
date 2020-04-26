const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  // 静态资源目录
  // assetsDir: "./static",
  // 输出位置
  outputDir: "../koa-server/public/admin",
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    loaderOptions: {}
  },

  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true
      },
      "/uploads": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },

  chainWebpack: config => {
    /* 添加分析工具 */
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();

      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    }
    // webpack链接API，用于生成和修改webpack配置
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
  }
};
