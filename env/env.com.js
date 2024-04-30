const deps = require('../node_modules/@szero/mobile/package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { routes } = require('./routes.js');

module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'mobile',
  cachePrefix: 'mobile_',
  layout: {
    title: 'zero-mobile',
    index: '/index/index',
    footerText: 'Copyright @ everbright securities ****版权所有',
  },
  route: {
    type: 'Browser',
    isAnimated: false,
  },
  needLoginCode: 401,
  REQUEST: {
    BASE: {
      baseURL: 'http://rap2api.taobao.org/app/mock/302222/',
      successCode: 200,
    },
  },
  webpackConfig: {
    publicUrlOrPath: '/mobile/',
    devServer: {
      port: 3200,
      host: 'localhost',
      allowedHosts: 'auto',
      // 代理配置参考
      // proxy: {
      //   '/gateway': {
      //     target: 'http://***.***.***.***:8800',
      //     pathRewrite: { '/gateway': '' },
      //     changeOrigin: true,
      //     proxyTimeout: 60000,
      //   },
      // },
    },
    // 项目需要特定加载的js文件以及需要copy的文件配置参考
    // privateConfig: {
    //   headScripts: [
    //     {
    //       src: 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.common.js',
    //     },
    //   ],
    //   copyOptions: {
    //     patterns: [
    //       {
    //         from: 'public/font_3998592_0n0toue3xba.js',
    //         to: 'lib/font_3998592_0n0toue3xba.js',
    //       },
    //     ],
    //   },
    // },
    plugins: [
      /**
       * 联邦模块相关配置，基站和子模块配置
       * 和vite可以混用，vite打包出的子模块webpack可以正常加载，详细配置键vite
       */
      // 基站配置
      // new ModuleFederationPlugin({
      //   name: 'master',
      //   shared: {
      //     // ...deps,
      //     react: { singleton: true, eager: true, requiredVersion: deps.react },
      //     'react-dom': {
      //       singleton: true,
      //       eager: true,
      //       requiredVersion: deps['react-dom'],
      //     },
      //     'react-router-dom': {
      //       singleton: true,
      //       eager: true,
      //       requiredVersion: deps['react-router-dom'],
      //     },
      //     mobx: {
      //       singleton: true,
      //       eager: true,
      //       // requiredVersion: deps['mobx'],
      //       requiredVersion: '6.12.0',
      //     },
      //     'mobx-react-lite': {
      //       singleton: true,
      //       eager: true,
      //       // requiredVersion: deps['mobx-react-lite'],
      //     },
      //     'antd-mobile': {
      //       singleton: true,
      //       eager: true,
      //       // requiredVersion: deps['antd'],
      //       requiredVersion: '5.16.5',
      //     },
      //     '@szero/mobile': {
      //       singleton: true,
      //       eager: true,
      //       requiredVersion: '2.2.0',
      //     },
      //   },
      // }),
      // 分享模块配置
      // new ModuleFederationPlugin({
      //   name: 'extension_remote', // 模块唯一键，且必为 extension_ 开头
      //   filename: 'remoteEntry.js', // 固定值配置
      //   exposes: {
      //     './Button': './src/Button', // 其他特殊组件分享
      //     './index.module': './src/index.module', // 整个项目以子模块加载时，固定值配置
      //   },
      //   shared: { // 分享模块，与基站配置相同
      //     react: { singleton: true, requiredVersion: false },
      //     'react-dom': { singleton: true, requiredVersion: false },
      //     'react-router-dom': { singleton: true, requiredVersion: false },
      //     mobx: {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     'mobx-react-lite': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     antd: {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     '@ant-design/pro-components': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     '@szero/pc': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //   },
      // }),
    ],
  },
  routes,
});
