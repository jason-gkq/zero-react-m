import React, { useEffect } from 'react';
import { createPage, ICProps, navigate, pageStore } from '@/zero';
import { Button } from 'antd-mobile';

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
          }
        ) /
        getDistance(
          {
            x: store.pageX,
            y: store.pageY,
          },
          {
            x: store.pageX2,
            y: store.pageY2,
          }
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

export default createPage({ navBar: true }, (props: ICProps) => {
  console.log(props);
  useEffect(() => {
    pageStore.setPageStatus('success');
  }, []);
  return (
    <>
      <Button onClick={() => navigate.goTo('/personal/center')}>
        去个人中心
      </Button>
    </>
  );
});
