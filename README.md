## 指南
### 项目启动
```js
npm install;
npm start;
```
本地访问
```js
http://localhost:8080/
```

## 框架
### 目录结构

新增页面目录结构示例：
```js
// pages/home/index
- home
  - conponents
    - DivTest.js
  - containers
    - DivTest.js
  - index.less
  - index.model.js
  - index.js
```
**说明**
- `index.js` 页面入口文件，代码示例：
```js
import React, { Component } from "react"; 
import { BasePage } from "@common/core"; 
import model from "./index.model"; 

import DivTest from "./containers/DivTest";
@BasePage(model) // 必须
class Home extends Component {
  constructor(props) {
    super(props);
  }
  // 页面头部信息配置
  static getConfig() {
    return {
      pageId: "10011",
      name: "home",
      barSettings: {
        title: { text: "首页示例" },
        leftItems: [{ type: 1 }],
        rightItems: [
          {
            text: "保存",
            onPress: "$saveMessage",
          },
        ],
      },
    };
  }

  render() {
    const { $model, $globalActions } = this.props; 
    return <DivTest $model={$model} $globalActions={$globalActions} />;
  }
}
export default Home;
```
- `index.model.js`用于处理页面逻辑，包括初始化的页面数据，接口请求，数据更新处理等。示例代码如下：
```js
import { createModel } from "@src/common/redux";
import { put, call } from "redux-saga/effects";

export default createModel({
  name: "Home", // 存在store里的节点名
  state: { // 页面所需的数据字段
    systemName: "小程序",
    pageStatus: "hhh",
  },
  reducers: { //更新数据
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  sagas: { // 一些异步操作、复杂逻辑处理
    *didMount({ $actions }) {
      console.log("pages/home/index.model.js/saga/didMount");
      yield put($actions.setState({ pageStatus: "234324" }));
    },
  },
  selectors: {}, // 从store里的提取数据
});
```
- `index.less`页面样式
- `conponents/DivTest.js` 页面的纯展示组件，不做多余逻辑处理
- `containers/DivTest.js` 页面的状态组件，用于View和Store的联接

## API
### 基础
- 环境
  - `globalActions.env.setEnv`
  - `globalActions.env.initEnv`

- 对接
  - `globalActions.env.setAppCode`
  - `globalActions.env.setServiceUrl`

- 主题
  - `globalActions.env.changeTheme`
  - `globalActions.env.injectThemes`

- 页面信息
  -  `globalActions.route.setRoute`
  -  `globalActions.route.currentPage`
### 路由
- `globalActions.navigate.goTo({ url: "/home/home1" })`
- `globalActions.navigate.goBack`
- `globalActions.navigate.reLaunch`
- `globalActions.navigate.redirect`
- `globalActions.navigate.replace`

## 组件
### 基础组件
- Button
- Alert
- Badge
- Toast
- Modal
- Picker
- DatePicker
- Calendar
- Swiper
- Drawer
- Popover
- Loading


### 业务组件
- 店铺信息组件 StoreInfo
- 登录组件 OathLogin
- 技术支持 TechSupport
- Loading
- PageLoading
- Share
- 选品牌-车型
- 选年款
- 客服组
- 打电话
- 支付
- 订单结果
- 公众号
- Tab


---
指南：启动、配置项（登录，权限，TabBar配置）、打包命令

框架： 开发规范、目录结构规范、核心功能引入规范、common和pages页面模块导入导出规范;

组件：基础组件、业务组件

API：页面跳转、设置主题、接口请求、缓存cache、环境、路由，appCode切换、请求地址切换、转发、

---

### 项目配置文件

- .gitignore 忽略不提交的 git 文件
- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore

- lodash 工具库
- react
- react-copy-to-clipboard 复制剪切板操作
- react-dom
- react-hot-loader 热编译
- react-redux
- react-router
- react-router-redux
- redux
- redux-actions
- redux-mock-store 用于测试 Redux 异步操作创建者和中间件的模拟存储。模拟存储将创建一个调度操作数组，作为测试的操作日志。
- redux-thunk 异步 store 创建的中间件
- redux-logger 日志打印
- redux-arena 将 redux 与 react 打包成一个模块加载，如果 react 组件被卸载，那么 react 组件在 redux 中的 state/reducer/saga 都会被自动卸载，彻底解决 state 树和 reducer 过于庞大的问题
- redux-saga
- require

## 项目构建

1. 本地开发

```
  npm run start
```

2. 格式化代码

```
  yarn prettier --write src/index.js
```

## 代码风格

prettier 介绍

- https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true
- https://www.zhihu.com/question/325832546/answer/694680925

代码格式化主要采用 `prettier` 和 `eslint` 搭配使用，使用 `prettier` 对代码进行格式化，使用 `eslint` 进行代码错误校验。

