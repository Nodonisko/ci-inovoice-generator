import moment from 'moment';
import { prop, sortBy } from 'ramda';
import { trackerTokenKey } from '../components/SettingsModal';

// regenerate after deleting from git
const apiRootUrl = 'https://cisvsts.timehub.7pace.com/api';

const getHeaders = () => {
  const trackerToken = localStorage.getItem(trackerTokenKey);
  let headers = new Headers();
  headers.append('Authorization', `Bearer ${trackerToken}`);
  return headers;
};

const defaultParams = {
  'api-version': '3.0',
} as const;

const createUrl = (
  endpoint: string,
  params: { [paramName: string]: string } = {}
) => {
  const queryParams = new URLSearchParams({ ...defaultParams, ...params });

  return `${apiRootUrl}/rest/${endpoint}?${queryParams}`;
};
export const fetchUserInfo = () => {
  fetch(createUrl('me'), {
    method: 'GET',
    headers: getHeaders(),
  })
    .then(response => response.json())
    .then(json => console.log(json));
};

export const fetchTimesheet = async (date: { month: number; year: number }) => {
  const fromTimestamp = moment(date).startOf('month').toISOString();
  const toTimestamp = moment(date).endOf('month').toISOString();

  const timesheet = (await fetch(
    `${apiRootUrl}/odata/v3.0/workLogsWorkItems/?$filter=Timestamp ge ${fromTimestamp} and Timestamp lt ${toTimestamp}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  )
    .then(response => response.json())
    .then(prop('value'))
    .then((sortBy as any)(prop('Timestamp')))) as any;

  console.log(timesheet);

  return timesheet;
};
