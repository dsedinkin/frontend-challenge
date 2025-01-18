import { TRequest } from "engine/types";

const state = new Map();

const request: TRequest = ({ path, body, method }) =>
  new Promise((resolve, reject) => {
    const dataString = JSON.stringify(path);
    const json = state.get(dataString);
    if (json) {
      resolve(json);
    } else {
      let options = {
        method: method,
        headers: { accept: "application/json", "X-API-KEY": "DEMO-API-KEY" }
      };
      if (body) {
        (options as any).body = body;
      };
      fetch(`https://api.thecatapi.com/v1/${path}`, options)
        .then((data) => data.json())
        .then((resp) => {
          state.set(dataString, resp);
          resolve(resp);
        })
        .catch((error) => reject(error));
    }
  });

const api = {
  search: (params: string) => request({ path: `images/search?${params}`, method: "GET" }),
  getFavorites: () => request({ path: "votes", method: "GET" }),
  setItemFavorite: (body: string) => request({ path: "votes", body, method: "POST" }),
}

export default api;
