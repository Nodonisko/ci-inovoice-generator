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
  const monthWorklogsIds = await fetch(
    createUrl('worklogs', {
      fromTimestamp,
      toTimestamp,
      expand: 'user.displayName',
    }),
    {
      method: 'GET',
      headers: getHeaders(),
    }
  )
    .then(response => response.json())
    .then(json => json.data.map(({ id }: any) => id));
  console.log(monthWorklogsIds);
  const timesheet = fetch(`${apiRootUrl}/odata/v3.0/workLogsWorkItems`, {
    method: 'GET',
    headers: getHeaders(),
  })
    .then(response => response.json())
    .then(json =>
      json.value.filter(({ Id }: any) => monthWorklogsIds.includes(Id))
    )
    .then(sortBy(prop('Timestamp'))) as any;

  return timesheet;
};
