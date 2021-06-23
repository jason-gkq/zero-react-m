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
export default {
  system,
  env,
};
