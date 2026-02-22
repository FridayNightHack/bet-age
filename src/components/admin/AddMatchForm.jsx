// components/admin/AddMatchForm.jsx
import { useState, useMemo } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
  Autocomplete,
  TextField,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { soccerLeagues } from '../../data/leagues';
import { teamsByLeague } from '../../data/teamsByLeague';

const AddMatchForm = ({ onClose }) => {
  const [form, setForm] = useState({
    team1: '',
    team2: '',
    league: 'La Liga',
    date: '',
  });

  const [markets, setMarkets] = useState([
    {
      name: 'Основной исход',
      bets: [
        { type: 'П1', odds: '' },
        { type: 'X', odds: '' },
        { type: 'П2', odds: '' },
      ],
    },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMarketChange = (marketIndex, betIndex, field, value) => {
    const newMarkets = [...markets];
    newMarkets[marketIndex].bets[betIndex][field] = value;
    setMarkets(newMarkets);
  };

  // Получаем команды текущей лиги
  const leagueTeams = useMemo(() => {
    return teamsByLeague || [];
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = prompt('Введите пароль');
    if (password !== 'B3tM4k3r!@2025') {
      alert('Неверный пароль');
      return;
    }
    try {
      await addDoc(collection(db, 'matches'), {
        ...form,
        date: new Date(form.date),
        markets: markets.map((market) => ({
          name: market.name,
          bets: market.bets
            .filter((bet) => bet.odds)
            .map((bet) => ({
              type: bet.type,
              odds: parseFloat(bet.odds) || 1.0,
            })),
        })),
        active: true,
        status: 'upcoming',
      });
      alert('✅ Матч добавлен!');
      onClose();
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, border: '1px solid #ddd', borderRadius: 1, mb: 4 }}
    >
      <Typography variant="h6" gutterBottom>
        Täze Oýun goşmak
      </Typography>

      {/* Команды */}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}
      >
        <Autocomplete
          freeSolo
          options={leagueTeams}
          value={form.team1}
          onChange={(e, value) => setForm({ ...form, team1: value || '' })}
          onInputChange={(e, newInputValue) =>
            setForm({ ...form, team1: newInputValue })
          }
          renderInput={(params) => (
            <TextField {...params} label="Команда 1" required />
          )}
        />
        <Autocomplete
          freeSolo
          options={leagueTeams}
          value={form.team2}
          onChange={(e, value) => setForm({ ...form, team2: value || '' })}
          onInputChange={(e, newInputValue) =>
            setForm({ ...form, team2: newInputValue })
          }
          renderInput={(params) => (
            <TextField {...params} label="Команда 2" required />
          )}
        />
      </Box>

      {/* Дата и лига */}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}
      >
        <TextField
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          required
          fullWidth
        />
        <Autocomplete
          freeSolo
          options={soccerLeagues}
          value={form.league}
          onChange={(e, value) => setForm({ ...form, league: value || '' })}
          onInputChange={(e, newInputValue) =>
            setForm({ ...form, league: newInputValue })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Лига"
              placeholder="Начните вводить..."
              required
            />
          )}
        />
      </Box>

      {/* Рынки ставок */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Рынки ставок
      </Typography>

      {markets.map((market, marketIndex) => (
        <Box
          key={marketIndex}
          sx={{
            mb: 3,
            p: 2,
            bgcolor: '#f9f9f9',
            borderRadius: 1,
            border: '1px solid #eee',
          }}
        >
          {/* Название рынка */}
          <TextField
            fullWidth
            value={market.name}
            onChange={(e) => {
              const newMarkets = [...markets];
              newMarkets[marketIndex].name = e.target.value;
              setMarkets(newMarkets);
            }}
            placeholder="Название рынка"
            sx={{ fontWeight: 'bold', mb: 2 }}
          />

          {/* Ставки */}
          <Box
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}
          >
            {market.bets.map((bet, betIndex) => (
              <Box key={betIndex} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  value={bet.type}
                  onChange={(e) =>
                    handleMarketChange(
                      marketIndex,
                      betIndex,
                      'type',
                      e.target.value
                    )
                  }
                  placeholder="Тип"
                  sx={{ flex: 1 }}
                />
                <TextField
                  type="number"
                  step="0.01"
                  size="small"
                  value={bet.odds}
                  onChange={(e) =>
                    handleMarketChange(
                      marketIndex,
                      betIndex,
                      'odds',
                      e.target.value
                    )
                  }
                  placeholder="1.90"
                  sx={{ flex: 1 }}
                />
              </Box>
            ))}
          </Box>

          {/* Кнопка: добавить ставку */}
          <Button
            size="small"
            onClick={() => {
              const newMarkets = [...markets];
              newMarkets[marketIndex].bets.push({ type: 'Новый', odds: '' });
              setMarkets(newMarkets);
            }}
            sx={{ mt: 1 }}
          >
            + Добавить ставку
          </Button>
        </Box>
      ))}

      {/* Кнопка: добавить рынок */}
      <Button
        type="button"
        onClick={() => {
          setMarkets([
            ...markets,
            {
              name: 'Тотал голов',
              bets: [
                { type: 'ТБ 2.5', odds: '' },
                { type: 'ТМ 2.5', odds: '' },
              ],
            },
          ]);
        }}
        variant="outlined"
        size="small"
        sx={{ mb: 3 }}
      >
        + Добавить рынок
      </Button>

      {/* Кнопки формы */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        ✅ Добавить матч
      </Button>
      <Button type="button" onClick={onClose} fullWidth sx={{ mt: 1 }}>
        Отмена
      </Button>
    </Box>
  );
};

export default AddMatchForm;
