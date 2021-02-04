const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    publicPath: '/recorder/',
    devServer: {
        port: 8082,
        https: true,
        proxy:{
            '/dev': {
                target: 'https://10.123.21.40:8002',
                changeOrigin: true,
                pathRewrite: {
                    "^/dev": ""
                }
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions:{
                    javascriptEnabled: true,
                }
            }
        }
    },
    chainWebpack: (config)=>{
        config.entry = Object.assign({},{
            ...config.entry,
            'babel-polyfill': 'babel-polyfill'
        })
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'));
    },
    configureWebpack: config => {
        config.module.rules.concat([
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, './src')
                ]
            },
        ]);
    }
}