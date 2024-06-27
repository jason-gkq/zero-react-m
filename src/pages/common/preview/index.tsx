import React, { useCallback, useEffect, useRef } from 'react';
import { ErrorBlock } from 'antd-mobile';
import { createPage, pageStore, useMergeState, debounce } from '@/zero';
import { requestFile } from '@/src/common/hooks';
import { renderAsync } from 'docx-preview';
import './index.less';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js');

import Spreadsheet from 'x-data-spreadsheet';
import { getData, readExcelData, transferExcelToSpreadSheet } from './excel';
import { renderImage, clearCache } from './media';
import { readOnlyInput } from './hack';

/**
 * getClientRects()
 * getClientRects()的作用是获取元素占据页面的所有矩形区域：
 * var rectCollection = object.getClientRects();
 * getClientRects() 返回一个TextRectangle集合，就是TextRectangleList对象。
 * TextRectangle对象包含了, top, left, bottom, right, width, height六个属性。
 * 对于文本对象，W3C提供了一个TextRectangle对象，这个对象是对文本区域的一个解释。
 * 这里的文本区域只针对inline 元素，比如：a, span, em这类标签元素。
 * getClientRects()常用于获取鼠标的位置，如放大镜效果。微博的用户信息卡也是通过改方法获得的。
 *
 * getBoundingClientRect()
 * getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
 * getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含页面看不见的部分）。
 * 该函数返回一个Object对象，该对象有6个属性：top, left, bottom, right, width, height；
 * 这里的top、left和css中的理解很相似，width、height是元素自身的宽高，但是right，bottom和css中的理解有点不一样。
 * right是指元素右边界距窗口最左边的距离，bottom是指元素下边界距窗口最上面的距离。
 *
 * 返回类型差异：
 * getClientRects 返回一个TextRectangle集合，就是TextRectangleList对象。
 * getBoundingClientRect 返回 一个TextRectangle对象，即使DOM里没有文本也能返回TextRectangle对象.
 *
 */

export const previewTypes = [
  'png',
  'gif',
  'jpg',
  'jpeg',
  'pdf',
  'docx',
  'xlsx',
];
//gif, jpg, jpeg, png, csv, excel, ppt, docx
// const touchScale = function (seletor: any) {
//   // 参数one是为了区分屏幕上现在是一根手指还是两根手指，因为在滑动的时候两根手指先酱开一根会触发
//   let one = false;
//   const $touch = $(seletor);
//   let imgLeft = parseInt($touch.css('left'));
//   let imgTop = parseInt($touch.css('top'));
//   const originalWidth: number = $touch.width();
//   const originalHeight: number = $touch.height();
//   const baseScale = parseFloat(String(originalWidth / originalHeight));
//   const store: any = {
//     scale: 1,
//   };
//   function siteData(name: any) {
//     imgLeft = parseInt(name.css('left'));
//     imgTop = parseInt(name.css('top'));
//   }
//   // 获职坐桥之问的距离
//   function getDistance(start: any, stop: any) {
//     return Math.hypot(stop.x - start.x, stop.y - start.y);
//   }
//   // $(seletor)-parent().selectort我们可以选择类，不一定要指定1d
//   // $('#'+).on ('touchstart touchmove touchend', function (event) {
//   document.on(
//     'touchstart touchmove touchend',
//     $(seletor).parent().selector,
//     function (event: any) {
//       const $me = $(seletor);
//       const touch1 = event.originalEvent.targetTouches[0]; // 第一根手指touch事件
//       const touch2 = event.originalEvent.targetTouches[1];
//       // 第二根手指touch事件
//       const fingers = event.originalEvent.touches.length;
//       // 屏幕上手指数量
//       //手指放到屏幕上的时候，还没有进行其他操作
//       if (event.type == 'touchstart') {
//         // 阳止事件冒泡
//         event.preventDefault();
//         // 第一个觯摸点的坐标
//         store.pagex = touch1.pagex;
//         store.pageY = touch1.pageY;
//         if (fingers == 2) {
//           store.pageX2 = touch2.pagex;
//           store.pageY2 = touch2.pageY;
//           store.moveable = true;
//           one = false;
//         } else if (fingers == 1) {
//           one = true;
//         }
//         store.originScale = store.scale || 1;
//       } else if (event.type == 'touchmove') {
//         //手指在屏幕上滑动
//         event.preventDefault();
//         if (fingers == 2) {
//           if (!store.moveable) {
//             return;
//           }
//           // 双指移动
//           if (touch2) {
//             if (!store.pageX2) {
//               store.pageX2 = touch2.pageX;
//             }
//             if (!store.pageY2) {
//               store.pageY2 = touch2.pageY;
//             }
//           } else {
//             return;
//           }
//           // 双指縮放比例计算：originscale/scale=初始距离/ 后来距离，即：scale=t
//           const zoom =
//             getDistance(
//               {
//                 x: touch1.page,
//                 y: touch1.pageY,
//               },
//               {
//                 x: touch2.page,
//                 y: touch2.pageY,
//               }
//             ) /
//             getDistance(
//               {
//                 x: store.page,
//                 y: store.pageY,
//               },
//               { x: store.pageX2, y: store.pageY2 }
//             );
//           let newScale = store.originScale * zoom;
//           // 最大缩放比例限制
//           if (newScale > 3) {
//             newScale = 3;
//           }
//           store.scale = newScale;
//           $me.css({});
//         } else if (fingers == 1) {
//           if (one) {
//             $me.css({
//               left: imgLeft + (touch1.pageX - store.pageX),
//               top: imgTop + (touch1.pageY - store.page),
//             });
//           }
//         }
//       }else if (event.type == 'touchend'){
//         store.moveable = false;
//         delete store.pageX2;
//         delete store.pageY2
//       }
//     }
//   );
// };