1. 安装 vsCode 的 `prettier` 插件，并设置为保存时格式化。
2. `eslint`继承 `prettier` 格式化风格规则，不再附加其他规则

产生的包均为本地包：

- prettier 代码格式化，配合插件
- eslint 代码格式化【暂未安装】
- eslint-config-prettier eslint 默认继承使用 prettier 规则插件
- eslint-plugin-react eslint 扩展包 【暂未安装】
- @typescript-eslint/eslint-plugin eslint 扩展包 【暂未安装】
- @typescript-eslint/parser eslint 扩展包 【暂未安装】

产生配置文件：

- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore
- .eslintrc.json eslint 对应的配置文件

```json
// 安装 eslint-config-prettier 使 eslint 可以继承 prettier 规则
{
  "env": {
    "browser": true, // 浏览器环境中的全局变量
    "es2021": true // 启用除了 modules 以外的所有 ECMAScript 6 特性
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/prettier",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {}
}
```

#### redux

- https://zhuanlan.zhihu.com/p/26485702?utm_medium=social&utm_source=wechat_session&from=timeline&s_r=0
- https://github.com/hapood/redux-arena/blob/master/README.zh-CN.MD?utm_medium=social&utm_member=ZTIxOTllMzdkMzdmOTJjMjU5ZTQ1YmQ1NmVmM2MwMzg%3D&utm_source=wechat_session
- https://mp.weixin.qq.com/s/7xutRJpcX1doL-YzHH0jzg
- https://www.zhihu.com/question/47995437
- https://github.com/sorrycc/blog/issues/1
- https://juejin.cn/post/6844903966375936007
- https://juejin.cn/post/6880011662926364679

后续开发计划
打包中

1. 图片和 svg 是否要分开处理，图片支持 cdn，svg 可以打在包中，也可以直接放到代码中

代码框架中寻求所有的最佳解决方案

1. 请求使用 Axios，对 Axios 的封装，包含请求头请求 body 携带公共参数，以及返回错误和异常的处理；
2. 全局页面渲染错误封装主要用于页面渲染；全局 js 错误封装，收集 js 错误，并渲染对应错误页面；
3. redux 封装，并拿出最佳解决方案；
4. 语言包看是否需要改进；
5. 全局 404、403、500 页面封装；
6. 全局路由相关配置，包含自动进入 home 页，当前路由支持刷新，跳转缺省页等等
7. 页面渲染需要路由守卫，进行权限封装；
8. 全局对象封装，包含全局变量、方法、消息等；
9. 前端使用的三种缓存的封装；
10. common 中所有封装要从新改造

### h5 端：

index 统一入口
只展示 layout 或者在路由上自动添加

项目启动公共资源层：
common/global.model.js 定义公共 之后 vendor 封装，也基于此 model
跳转
缓存使用方式
系统启动声明周期管理

用户信息管理
sa
app/index.model.js || 移动到 src 的其他地方
车辆获取

展示层：
现在的 app 是否需要移动到 common/layout-web
Provider、BrowserRouter、Suspense、PersistGate

BasePage 注解层
添加公共展示层，便于之后扩展
处理页面公共事情；如 pv 发送，等等
处理当前页面的 createModel 等

### 小程序端：

index 每个页面入口
只展示 layout 自动在路由上添加
是否需要 layout ？

项目启动公共资源层：
common/global.model.js 定义公共 之后 vendor 封装，也基于此 model
跳转
缓存使用方式
系统启动声明周期管理

用户信息管理
sa
app/index.model.js || 移动到 src 的其他地方
车辆获取

展示层：
现在的 app 是否需要移动到 common/layout-micro
不做任何展示层面的封装，是否有必要？

BasePage 注解层
封装页面外层展示 Provider、BrowserRouter、Suspense、PersistGate 等
添加公共展示层，便于之后扩展
处理页面公共事情；如 pv 发送，等等
处理当前页面的 createModel 等

类 rn 端

```js
import React from "react";
import { render, h } from "react-dom";
import App from "./app";

export default function createApp() {
  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);

  render(<App />, container);
}

import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

render(<App />, document.getElementById("root"));

// 非小程序端，app 中放
const App = (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor} loading={null}> */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route path='/login' component={LoginPage} /> */}
            <Route path={homepage} component={AppPage} />
            <Redirect to={homepage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);
// 小程序端，app 中放
const App = (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor} loading={null}> */}
    <ReactIntlProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route path='/login' component={LoginPage} /> */}
            <Route path={homepage} component={AppPage} />
            <Redirect to={homepage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ReactIntlProvider>
    {/* </PersistGate> */}
  </Provider>
);

<PersistGate persistor={persistor} loading={null}>
  <Layout className={styles.app}>
    <Sider {...siderProps} />
    <RootPage {...rootProps} />
  </Layout>
</PersistGate>;

@BasePage
```
