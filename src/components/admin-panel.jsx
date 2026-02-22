// AdminPanel.jsx
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function AdminPanel() {
  const [form, setForm] = useState({
    team1: '',
    team2: '',
    odds_win1: '',
    odds_draw: '',
    odds_win2: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'matches'), {
        ...form,
        odds_win1: parseFloat(form.odds_win1),
        odds_draw: parseFloat(form.odds_draw),
        odds_win2: parseFloat(form.odds_win2),
        active: true,
        date: new Date(),
      });
      alert('Матч добавлен!');
      setForm({ team1: '', team2: '', odds_win1: '', odds_draw: '', odds_win2: '' });
    } catch (error) {
      alert('Ошибка: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Админка — Добавить матч</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="team1"
          placeholder="Команда 1"
          value={form.team1}
          onChange={(e) => setForm({ ...form, team1: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="team2"
          placeholder="Команда 2"
          value={form.team2}
          onChange={(e) => setForm({ ...form, team2: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="odds_win1"
          type="number"
          step="0.01"
          placeholder="П1"
          value={form.odds_win1}
          onChange={(e) => setForm({ ...form, odds_win1: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="odds_draw"
          type="number"
          step="0.01"
          placeholder="X"
          value={form.odds_draw}
          onChange={(e) => setForm({ ...form, odds_draw: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="odds_win2"
          type="number"
          step="0.01"
          placeholder="П2"
          value={form.odds_win2}
          onChange={(e) => setForm({ ...form, odds_win2: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-bold">
          Добавить матч
        </button>
      </form>
    </div>
  );
}
