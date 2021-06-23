import { createSelector } from "reselect";

export const getEnv = (state) => state.env || {};

export const getSystem = (state) => state.system || {};
