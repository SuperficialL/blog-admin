const path = require('path');

function resolve(dir) {
    return path.join(__dirname, './', dir)
}


module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?'/admin/' :'/',
    outputDir: __dirname + '/../server/admin',
    lintOnSave: true,
    productionSourceMap: true,  // 生产环境禁用
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/uploads': {
                target: 'http://127.0.0.1:3000/admin/uploads',
                changeOrigin: true,
                ws: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    chainWebpack: config => {
        // webpack链接API，用于生成和修改webpack配置
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    }
};
