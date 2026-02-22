// AdminPanel.jsx
import { useState } from 'react';
import { Box, Container, Tabs, Tab, Typography } from '@mui/material';

import MatchesTab from '../components/admin/MatchesTab';
import BetRequestsTab from '../components/admin/BetRequestsTab';
import ConfirmedBetsTab from './admin/ConfirmedBetsTab.jsx';

export default function AdminPanel() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className=" h-screen text-dark">
      <Container maxWidth="lg" sx={{}}>
        <Typography variant="h4" gutterBottom>
          🔐 Admin Kontrol Panel
        </Typography>

        <Tabs value={tab} onChange={handleChange} sx={{ mb: 3 }}>
          <Tab label="Oýunlar" />
          <Tab label="Talon Teklipler" />
          <Tab label="Kabul edilen" />
        </Tabs>

        {tab === 0 && <MatchesTab />}
        {tab === 1 && <BetRequestsTab />}
        {tab === 2 && <ConfirmedBetsTab />}
      </Container>
    </div>
  );
}
