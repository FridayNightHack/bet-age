// components/admin/BetRequestsTab.jsx
import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Divider,
  Paper,
  Alert,
} from '@mui/material';

export default function BetRequestsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Загрузка заявок
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'bet-requests'));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          submittedAt: doc.data().placedAt?.toDate().toLocaleString('ru-RU'),
        }));
        setRequests(list);
      } catch (err) {
        setError('Ошибка загрузки заявок: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  // Подтверждение ставки
  const handleConfirm = async (request) => {
    if (!window.confirm(`Подтвердить ставку от ${request.contact.name}?`))
      return;
    try {
      // 1. Добавляем в `bets`
      await addDoc(collection(db, 'bets'), {
        ...request,
        requestId: request.id,
        status: 'confirmed',
        confirmedAt: new Date(),
      });

      // 2. Удаляем из `bet-requests`
      await deleteDoc(doc(db, 'bet-requests', request.id));

      // 3. Обновляем UI
      setRequests((prev) => prev.filter((req) => req.id !== request.id));

      alert('✅ Ставка подтверждена!');
    } catch (error) {
      alert('❌ Ошибка: ' + error.message);
    }
  };

  if (loading) return <Typography>Загрузка заявок...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📥 Täze Teklipler ({requests.length})
      </Typography>

      {requests.length === 0 ? (
        <Typography color="textSecondary">Täze teklip ýok</Typography>
      ) : (
        <List>
          {requests.map((req) => (
            <div key={req.id}>
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
                  {req.contact.name} — {req.contact.phone}
                </Box>

                {/* Ставки */}
                {req.matches.map((bet, idx) => (
                  <Box key={idx} sx={{ fontSize: '0.95rem', mt: 0.5 }}>
                    <strong>
                      {bet.team1} vs {bet.team2}
                    </strong>{' '}
                    —{' '}
                    <span style={{ color: '#1976d2' }}>
                      {bet.marketName}: {bet.betType}
                    </span>{' '}
                    <strong style={{ color: '#d32f2f' }}>{bet.odds}</strong>
                  </Box>
                ))}

                {/* Сумма и выигрыш */}
                <Box
                  sx={{ fontSize: '0.9rem', color: 'text.secondary', mt: 1 }}
                >
                  Jemi: <strong>{req.betPrice.amount}TMT</strong> | Mümkin
                  ýeňiş: <strong>{req.betPrice.potentialWin}TMT</strong>
                </Box>

                {/* Дата */}
                <Box sx={{ fontSize: '0.85rem', color: 'gray', mt: 1 }}>
                  {req.submittedAt}
                </Box>

                {/* Кнопка подтверждения */}
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => handleConfirm(req)}
                  sx={{ mt: 2 }}
                >
                  ✅ Подтвердить
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Paper>
  );
}
