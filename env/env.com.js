module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'szero-m',
  cachePrefix: 'szero-m_',
  layout: {
    title: 'szero-m',
    index: '/index/index',
  },
  route: {
    // type: "Hash",
    type: 'Browser',
    isAnimated: true,
  },
  // apolloConf: ["DOMS_CONF"],
  webpackConfig: {
    publicUrlOrPath: '/szero-m/',
    port: 8400,
    host: 'localhost',
    headScripts: [
      //   {
      //     src: '//res.wx.qq.com/open/js/jweixin-1.2.0.js',
      //   },
    ],
  },
  routes: [
    {
      path: 'index',
      children: [
        {
          path: 'index',
        },
      ],
    },
    {
      path: 'tools',
    },
    {
      path: 'login',
    },
    {
      path: 'personal',
      children: [
        {
          path: 'center',
        },
      ],
    },
    {
      path: 'common',
      children: [
        {
          path: 'preview',
        },
      ],
    },
  ],
});
