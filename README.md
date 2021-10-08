#### 项目启动

```shell
yarn install
yarn start
```

#### 打包

```shell
yarn build:dev
yarn build:uat
yarn build:pre
yarn build:prod
```

#### 本地访问

```js
http://localhost:8080/
```

## 项目简介

### 目录结构

.  
| - dest/web // 打包后代码目录  
| - env // 项目业务参数配置  
| - | - env.com.json // 各个环境公共参数  
| - | - env.dev.json // 开发环境  
| - | - env.local.json // 本地  
| - | - env.pre.json // 预发布  
| - | - env.prod.json // 生产  
| - | - env.uat.json // 测试  
| - node_modules  
| - public  
| - | - assets // 媒体资源存放  
| - | - themes // 多主题配置  
| - | - index.html // html 模板  
| - | - manifest.json  
| - src  
| - | - common // 公共组件&页面  
| - | - pages // 业务页面  
| - | - zero // 框架核心文件  
| - | - app.js // 入口  
| - | - app.less // 全局样式  
| - | - app.model.js // 全局 model 配置  
| - | - index.js  
| - jsconfig.json
| - package.json

新增页面目录结构示例：

home // 页面目录名  
│ - components // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - containers // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - index.less // 页面样式，固定名称  
│ - index.model.js // 页面 model，固定名称  
│ - index.js // 页面入口，固定名称
