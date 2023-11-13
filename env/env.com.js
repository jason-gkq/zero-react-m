module.exports.defineConfig = () => ({
  appId: '100',
  appName: 'mobile',
  cachePrefix: 'mobile_',
  layout: {
    title: 'zero-mobile',
    index: '/index/index',
  },
  route: {
    type: 'Browser',
    isAnimated: false,
  },
  webpackConfig: {
    publicUrlOrPath: '/mobile/',
    devServer: {
      port: 8090,
      host: 'localhost',
    },
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
      path: 'work',
      children: [
        {
          path: 'dotask',
          component: 'work/dotask',
          children: [
            {
              path: 'agree',
            },
            {
              path: 'disagree',
            },
          ],
        },
        {
          path: 'donetask',
        },
        {
          path: 'backlog',
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
