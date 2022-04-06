import { axios } from '@common/httpClient';

const lat = 37.49727934553921;
const lon = 127.03037239848109;
const baseURL = 'https://api.openweathermap.org/data/2.5';
const token = '3ef007645c3ab84ab5e44ddb2577831e';

export const getCurrentForecast = () => {
  return axios.get(`/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric&lang=kr`);
};
