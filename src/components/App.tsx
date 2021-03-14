import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { Header } from './Header';
import { SettingsModal } from './SettingsModal';
import { Timesheet } from './Timesheet';
import { TimesheetGeneratorForm } from './TimesheetGeneratorForm';

export default function App() {
  return (
    <RecoilRoot>
      <Header />
      <Container>
        <Box className="print-hidden">
          <TimesheetGeneratorForm />
        </Box>
        <Timesheet />
      </Container>
      <SettingsModal />
    </RecoilRoot>
  );
}
