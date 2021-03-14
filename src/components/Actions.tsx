import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { generateSendTimesheetEmail } from '../features/mail';
import { settingsModalVisibleState, trackerTokenState } from './SettingsModal';
import { timesheetMetaState } from './Timesheet';

const useStyles = makeStyles(theme => ({
  disabled: {
    opacity: 0.5,
  },
}));

export const Actions = () => {
  const { totalLength, timesheetDate } = useRecoilValue(timesheetMetaState);
  const trackerToken = useRecoilValue(trackerTokenState);
  const setSettingsModalVisibility = useSetRecoilState(
    settingsModalVisibleState
  );
  const classes = useStyles();

  const timesheetMailLink = generateSendTimesheetEmail(timesheetDate);
  const isTrackerTokenSet = trackerToken && trackerToken.length > 0;
  const isTimesheetGenerated =
    !isTrackerTokenSet || (totalLength && totalLength > 0);

  const handlePrint = useCallback(event => {
    event.preventDefault();
    window.print();
  }, []);
  const handleSettingsClick = useCallback(
    event => {
      event.preventDefault();
      setSettingsModalVisibility(true);
    },
    [setSettingsModalVisibility]
  );

  return (
    <Typography variant="h6">
      {!isTrackerTokenSet ? (
        <Box py={3} px={3}>
          <Typography variant="h5">
            Please set 7Pace tracker token in{' '}
            <Link href="/" onClick={handleSettingsClick}>
              Settings.
            </Link>
          </Typography>
        </Box>
      ) : (
        <ol style={{ margin: 0 }}>
          <li className={!isTrackerTokenSet ? classes.disabled : ''}>
            Select month and generate timesheet.
          </li>
          <li className={!isTimesheetGenerated ? classes.disabled : ''}>
            Export this page to PDF using{' '}
            <Link href="/" onClick={handlePrint}>
              Print
            </Link>{' '}
            (or Ctrl + P).
          </li>
          <li className={!isTimesheetGenerated ? classes.disabled : ''}>
            <Link href={timesheetMailLink}>Send timesheet for approval.</Link>{' '}
            (Don't forget add timesheet as attachment!)
          </li>
        </ol>
      )}
    </Typography>
  );
};
