import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BetButton from '../betButton/betButton';
import { useBetSlip } from '../BetContext/BetSlipContext';

const OddsAccordion = ({ matchId, team1, team2, localizedDate, date, bets, name }) => {
  const { handleAddToSlip, isBetInSlip } = useBetSlip();
  return (
    <div className="font-segoe">
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: 'inherit',
          boxShadow: '0',
          flexDirection: 'row-reverse', // ← Это ключевое!
          '& .MuiAccordionSummary-expandIconWrapper': {
            order: 0, // Иконка будет первой
            color: '#C4C4C4',
            marginRight: '0.5rem',
          },
          '& .MuiAccordionSummary-content': {
            order: 1, // Текст будет второй
          },
        }}
        style={{ borderRadius: 0 }}
        className="border-b-2 border-dark-medium">
        <AccordionSummary
          className="accordion-summary"
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header">
          <span className="text-light-gray">{name}</span>
        </AccordionSummary>
        <AccordionDetails className="bg-dark-gray">
          <div className="grid grid-cols-3 grid-flow-row gap-2">
            {bets.map(({ odds, type }) => {
              const inSlip = isBetInSlip(date, name, type);
              return (
                <BetButton
                  matchId={matchId}
                  key={type}
                  team1={team1}
                  team2={team2}
                  marketName={name}
                  betType={type}
                  odds={odds}
                  localized={localizedDate}
                  matchDate={date}
                  isInSlip={inSlip}
                  onAddToSlip={(bet) => handleAddToSlip(bet)}
                />
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OddsAccordion;
