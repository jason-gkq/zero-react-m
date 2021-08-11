import React from "react";
class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //拖拽
  initDrag() {
    let { panelId, titleId, contentId } = this.props;
    this.panelDom = document.getElementById(panelId);
    this.titleDom = document.getElementById(titleId);
    this.contentDom = document.getElementById(contentId);
    this.backgroundDom = document.body;
    this.bindEvent();
  }

  //region event
  componentDidMount() {
    this.initDrag();
  }
  bindEvent() {
    this.titleDom.onmousedown = this.onMouseDown.bind(this);
    this.titleDom.onmouseup = this.onMouseUp.bind(this);
    this.titleDom.onmousemove = this.onMouseMove.bind(this);

    this.contentDom.onmouseup = this.onContentMouseUp.bind(this);
    this.contentDom.onmousemove = this.onContentMouseMove.bind(this);

    this.backgroundDom.onmouseup = this.onBackgroundMouseUp.bind(this);
    this.backgroundDom.onmousemove = this.onBackgroundMouseMove.bind(this);
    let step = () => {
      this.activeAnimation = true;
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  /**
   * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
   * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
   **/
  onMouseDown(e) {
    const position = this.getPosition(e);
    this.setState({
      moving: true,
      diffX: position.diffX,
      diffY: position.diffY,
    });
  }

  // 松开鼠标，设置modal状态为不可移动
  onMouseUp(e) {
    const { moving } = this.state;
    moving && this.setState({ moving: false });
  }

  // 鼠标移动重新设置modal的位置
  onMouseMove(e) {
    const { moving, diffX, diffY } = this.state;
    if (moving) {
      if (this.activeAnimation) {
        // 获取鼠标位置数据
        const position = this.getPosition(e);
        // 计算modal应该随鼠标移动到的坐标
        const x = position.mouseX - diffX;
        const y = position.mouseY - diffY;
        // 窗口大小，结构限制，需要做调整，减去侧边栏宽度
        const { clientWidth, clientHeight } = document.documentElement;
        const modal = this.panelDom;
        if (modal) {
          // 计算modal坐标的最大值
          const maxHeight = clientHeight - modal.offsetHeight;
          const maxWidth = clientWidth - modal.offsetWidth;
          // 判断得出modal的最终位置，不得超出浏览器可见窗口
          const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0;
          const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0;
          if (this.props.setPanelPosition) {
            this.props.setPanelPosition(left, top);
          }
        }
        this.activeAnimation = false;
      }
    }
  }
  onContentMouseMove(e) {
    let obj = {};
    obj.target = this.titleDom;
    obj.pageX = e.pageX;
    obj.screenY = e.screenY;
    this.onMouseMove(obj);
  }
  onContentMouseUp() {
    this.onMouseUp();
  }
  onBackgroundMouseMove(e) {
    let obj = {};
    obj.target = this.titleDom;
    obj.pageX = e.pageX;
    obj.screenY = e.screenY;
    this.onMouseMove(obj);
  }
  onBackgroundMouseUp() {
    this.onMouseUp();
  }
  //endregion

  //region request
  // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
  getPosition(e) {
    // 标题DOM元素titleDom
    const titleDom = e.target;
    // titleDom的坐标(视窗)
    const X = titleDom.getBoundingClientRect().left;
    // 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
    const Y = this.panelDom.offsetTop;

    // 鼠标点击的坐标(页面)
    let mouseX = e.pageX;
    let mouseY = e.screenY;
    // 鼠标点击位置与modal的位移
    const diffX = mouseX - X;
    const diffY = mouseY - Y;
    return { X, Y, mouseX, mouseY, diffX, diffY };
  }
  //endregion

  //region render
  //endregion

  //region clear
  //endregion

  render() {
    return <></>;
  }
}
export default Draggable;
