import axios from 'axios';
import {responseHandler} from '../use/helpers';

const api = axios.create({
  baseURL: 'http://erp.apptrix.ru/api',
});
const headers = {
  'Content-Type': 'application/json',
};

export const getTokenRequest = (authData) =>
  api.post('token/', authData, {headers})
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e.response));

export const refreshTokenRequest = (refresh) =>
  api.post('token/refresh/', {refresh}, {headers})
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e));
