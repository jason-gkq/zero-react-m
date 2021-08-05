/**
 * 收口文件，所有自定义的组件、ant-mobile的组件都需要在此导出，
 * 严禁在页面直接引用ant-mobiled组件 */

/* 基础组件 */
export { default as View } from "./View";
export { default as Text } from "./Text";
export { default as Image } from "./Image";

import {
  Button as antButton,
  InputItem as antInputItem,
  TabBar as antTabBar,
} from "antd-mobile";
export const Button = antButton;
export const InputItem = antInputItem;
export const TabBar = antTabBar;
