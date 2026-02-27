// components/admin/ConfirmedBetsTab.jsx
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Box, List, ListItem, Typography, Divider, Paper } from '@mui/material';

export default function ConfirmedBetsTab() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'bets');

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          confirmedAt: doc.data().confirmedAt?.toDate().toLocaleString('ru-RU'),
          placedAt: doc.data().placedAt?.toDate().toLocaleString('ru-RU'),
        }));
        setBets(list);
        setLoading(false);
      },
      (error) => {
        console.error('Ошибка загрузки ставок:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Typography>Загрузка подтверждённых ставок...</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        ✅ Подтверждённые ставки ({bets.length})
      </Typography>
      {bets.length === 0 ? (
        <Typography color="textSecondary">Нет подтверждённых ставок</Typography>
      ) : (
        <List>
          {bets.map((bet) => (
            <div key={bet.id}>
              <ListItem
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1,
                  p: 2,
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {/* Контакт */}
                <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {bet.contact.name} — {bet.contact.phone}
                </Box>

                {/* Ставки */}
                {bet.matches.map((m, idx) => (
                  <Box key={idx} sx={{ fontSize: '0.95rem', mt: 0.5 }}>
                    <strong>
                      {m.team1} vs {m.team2}
                    </strong>{' '}
                    —{' '}
                    <span style={{ color: '#1976d2' }}>
                      {m.marketName}: {m.betType}
                    </span>{' '}
                    <strong style={{ color: '#d32f2f' }}>{m.odds}</strong>
                  </Box>
                ))}

                {/* Сумма и выигрыш */}
                <Box
                  sx={{ fontSize: '0.9rem', color: 'text.secondary', mt: 1 }}
                >
                  Jemi: <strong>{bet.betPrice.amount}TMT</strong> | Ýeňiş:{' '}
                  <strong>{bet.betPrice.potentialWin}TMT</strong>
                </Box>

                {/* Дата */}
                <Box sx={{ fontSize: '0.85rem', color: 'gray', mt: 1 }}>
                  Tassyklanyldy: {bet.confirmedAt}
                </Box>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Paper>
  );
}
