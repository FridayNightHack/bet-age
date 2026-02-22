import React, { createContext, useCallback, useContext, useState } from 'react';

const BetSlipContext = createContext();

export const BetSlipProvider = ({ children }) => {
  const [betSlip, setBetSlip] = useState([]);

  const handleAddToSlip = useCallback((newBet) => {
    setBetSlip((prev) => {
      if (prev.some((bet) => bet.matchId === newBet.matchId && bet.betType === newBet.betType)) {
        const filtered = prev.filter((bet) => bet.matchId !== newBet.matchId);
        return [...filtered];
      }
      const filtered = prev.filter((bet) => bet.matchId !== newBet.matchId);
      return [...filtered, newBet];
    });
  }, []);

  const handleDeleteFromSlip = (matchId) => {
    setBetSlip((prevBet) => {
      const filtered = prevBet.filter((bet) => bet.matchId !== matchId);
      return [...filtered];
    });
  };

  const clearBetSlip = () => {
    setBetSlip([]);
  };

  const isBetInSlip = (date, name, betType) => {
    return betSlip.some(
      (bet) => bet.matchDate === date && bet.marketName === name && bet.betType === betType,
    );
  };

  return (
    <BetSlipContext.Provider
      value={{ betSlip, handleAddToSlip, handleDeleteFromSlip, clearBetSlip, isBetInSlip }}>
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) throw new Error('useBetSlip must be used within BetSlipProvider');
  return context;
};
