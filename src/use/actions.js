import {getTokenRequest} from '../services/apptrix';

export const setToken = async (formValues) => {
  const request = await getTokenRequest(formValues);
  switch (request.status) {
    case 200:
      const token = request.payload;
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
      return {payload: token.access};
    default:
      console.error(request.status, request.payload);
      return {error: request.payload.detail};
  };
};
