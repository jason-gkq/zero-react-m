import { handleActions } from "redux-actions";

import staticActions from "./rootAction";

const system = handleActions(
  {
    [staticActions.system.setSystem](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

const application = handleActions(
  {
    /**
     * 初始化信息：
     * __clientId
     * parentSessionId
     * sessionId
     * onLunchTime
     * env
     * platformType
     *
     *
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
    [staticActions.application.setApplication](state, { payload }) {
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
  application,
};
