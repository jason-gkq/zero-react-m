import { handleActions } from "redux-actions";

import staticActions from "./rootAction";

const system = handleActions(
  {
    /**
     *
     * @param {*} state
     * @param {*} param1
     * @returns
     */
    [staticActions.system.setSystem](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

const env = handleActions(
  {
    /**
     * 初始化信息：
     * __clientId
     * parentSessionId
     * sessionId
     * onLunchTime
     * env
     *
     *
     * platformType
     * onLunchOptions
     * onShowOptions
     * appCode
     * utmSource
     * serverTime
     * version
     * groupId
     * groupType
     * token
     */
    [staticActions.env.setEnv](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

const route = handleActions(
  {
    [staticActions.route.setRoute](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    [staticActions.route.currentPage](state, { payload }) {
      const obj = {
        ...state.currentPage,
        ...payload,
      };
      return {
        ...state,
        currentPage: { ...obj },
      };
    },
  },
  {}
);

const user = handleActions(
  {
    [staticActions.user.setUser](state, { payload }) {
      // if (!payload.isLogin) return { isLogin: false };
      return {
        // ...state,
        ...payload,
      };
    },
  },
  {}
);

const shop = handleActions(
  {
    [staticActions.shop.setShop](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

export default {
  system,
  env,
  route,
  user,
  shop,
};
