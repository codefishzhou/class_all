const {
    name
} = require('./package');

const isDevelopment = process.env.NODE_ENV === 'development' // 判断是否是生产环境

module.exports = {
    publicPath: isDevelopment ? '' : `./subPages/${name}/`,
    publicPath: isDevelopment ? '' : `./`,
    outputDir: '../dist/subPages/' + name,
    productionSourceMap: isDevelopment,
    devServer: {
        open: false,
        port: 7001,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'window', // 把微应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
};