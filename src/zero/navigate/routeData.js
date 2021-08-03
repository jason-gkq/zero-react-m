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
      path: "/lcbtest/common/car/edit/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'edit' */ /* webpackMode: 'lazy' */ "@/common/pages/car/edit"
        )
      ),
    },
    {
      path: "/lcbtest/common/login/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'login' */ /* webpackMode: 'lazy' */ "@/common/pages/login"
        )
      ),
    },
  ],
  my: [
    {
      path: "/lcbtest/my/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'my' */ /* webpackMode: 'lazy' */ "@/src/pages/my/my"
        )
      ),
    },
    {
      path: "/lcbtest/my/user/info/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'info' */ /* webpackMode: 'lazy' */ "@/src/pages/my/user/info"
        )
      ),
    },
    {
      path: "/lcbtest/my/user/set/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'set' */ /* webpackMode: 'lazy' */ "@/src/pages/my/user/set"
        )
      ),
    },
  ],
};
