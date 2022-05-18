export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {token} = store.getState();
      console.log(token,'aaa')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );
}
