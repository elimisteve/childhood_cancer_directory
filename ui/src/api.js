import axios from 'axios';

//const apiUrl = 'http://localhost:3000/api/'; //local
const apiUrl = '/api/'; //aws

let token = null;
const setToken = (newToken) => {
  token = 'JWT '+ newToken;
};

const apiObj = axios.create({
  baseURL: apiUrl,
});
apiObj.interceptors.request.use((config) => {
  config.headers.Authorization = token;
  return config;
});
export { setToken };
export default apiObj;