const aa = function (eleImg: any) {
  const store: any = {
    scale: 1,
  };

  // 缩放事件的处理
  eleImg.addEventListener('touchstart', function (event: any) {
    var touches = event.touches;
    var events = touches[0];
    var events2 = touches[1];

    // event.preventDefault();

    // 第一个触摸点的坐标
    store.pageX = events.pageX;
    store.pageY = events.pageY;

    store.moveable = true;

    if (events2) {
      store.pageX2 = events2.pageX;
      store.pageY2 = events2.pageY;
    }

    store.originScale = store.scale || 1;
  });
  document.addEventListener('touchmove', function (event) {
    if (!store.moveable) {
      return;
    }

    // event.preventDefault();

    const touches = event.touches;
    const events = touches[0];
    const events2 = touches[1];
    // 双指移动
    if (events2) {
      // 第2个指头坐标在touchmove时候获取
      if (!store.pageX2) {
        store.pageX2 = events2.pageX;
      }
      if (!store.pageY2) {
        store.pageY2 = events2.pageY;
      }
      // 获取坐标之间的举例
      const getDistance = function (start: any, stop: any) {
        return Math.hypot(stop.x - start.x, stop.y - start.y);
      };

      // 双指缩放比例计算

      const zoom =
        getDistance(
          {
            x: events.pageX,
            y: events.pageY,
          },
          {
            x: events2.pageX,
            y: events2.pageY,
          },
        ) /
        getDistance(
          {
            x: store.pageX,
            y: store.pageY,
          },
          {
            x: store.pageX2,
            y: store.pageY2,
          },
        );
      // 应用在元素上的缩放比例
      let newScale = store.originScale * zoom;
      // 最大缩放比例限制
      if (newScale > 3) {
        newScale = 3;
      }
      // 记住使用的缩放值
      store.scale = newScale;
      // 图像应用缩放效果
      const x = store.pageX + -store.pageX * newScale; // 缩放中心偏移量
      const y = store.pageY + -store.pageY * newScale;
      // eleImg.style.transform = 'scale(' + newScale + ')';
      eleImg.style.transform = `scale(${newScale})`;
      eleImg.style.transformOrigin = `${x} ${y}`;
    }
  });

  document.addEventListener('touchend', function () {
    store.moveable = false;

    delete store.pageX2;
    delete store.pageY2;
  });
  document.addEventListener('touchcancel', function () {
    store.moveable = false;

    delete store.pageX2;
    delete store.pageY2;
  });
};

// function aa1() {
//   let TRANSITION = 'transition';
//   let TRANSITION_END = 'transitionend';
//   let TRANSFORM = 'transform';
//   let TRANSFORM_PROPERTY = 'transform';
//   let TRANSITION_PROPERTY = 'transition';
//   const distance: any = {};
//   let origin: any;
//   let scale = 1;
//   if (typeof document.body.style.webkitTransform !== undefined) {
//     TRANSFORM = 'webkitTransform';
//     TRANSITION = 'webkitTransition';
//     TRANSITION_END = 'webkitTransitionEnd';
//     TRANSFORM_PROPERTY = '-webkit-transform';
//     TRANSITION_PROPERTY = '-webkit-transition';
//   }
//   function getDistance(start: any, stop: any) {
//     return Math.sqrt(
//       Math.pow(stop.x - start.x, 2) + Math.pow(stop.y - start.y, 2)
//     );
//   }

//   function getScale(start: any, stop: any) {
//     return getDistance(start[0], start[1]) / getDistance(stop[0], stop[1]);
//   }

