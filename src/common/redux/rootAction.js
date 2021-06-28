import { createActions } from "redux-actions";

const staticActions = {
  SYSTEM: {
    SET_SYSTEM: void 0,
    INIT_SYSTEM: void 0,
  },
  ENV: {
    SET_ENV: void 0,
    INIT_ENV: void 0,
  },
  ROUTE: {
    SET_ROUTE: void 0,
    CURRENT_PAGE: void 0,
  },
  NAVIGATE: {
    GOTO: void 0,
    GOBACK: void 0,
    RE_LAUNCH: void 0,
    REDIRECT: void 0,
    REPLACE: void 0,
  },
  SHARE: void 0,
  TEST: void 0,
};
export default createActions(staticActions, {
  // prefix: "global",
  // namespace: ".",
});
