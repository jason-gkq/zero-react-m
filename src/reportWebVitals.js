/**
 * 详细介绍
 * 官网：https://github.com/GoogleChrome/web-vitals-extension
 * 指标详解：https://juejin.cn/post/6854573212177694733
 * 插件按照：https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma
 */

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
