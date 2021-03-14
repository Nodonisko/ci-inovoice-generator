import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 5,
      width: 500,
    },
    input: {
      width: '100%',
    },
  })
);

export const settingsModalVisibleState = atom({
  key: 'settingsModalVisible',
  default: false,
});

export const trackerTokenKey = 'trackerToken';
export const trackerTokenState = atom({
  key: trackerTokenKey,
  default: localStorage.getItem(trackerTokenKey) ?? '',
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newToken => {
        localStorage.setItem(trackerTokenKey, newToken as string);
      });
    },
  ],
});

export const SettingsModal = () => {
  const classes = useStyles();
  const [trackerToken, setTrackerToken] = useRecoilState(trackerTokenState);
  const [settingsModalVisible, setSettingsModalVisible] = useRecoilState(
    settingsModalVisibleState
  );

  const handleClose = useCallback(() => {
    setSettingsModalVisible(false);
  }, [setSettingsModalVisible]);

  const handleTrackerTokenChange = useCallback(
    event => {
      setTrackerToken(event.target.value);
    },
    [setTrackerToken]
  );

  return (
    <Modal
      className={classes.modal}
      open={settingsModalVisible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={settingsModalVisible}>
        <div className={classes.paper}>
          <Grid container>
            <Grid xs={11}>
              <Typography variant="h5">Settings</Typography>
            </Grid>
            <Grid xs={1}>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Box>
            <TextField
              label="7Pace access token"
              className={classes.input}
              value={trackerToken}
              onChange={handleTrackerTokenChange}
              helperText="7Pace > Settings > Reporting & REST API > Create New Token"
            />
          </Box>

          <Box mt={4}>
            <Typography variant="caption">
              Don't worry everything is saved in local storage only.
            </Typography>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};
