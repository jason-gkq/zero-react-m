import React from "react";
export default {
  index: [
    {
      path: "/lcbtest/index/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'index' */ /* webpackMode: 'lazy' */ "@/src/pages/index"
        )
      ),
    },
  ],
  common: [
    {
      path: "/lcbtest/common/login/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'login' */ /* webpackMode: 'lazy' */ "@/src/zero/pages/login"
        )
      ),
    },
  ],
  home: [
    {
      path: "/lcbtest/home/home2/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'home2' */ /* webpackMode: 'lazy' */ "@/src/pages/home/home2"
        )
      ),
    },
    {
      path: "/lcbtest/home/home3/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'home3' */ /* webpackMode: 'lazy' */ "@/src/pages/home/home3"
        )
      ),
    },
  ],
  my: [
    {
      path: "/lcbtest/my/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'my' */ /* webpackMode: 'lazy' */ "@/src/pages/my"
        )
      ),
    },
  ],
  setting: [
    {
      path: "/lcbtest/setting/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'my' */ /* webpackMode: 'lazy' */ "@/src/pages/setting"
        )
      ),
    },
  ],
};
