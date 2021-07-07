import React from "react";
export default {
  home: [
    {
      path: "/lcbtest/home/home1",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'home1' */ /* webpackMode: 'lazy' */ "@src/pages/home/home1"
        )
      ),
    },
    {
      path: "/lcbtest/home/home2",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'home2' */ /* webpackMode: 'lazy' */ "@src/pages/home/home2"
        )
      ),
    },
    {
      path: "/lcbtest/home/home3",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'home3' */ /* webpackMode: 'lazy' */ "@src/pages/home/home3"
        )
      ),
    },
  ],
  index: [
    {
      path: "/lcbtest/index/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'index' */ /* webpackMode: 'lazy' */ "@src/pages/index/index"
        )
      ),
    },
  ],
  conmmon: [
    {
      path: "/lcbtest/login/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'index' */ /* webpackMode: 'lazy' */ "@src/common/pages/login/index"
        )
      ),
    },
  ],
};
