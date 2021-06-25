import { createSelector } from "reselect";

export const getState = (state) => state || {};

export const getEnv = (state) => state.env || {};

export const getSystem = (state) => state.system || {};

export const getRoute = (state) => state.route || {};