//   function getOrigin(first: any, second: any) {
//     return {
//       x: (first.x + second.x) / 2,
//       y: (first.y + second.y) / 2,
//     };
//   }
//   function handleTouch(e: any) {
//     switch (e.type) {
//       case 'touchstart':
//         if (e.touches.length > 1) {
//           distance.start = getDistance(
//             {
//               x: e.touches[0].screenX,
//               y: e.touches[0].screenY,
//             },
//             {
//               x: e.touches[1].screenX,
//               y: e.touches[1].screenY,
//             }
//           );
//         }
//         break;
//       case 'touchmove':
//         if (e.touches.length === 2) {
//           origin = getOrigin(
//             {
//               x: e.touches[0].pageX,
//               y: e.touches[0].pageY,
//             },
//             {
//               x: e.touches[1].pageX,
//               y: e.touches[1].pageY,
//             }
//           );
//           distance.stop = getDistance(
//             {
//               x: e.touches[0].screenX,
//               y: e.touches[0].screenY,
//             },
//             {
//               x: e.touches[1].screenX,
//               y: e.touches[1].screenY,
//             }
//           );
//           scale = distance.stop / distance.start;
//           setScaleAnimation(scale, true);
//         }
//         break;
//       case 'touchend':
//         scale = 1;
//         setScaleAnimation(scale);
//         break;
//       case 'touchcancel':
//         scale = 1;
//         setScaleAnimation(scale);
//         break;
//       default:
//     }
//   }
//   function setScaleAnimation(scale: any, animation?: any) {
//     var transition_animation = '';
//     var x, y;
//     if (animation) {
//       transition_animation = 'none';
//     } else {
//       transition_animation = TRANSFORM_PROPERTY + ' 0.3s ease-out';
//     }
//     element.style[TRANSITION] = transition_animation;
//     // 计算位移偏量
//     x = origin.x + -origin.x * scale; // 缩放中心偏移量
//     y = origin.y + -origin.y * scale;

//     // 缩放和位移
//     element.style[TRANSFORM] =
//       'matrix(' + scale + ', 0, 0, ' + scale + ', ' + x + ', ' + y + ')';
//   }
// }

export default createPage({ navBar: { title: '预览' } }, () => {
  const { fileName, name } = pageStore.params;
  const nameArr = name.split('.');
  const fileType = nameArr.pop();
  const fileRealName = nameArr.join('.');
  // const pdfRef = useRef();
  const wrapperRef = useRef();
  const rootRef = useRef();

  const [state, setState] = useMergeState<any>({
    imgdata: null,
    isEmpty: false,
    pdfPages: undefined,
  });
  const { imgdata, isEmpty, pdfPages } = state;

  const renderPage = useCallback(
    (pdfDoc: any, num: number) => {
      pdfDoc.getPage(num).then((page: any) => {
        // 设置canvas相关的属性
        const canvas: any = document.getElementById(`pdf-${num}`);
        const ctx = canvas && canvas?.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        const ratio = dpr / bsr;
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        if (viewport.width > document.documentElement.clientWidth) {
          canvas.style.width = '100%';
        } else {
          canvas.style.width = Math.floor(viewport.width) + 'px';
        }
        // canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        // 数据渲染到canvas画布上
        // page.render(renderContext);
        const renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
          if (pdfPages > num) {
            renderPage(pdfDoc, num + 1);
          }
        });
      });
    },
    [pdfPages],
  );

  useEffect(() => {
    requestFile(fileName)
      .then((data: any) => {
        if (['docx'].includes(fileType)) {
          const doc = document.getElementById('preview-docx');
          doc &&
            renderAsync(data, doc).then(() => {
              const eleImg: any = document.querySelector('.docx-wrapper');
              eleImg && console.log(eleImg);
              aa(eleImg);
            });
        } else if (['pdf'].includes(fileType)) {
          PDFJS.getDocument(data).promise.then((pdfDoc) => {
            const numPages = pdfDoc.numPages; // pdf的总页数
            setState({
              pdfPages: numPages,
            });
            setTimeout(() => {
              for (let i = 1; i <= numPages; i++) {
                renderPage(pdfDoc, i);
              }
            });
          });
        } else if (['xlsx'].includes(fileType)) {
          let workbookDataSource = {
            _worksheets: [],
          };
          let mediasSource = [];
          let sheetIndex = 1;
          let ctx = null;
          let xs = null;
          let offset = null;
        } else {
          const imgdata: any = window.URL.createObjectURL(new Blob([data]));
          setState({
            imgdata,
          });
        }
        pageStore.pageStatus = 'success';
      })
      .catch(() => {
        setState({
          filedata: null,
          isEmpty: true,
        });
        pageStore.pageStatus = 'success';
      });
    pageStore.setPageTitle(fileRealName);
  }, []);

  if (!previewTypes.includes(fileType)) {
    return (
      <ErrorBlock
        fullPage
        title='无法打开文件'
        description='不支持当前文件预览'
      />
    );
  }
  if (isEmpty) {
    return (
      <ErrorBlock
        style={{ width: '100%' }}
        status='empty'
        fullPage
        title='文件获取失败'
        description='无法获取文件，请联系管理员'
      />
    );
  }
  return (
    <div style={{ overflow: 'auto' }}>
      {imgdata && <img src={imgdata} />}
      {['docx', 'doc'].includes(fileType) && <div id='preview-docx'></div>}
      {['xlsx'].includes(fileType) && (
        <div className='vue-office-excel' ref='wrapperRef'>
          <div className='vue-office-excel-main' ref='rootRef'></div>
        </div>
      )}
      {pdfPages && (
        <div
          style={{
            background: 'gray',
            padding: '30px 0',
            position: 'relative',
          }}
        >
          {Array.from({ length: pdfPages }, (v, k) => k).map((i: number) => {
            return (
              <canvas id={`pdf-${i + 1}`} key={i} style={{ width: '100%' }} />
            );
          })}
        </div>
      )}
    </div>
  );
});
