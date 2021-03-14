import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchTimesheet } from '../features/timesheet';
import { Actions } from './Actions';
import { DatePicker, dateState } from './DatePicker';
import { hasTrackerTokenState } from './SettingsModal';
import { timesheetState } from './Timesheet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: '100%',
    },
    control: {
      padding: theme.spacing(2),
    },
    submit: {
      width: '100%',
    },
  })
);

export const TimesheetGeneratorForm = () => {
  const date = useRecoilValue(dateState);
  const setTimesheet = useSetRecoilState(timesheetState);
  const hasTrackerToken = useRecoilValue(hasTrackerTokenState);

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleGenerateTimesheetClick = useCallback(async () => {
    setLoading(true);
    try {
      const timesheet = await fetchTimesheet(date);
      setTimesheet(timesheet);
    } catch {}
    setLoading(false);
  }, [setTimesheet, setLoading, date]);

  return (
    <Box my={4}>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ height: '100%' }} className={classes.paper}>
            <Box py={3} px={1}>
              <Box mb={2} mr={2}>
                <DatePicker />
              </Box>
              <Box mx={1}>
                <Button
                  startIcon={
                    loading ? <CircularProgress size={22} /> : <ListAltIcon />
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateTimesheetClick}
                  disabled={loading || !hasTrackerToken}
                  className={classes.submit}
                >
                  Get timesheet
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Box py={2}>
              <Actions />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
