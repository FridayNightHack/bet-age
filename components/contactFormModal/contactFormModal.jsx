// components/ContactFormModal.jsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function ContactFormModal({ betSlip, onClose, onConfirm, bettingInfo }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Preventing the form sending to avoid the updating a page
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking the emptry fields
    if (!name.trim() || !phone.trim()) {
      alert('Заполните имя и телефон');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'bet-requests'), {
        matches: betSlip.map((bet) => ({
          matchId: 2,
          team1: bet.team1,
          team2: bet.team2,
          marketName: bet.marketName,
          betType: bet.betType,
          odds: bet.odds,
        })),
        contact: {
          name,
          phone: phone.replace(/\D/g, ''), // только цифры
        },
        betPrice: {
          totalOdds: bettingInfo.totalOdds,
          amount: bettingInfo.amount,
          potentialWin: bettingInfo.potentialWin,
        },
        placedAt: new Date(),
        status: 'pending',
      });

      // Успешно
      onConfirm(); // например, показать "Спасибо!"
      onClose();
    } catch (error) {
      alert('Ошибка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-xl text-gray-600 font-bold mb-4">Подтвердите ставку</h3>
        <p className="text-sm text-gray-600 mb-4">
          Осталось указать контакт — и мы свяжемся с вами.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby="contact-modal-title">
          <h3 id="contact-modal-title" className="sr-only">
            Подтвердите ставку
          </h3>
          <p className="text-sm text-gray-600">Укажите контактные данные — мы свяжемся с вами.</p>
          {/* Поле: Имя */}
          <div>
            <label htmlFor="bet-name" className="block text-sm font-medium text-gray-700 mb-1">
              Ваше имя
            </label>
            <input
              id="bet-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border text-dark border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
              aria-required="true"
            />
          </div>

          {/* Поле: Телефон */}
          <div>
            <label htmlFor="bet-phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              id="bet-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="^\+993\s?(?:[1-6]\d)\s?\d{2}\s?\d{2}\s?\d{2}$"
              placeholder="+993 XX XX XX XX"
              className="w-full p-3 border text-dark border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
            <p className="text-xs text-gray-500 mt-1">Формат: +993 65 80 95 70</p>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              aria-label="Отмена">
              Назад
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded font-medium">
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"></svg>
                  Отправка...
                </span>
              ) : (
                'Подтвердить'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
