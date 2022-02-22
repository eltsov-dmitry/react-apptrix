import {requestHandler} from './helpers';
import {
  getIssuesRequest, getIssueTimesheetRequest,
  getUserRequest,
  getUsersRequest,
} from '../services/youtrack';

export const getToken = () =>
  localStorage.getItem('access');

export const getUsers = async () => {
  return await requestHandler(getUsersRequest);
};
export const getUser = async (id) => {
  return await requestHandler(getUserRequest, id);
};

export const getIssues = async (query) => {
  const issues = await requestHandler(getIssuesRequest, query);
  return issues.payload.map((issue) => {
    issue.project = issue.project.name;
    return issue;
  });
};
export const getIssueTimesheet = async (id) => {
  const timesheet = await requestHandler(getIssueTimesheetRequest, id);
  return timesheet.payload.map((timesheetItem) => {
    timesheetItem.duration = timesheetItem.duration.presentation;
    timesheetItem.author = timesheetItem.author.name;
    return timesheetItem;
  });
};
