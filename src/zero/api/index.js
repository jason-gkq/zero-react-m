/**
 * zero/api 主要用于js-api的相关封装
 */
export { default as cookieStorage } from "./cache/cookieStorage";
export { default as localStorage } from "./cache/localStorage";
export { default as sessionStorage } from "./cache/sessionStorage";

export {
  setAxiosToken,
  setAxiosBase,
  setCommonData,
  instance,
} from "./net/defaultAxios";

export { navigate, history } from "./navigate";
