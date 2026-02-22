import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import Modal from 'react-modal';
import OddsAccordion from './accordion/accordion';
import truncate from './truncate/truncate';
import { getTeamIcon } from './teamIcons/teamIcons';

Modal.setAppElement('#root');

const AllMatchesModal = ({ isOpen, onClose, matches }) => {
  const [selectedMatch, setSelectedMatch] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);

  const onSelectMatch = (match) => {
    const dateTime = match.date.toISOString();
    const date = match.date.toLocaleDateString('ru-Ru', {
      day: 'numeric',
      month: 'long',
    });
    const time = match.date.toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const matchDetails = {
      ...match,
      dateID: match.date,
      date: {
        timeSettings: dateTime,
        formattedDate: date,
        formattedTime: time,
      },
    };
    setCurrentMatch(matchDetails);
    setSelectedMatch(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal max-w-5xl w-[90%] max-h-[100%] h-[80%] mx-auto mt-10 bg-dark rounded-lg shadow-xl overflow-y-scroll overflow-x-hidden"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="p-6 max-h-[calc(90vh - 80px)] max-xs:p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-light">Ähli Ligalar</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>

        <div className="space-y-3">
          <h2 className="text-light-gray text-xs font-bold">Ähli Oýunlar</h2>
          {matches.map((match) => {
            const dateTime = match.date.toISOString();

            const formattedDate = match.date.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
            });
            const formattedTime = match.date.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <div
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className="w-full grid grid-cols-3 gap-x-4 items-center p-8 bg-dark-gray rounded-lg shadow-sm font-segoe hover:bg-dark-medium cursor-pointer transition max-xs:p-4">
                <div className="reverse-card">
                  <span
                    className="block max-w-32 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-light font-bold"
                    title={match.team1}>
                    {truncate(match.team1)}
                  </span>
                  <img src={getTeamIcon(match.team1)} alt={match.team1} height={60} width={60} />
                </div>
                <div className="text-center">
                  <div className="w-full flex flex-col items-center text-sm text-light">
                    <time dateTime={dateTime}>{formattedDate}</time>
                    <time dateTime={dateTime}>{formattedTime}</time>
                  </div>
                </div>
                <div className="reverse-card">
                  <span
                    className="block max-w-32 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-light font-bold"
                    title={match.team2}>
                    {truncate(match.team2)}
                  </span>
                  <img src={getTeamIcon(match.team2)} alt={match.team2} height={60} width={60} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ActiveMatchModal
        modalOnActive={selectedMatch}
        modalOnClose={setSelectedMatch}
        currentMatch={currentMatch}
      />
    </Modal>
  );
};

const ActiveMatchModal = ({ modalOnActive, modalOnClose, currentMatch }) => {
  if (!currentMatch) {
    return;
  }
  return (
    <Modal
      isOpen={modalOnActive}
      onRequestClose={() => modalOnClose(false)}
      className="w-[min(90vw,800px)] min-h-[70%] mx-auto mt-10 bg-dark rounded-lg shadow-xl overflow-hidden overflow-y-auto"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="w-full flex flex-col">
        <div className="football-card w-full flex flex-col items-end text-white p-6 mb-2">
          <button onClick={() => modalOnClose(false)} className="">
            <HiX />
          </button>
          <div className="w-full bg-transparent flex justify-around">
            <div className="reverse-card">
              <p className="text-sm">{currentMatch.team1}</p>
              <img
                src={getTeamIcon(currentMatch.team1)}
                alt={currentMatch.team1}
                height={60}
                width={60}
              />
            </div>
            <div className="flex items-center">
              <div className="w-full flex flex-col justify-center items-center text-sm">
                <time dateTime={currentMatch.date?.timeSettings} className="text-center">
                  {currentMatch.date?.formattedDate}
                  <br />
                  {currentMatch.date?.formattedTime}
                </time>
              </div>
            </div>
            <div className="reverse-card">
              <p className="text-sm">{currentMatch.team2}</p>
              <img
                src={getTeamIcon(currentMatch.team2)}
                alt={currentMatch.team2}
                height={60}
                width={60}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <ul className="market-list">
            <li className="flex flex-col gap-y-2">
              <h3 className="font-bold text-2xl border-b-2 border-dark-medium py-2 text-light-gray">
                Netijeler
              </h3>
              {currentMatch.markets.map(({ bets, name }, idx) => (
                <OddsAccordion
                  matchId={currentMatch.id}
                  key={name || idx}
                  team1={currentMatch.team1}
                  team2={currentMatch.team2}
                  localizedDate={currentMatch.date?.formattedDate}
                  date={currentMatch.dateID}
                  bets={bets}
                  name={name}
                />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default AllMatchesModal;
