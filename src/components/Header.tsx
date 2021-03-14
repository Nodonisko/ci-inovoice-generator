import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { settingsModalVisibleState } from './SettingsModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header = () => {
  const classes = useStyles();
  const showSettingsModal = useSetRecoilState(settingsModalVisibleState);

  const handleOpenSettings = useCallback(() => {
    showSettingsModal(true);
  }, [showSettingsModal]);

  return (
    <AppBar position="static" className="print-hidden">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          CreditInfo timesheet generator
        </Typography>
        <div>
          <IconButton onClick={handleOpenSettings} color="inherit">
            <SettingsIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
