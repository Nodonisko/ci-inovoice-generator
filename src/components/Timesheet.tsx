import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { path } from 'ramda';
import React, { useEffect } from 'react';
import { atom, selector, useRecoilValue } from 'recoil';

import { dateState } from './DatePicker';

const useStyles = makeStyles(theme => ({
  timesheetTable: {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
    '& th, td': {
      border: '1px solid black',
      textAlign: 'left',
      padding: '3px 10px',
    },
  },
}));

export const timesheetState = atom({
  key: 'timesheet',
  default: [],
});

export const timesheetMetaState = selector({
  key: 'timesheetMeta', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const timesheet = get(timesheetState);
    const date = get(dateState);

    const totalLength = timesheet.reduce(
      (acc: number, item: any) => acc + item.PeriodLength,
      0
    );
    const numberOfMds = totalLength ? (totalLength / (3600 * 8)).toFixed(2) : 0;
    const displayName = path(['0', 'User', 'Name'], timesheet);
    const timesheetDate = moment(date).format('MMMM YYYY');
    return { totalLength, numberOfMds, displayName, timesheetDate };
  },
});

export const Timesheet = () => {
  const classes = useStyles();
  const timesheet: any = useRecoilValue(timesheetState);
  const {
    totalLength,
    numberOfMds,
    displayName,
    timesheetDate,
  } = useRecoilValue(timesheetMetaState);

  useEffect(() => {
    if (displayName) {
      const title = `Timesheet_${displayName}_${timesheetDate}`;
      document.title = title;
    } else {
      document.title = 'CreditInfo timesheet generator';
    }
  }, [displayName, timesheetDate]);

  if (!timesheet.length) return null;

  return (
    <Box>
      <Box>
        <Typography variant="h6">
          Timesheet {timesheetDate} - {displayName}
        </Typography>
      </Box>
      <Box maxWidth="md">
        <table className={classes.timesheetTable}>
          <tr>
            <th>
              <Typography>
                <b>Date</b>
              </Typography>
            </th>
            <th>
              <Typography>
                <b>ID</b>
              </Typography>
            </th>
            <th>
              <Typography>
                <b>Time</b>
              </Typography>
            </th>

            <th>
              <Typography>
                <b>Title</b>
              </Typography>
            </th>
          </tr>
          {timesheet.map((item: any) => (
            <tr>
              <td>
                <Typography>
                  {moment(item.Timestamp).format('MM/D/YYYY')}
                </Typography>
              </td>
              <td>
                <Typography>{item.WorkItemId}</Typography>
              </td>
              <td>
                <Typography>
                  {moment
                    .duration({ seconds: item.PeriodLength })
                    .format('HH:mm', undefined, { trim: false })}
                </Typography>
              </td>
              <td>
                <Typography>{item.WorkItem.System_Title}</Typography>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <th>
              <Typography>
                <b>Total length:</b>
              </Typography>
            </th>
            <th>
              <Typography>
                <b>
                  {moment
                    .duration({ seconds: totalLength })
                    .format('HH:mm', undefined, { trim: false })}
                </b>
              </Typography>
            </th>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <th>
              <Typography>
                <b>MDs</b>
              </Typography>
            </th>
            <th>
              <Typography>
                <b>{numberOfMds}</b>
              </Typography>
            </th>
            <td></td>
          </tr>
        </table>
      </Box>
    </Box>
  );
};
