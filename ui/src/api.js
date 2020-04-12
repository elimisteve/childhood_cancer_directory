import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const apiObj = axios.create({
  baseURL: apiUrl,
});
apiObj.interceptors.request.use((config) => {
  if ('token' in sessionStorage) {
    config.headers.Authorization = sessionStorage.token;
  }
  return config;
});


export default apiObj;
