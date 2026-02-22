import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getTeamIcon } from './teamIcons/teamIcons';
import truncate from './truncate/truncate';
import AllMatchesModal from './allMatchesModal';
import { useBetSlip } from './BetContext/BetSlipContext';

const Events = ({ c4, league }) => {
  const { handleAddToSlip, isBetInSlip } = useBetSlip();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const now = new Date();

    setIsLoading(true);
    const q = query(collection(db, 'matches'), where('date', '>=', now), orderBy('date', 'asc'));

    const docRef = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(),
          };
        });
        setMatches(list);
        setError(null);
      },
      (error) => {
        console.log('Firestore Error:', error);
        setError('Sorry! there is downloading error! Please try again!');
        setMatches([]);
      },
    );
    return () => docRef();
  }, []);

  const filteredMatches = matches.filter((match) => match.league === league);
  return (
    <>
      <section className="w-full h-full overflow-hidden  bg-dark" ref={c4}>
        <h2 className="visually-hidden">Meşhur wakalar</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="container-wide w-full">
          <div className="w-full flex items-center justify-center">
            {/* <form
              action="/"
              method="post"
              target="_blank"
              className="w-full flex items-center justify-center gap-x-4">
              <select
                id="country"
                className="w-full outline-[0] bg-transparent rounded-button text-light px-8 h-inp-h border-x border-y border-solid border-light-gray">
                <option value="moscow">Moscow</option>
                <option value="Ekaterinburg">Ekaterinburg</option>
                <option value="Austria">Austria</option>
              </select>
              <select
                id="league"
                className="w-full outline-[0] bg-transparent rounded-button text-light px-8 h-inp-h border-x border-y border-solid border-light-gray">
                <option value="Santander-A">Santander A</option>
                <option value="Itly-Srs-A">Italy Series A</option>
                <option value="Spain-la-liga">Spain La Liga</option>
              </select>
              <select
                id="time"
                className="w-full outline-[0] bg-transparent rounded-button text-light px-8 h-inp-h border-x border-y border-solid border-light-gray">
                <option value="12:13">12:13</option>
                <option value="10:00">10:00</option>
                <option value="20:00">20:00</option>
              </select>
              <input
                type="submit"
                value="Filter"
                className="w-full h-inp-h !border-x !border-y !border-solid !border-orange bg-orange rounded-button text-light transition-all hover:bg-inherit hover:text-orange active:text-wheat active:!border-wheat active:scale-105 is-submit"
              />
            </form> */}
          </div>
          <div className="events">
            <header className="heading-above">
              <p className="events-bold-title line-between">{league}</p>
              <button
                className="link-arrow hover:underline transition max-xs:hidden"
                onClick={() => setIsModalOpen(true)}>
                Ähli oýunlar
              </button>
            </header>
            <ul className="popular-events-list">
              {filteredMatches.length > 0 &&
                filteredMatches.slice(0, 4).map((match) => {
                  const dateTime = match.date.toISOString();

                  const formattedDate = match.date.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                  });

                  const formattedTime = match.date.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  // Safely get odds for team1 and team2 from the first market and first bet
                  const betData1 = match.markets?.[0]?.bets?.[0];

                  const team1Odds =
                    match.markets &&
                    match.markets[0] &&
                    match.markets[0].bets &&
                    match.markets[0].bets[0] &&
                    typeof match.markets[0].bets[0].odds === 'number'
                      ? match.markets[0].bets[0].odds.toFixed(2)
                      : '--';

                  const betData2 = match.markets?.[0]?.bets?.[2];

                  const team2Odds =
                    match.markets &&
                    match.markets[0] &&
                    match.markets[0].bets &&
                    match.markets[0].bets[2] &&
                    typeof match.markets[0].bets[2].odds === 'number'
                      ? match.markets[0].bets[2].odds.toFixed(2)
                      : '--';
                  return (
                    <li key={match.id} className="popular-events-item rounded-lg shadow-md">
                      <div className="bet-card">
                        <div className="bet-card-header">
                          <time dateTime={dateTime}>
                            {formattedDate}, {formattedTime}
                          </time>
                        </div>
                        <div className="teams">
                          <div className="team">
                            <img
                              src={getTeamIcon(match.team1)}
                              width="90"
                              height="90"
                              alt={match.team1}
                              className="team-logo"
                            />
                            <span className="team-name" title={match.team1}>
                              {truncate(match.team1)}
                            </span>
                            <button
                              onClick={() => {
                                if (!betData1) return;
                                handleAddToSlip({
                                  matchId: match.id,
                                  localized: formattedDate,
                                  matchDate: match.date,
                                  team1: match.team1,
                                  team2: match.team2,
                                  marketName: match.markets[0]?.name,
                                  betType: betData1.type,
                                  odds: betData1.odds,
                                });
                              }}
                              className={`markets-type flex flex-row justify-between px-3 py-1 mt-1 bg-dark-medium border border-transparent rounded-sm text-light-gray text-base hover:border-blue-400
                            ${
                              isBetInSlip(match.date, match.markets[0]?.name, betData1.type)
                                ? '!bg-[#4D7BB2] !text-white hover:!bg-[#305D91]'
                                : ''
                            }
                            `}>
                              {team1Odds}
                            </button>
                          </div>
                          <span className="vs">vs</span>
                          <div className="team">
                            <img
                              src={getTeamIcon(match.team2)}
                              width="90"
                              height="90"
                              alt={match.team2}
                              className="team-logo"
                            />
                            <span className="team-name" title={match.team2}>
                              {truncate(match.team2)}
                            </span>
                            <button
                              onClick={() => {
                                if (!betData2) return;

                                handleAddToSlip({
                                  matchId: match.id,
                                  localized: formattedDate,
                                  matchDate: match.date,
                                  team1: match.team1,
                                  team2: match.team2,
                                  marketName: match.markets[0]?.name,
                                  betType: betData2.type,
                                  odds: betData2.odds,
                                });
                              }}
                              className={`
                          markets-type 
                          flex 
                          flex-row 
                          justify-between 
                          px-3 
                          py-1 
                          mt-1 
                          bg-dark-medium 
                          border 
                          border-transparent 
                          rounded-sm 
                          text-light-gray 
                          text-base 
                          hover:border-blue-400
                          ${
                            isBetInSlip(match.date, match.markets[0]?.name, betData2.type)
                              ? '!bg-[#4D7BB2] !text-white hover:!bg-[#305D91]'
                              : ''
                          }
                          `}>
                              {team2Odds}
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            {filteredMatches.length === 0 && (
              <div className="text-light-gray text-center py-4">
                <b className="font-bold">{league}</b>-Boýunça şu wagt hiç hili oýun tapylmady! Ähli
                oýunlary görüň!
              </div>
            )}
            <div className="hidden flex-row justify-center pt-4 relative max-xs:flex">
              <button
                className="text-light-gray text-xs hover:underline transition"
                onClick={() => setIsModalOpen(true)}>
                Ähli oýunlar
              </button>
            </div>
          </div>
        </div>
      </section>

      <AllMatchesModal
        loading={isLoading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        matches={matches}
      />
    </>
  );
};

export default Events;
