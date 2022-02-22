import {refreshTokenRequest} from '../services/apptrix';

const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  const request = await refreshTokenRequest(refresh);
  request.status === 200 ?
      localStorage.setItem('access', request.payload.access) :
      (localStorage.removeItem('access') && localStorage.removeItem('refresh'));
};

export const requestHandler = async (request, requestParams) => {
  const requestData = await request(requestParams);

  switch (requestData.status) {
    case 200:
      return {payload: requestData.payload};
    case 401:
      await refreshToken();
      return requestHandler(request(requestParams));
    default:
      console.error(requestData.status, requestData.payload);
      return {error: requestData.payload};
  };
};

export const responseHandler = (response) => ({
  status: response.status,
  payload: response.data,
});
