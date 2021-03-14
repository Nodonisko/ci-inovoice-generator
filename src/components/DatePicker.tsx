import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const years = [
  moment().subtract(1, 'year').year(),
  moment().year(),
  moment().add(1, 'year').year(),
] as const;
const currentYear = years[1];

const months = Array.from({ length: 12 }, (value, index) => index);
const currentMonth = months[moment().month()];

export const dateState = atom({
  key: 'dateState',
  default: { year: currentYear, month: currentMonth },
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

export const DatePicker = () => {
  const classes = useStyles();
  const [date, setDate] = useRecoilState(dateState);

  const handleYearChange = useCallback(
    event => {
      setDate({ ...date, year: event.target.value });
    },
    [date, setDate]
  );

  const handleMonthChange = useCallback(
    event => {
      setDate({ ...date, month: event.target.value });
    },
    [date, setDate]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
          <Select value={date.year} onChange={handleYearChange} label="Year">
            {years.map(year => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
          <Select value={date.month} onChange={handleMonthChange} label="Month">
            {months.map(month => (
              <MenuItem value={month}>
                {moment({ month }).format('MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
