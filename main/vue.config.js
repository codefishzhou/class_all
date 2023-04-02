const path = require("path");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin"); //js css 压缩

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isDevelopment = process.env.NODE_ENV === "development"; // 判断是否是生产环境
const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    "element-plus": "ElementPlus ",
  },

  // 通过cdn方式使用
  js: [
    "https://unpkg.com/element-plus/lib/index.js",
    "https://cdn.bootcss.com/vue-router/4.0.0/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/4.0.0/vuex.min.js",
    "https://cdn.bootcss.com/axios/1.3.4/axios.min.js",
    "https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.js",
  ],

  css: ["https://unpkg.com/element-plus/lib/theme-chalk/index.css"],
};
module.exports = {
  outputDir: "../dist",
  publicPath: isDevelopment ? "/" : "http://124.70.41.148/qiankun/host",
  productionSourceMap: isDevelopment,
  devServer: {
    open: true,
    port: 7000,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "https://pocketuni.com.cn",
        changeOrigin: true,
      },
      "/index": {
        target: "https://pocketuni.com.cn",
        changeOrigin: true,
      },
    },
  },
  css: {},

  configureWebpack: {
    name: "第二课堂",
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": resolve("src"), // 本项目
      },
    },
    plugins: [new WindiCSSWebpackPlugin()],
  },
  chainWebpack: (config) => {
    // config.externals = cdn.externals
    // config.plugin("html").tap((args) => {
    //   // 这里我是除本地环境，其余均使用CDN，可自己选择是否配置
    //   args[0].cdn = cdn;
    //   return args;
    // });
    if (!isDevelopment) {
      //product -抽取css
      config.plugin('extract-css').tap(options => {
        options[0].filename = 'static/css/[name].[hash:8].css'
        return options
      })
      //代码压缩
      config.plugin("CompressionPlugin").use(
        new CompressionPlugin({
          test: /\.(js|css|html)$/, // 匹配文件名
          threshold: 10240,
        })
      );
      //分包
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: "chunk-common", // 打包后的文件名
            chunks: "initial", //
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            maxSize: 500000,
            chunks: "initial",
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          axios: {
            name: "chunk-axios",
            test: /[\\/]node_modules[\\/]axios[\\/]/,
            chunks: "initial",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true,
          },
          vue: {
            name: "chunk-vue",
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            chunks: "initial",
            priority: 4,
            reuseExistingChunk: true,
            enforce: true,
          },
          vueRouter: {
            name: "chunk-axios",
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            chunks: "initial",
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
          elementPlus: {
            name: "chunk-element-plus",
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            chunks: "initial",
            maxSize: 500000,
            priority: 6,
            reuseExistingChunk: true,
            enforce: true,
          },
          eleIcons: {
            name: "chunk-element-plus-icons",
            test: /[\\/]node_modules[\\/]icons-vue[\\/]/,
            chunks: "initial",
            priority: 7,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      });
    }
    if (process.env.use_analyzer) {
      // 分析
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    config.optimization
      .minimize(true)
      .minimizer("terser")
      .tap((args) => {
        let { terserOptions } = args[0];
        terserOptions.compress.drop_console = true;
        terserOptions.compress.drop_debugger = true;
        return args;
      });
  },
  //   plugins: [new WindiCSSWebpackPlugin()],
};
