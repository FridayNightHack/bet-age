// components/admin/MatchesTab.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Box, Button, Alert, Typography, List, ListItem } from '@mui/material';
import AddMatchForm from './AddMatchForm.jsx';

export default function MatchesTab() {
  const [showForm, setShowForm] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const now = new Date();
    const q = query(collection(db, 'matches'), where('date', '>=', now), orderBy('date', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
      setMatches(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Ýaryş goşmak</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Aýyrmak' : 'Goşmak'}
          </Button>
        </Box>

        {showForm && <AddMatchForm onClose={() => setShowForm(false)} />}

        {/* Список текущих матчей (опционально) */}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          📅 Aktiw ýaryşlar({matches.length})
        </Typography>

        {matches.length === 0 ? (
          <Typography color="textSecondary">Aktiw yaryş ýok</Typography>
        ) : (
          <List>
            {matches.map((match) => (
              <ListItem
                key={match.id}
                divider
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}>
                <Box>
                  <Typography fontWeight="bold">
                    {match.team1} vs {match.team2}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {match.league} • {match.date.toLocaleString('ru-RU')}
                  </Typography>
                </Box>

                {/* Опционально: кнопка удаления */}
                {/* <Button
            size="small"
            color="error"
            onClick={() => handleDelete(match.id)}
          >
            Удалить
          </Button> */}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
