/**
 * 菜单列表
 * path需要保持唯一
 * permKey表示权限Key值
 * permKey: true表示所有用户都有权限
 * transKey表示翻译文本对应的key
 */
export const menus = [
  {
    name: "首页",
    transKey: "Home",
    path: "/lcbtest",
    icon: "home",
    permKey: true,
    children: [],
  }
];
