import axios from "axios";

export async function getUserPermList(payload) {
  return axios
    .post(`/api/token/check`, {
      ...payload,
    })
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((e) => {
      return null;
    });
}
