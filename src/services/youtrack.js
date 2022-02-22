import axios from 'axios';
import {responseHandler} from '../use/helpers';

const api = axios.create({
  baseURL: 'https://demo-apptrix.myjetbrains.com/youtrack/api',
});

// For token from apptrix
const getHeadersApptrix = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access')}`,
});


export const getUsersRequest = () =>
  api.get('users', {
    headers: getHeadersApptrix(),
    params: {fields: 'id,name,login,email'},
  })
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e.response));

export const getUserRequest = (id) =>
  api.get(`users/${id}`, {
    headers: getHeadersApptrix(),
    params: {fields: 'id,name,login,email'},
  })
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e.response));

export const getIssuesRequest = (query) =>
  api.get('issues', {
    headers: getHeadersApptrix(),
    params: {
      fields: 'id,summary,project(name)',
      query,
    },
  })
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e.response));

export const getIssueTimesheetRequest = (id) =>
  api.get(`issues/${id}/timeTracking/workItems`, {
    headers: getHeadersApptrix(),
    params: {
      fields: 'id,author(id,name),duration(presentation)',
    },
  })
      .then((response) => responseHandler(response))
      .catch((e) => responseHandler(e.response));
