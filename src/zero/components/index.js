export { default as Layout } from "./layout";
export { default as Header } from "./layout/header";
export { default as Footer } from "./layout/footer";

import { Button as antButton, InputItem as antInputItem } from "antd-mobile";
export const Button = antButton;
export const InputItem = antInputItem;
// export {
// 	Flex,
// 	WhiteSpace,
// 	WingBlank,
// 	Drawer,
// 	Menu,
// 	NavBar,
// 	Popover,
// 	Tabs,
// 	TabBar,
// 	Badge,
// 	Button,
// 	Checkbox,
// 	Calendar,
// 	DatePickerView,
// 	DatePicker
// } from 'antd-mobile';

export * from "./basic";
export * from "./business";
