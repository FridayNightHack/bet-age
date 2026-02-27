import React, { useState } from 'react';
// import useMediaQuery from '../hooks/useMatchMedia';
import { HiMenuAlt1, HiX } from 'react-icons/hi';
import { FaTicket } from 'react-icons/fa6';
import { IoTrashOutline } from 'react-icons/io5';
import { IoIosFootball } from 'react-icons/io';
import { useBetSlip } from './BetContext/BetSlipContext';
import ContactFormModal from './contactFormModal/contactFormModal';

const NavBar = ({ ref }) => {
  const { betSlip, handleDeleteFromSlip, clearBetSlip } = useBetSlip();
  const totalOdds = betSlip.reduce((acc, bet) => acc + bet.odds, 0);
  const [stake, setStake] = useState('');
  const potentialWin = stake ? (totalOdds * parseFloat(stake)).toFixed(2) : '0';
  const [showForm, setShowForm] = useState(false);
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const showSide = () => {
    setIsClicked(true);
  };

  // useEffect(() => {
  //   const screen = window.matchMedia('(min-width: 37.25rem)'); // Мобильные

  //   const handleScreenChange = (e) => {
  //     if (e.matches) {
  //       setSidebarOpen(false); // На мобильных — закрыт по умолчанию
  //     } else {
  //       setSidebarOpen(true); // На десктопе — открыт
  //     }
  //   };

  //   handleScreenChange(screen);
  //   screen.addEventListener('change', handleScreenChange);

  //   return () => screen.removeEventListener('change', handleScreenChange);
  // }, []);

  return (
    <>
      <header className="w-full h-basic text-white fixed backdrop-blur-sm font-basic z-10">
        <div className="container-wide flex items-center justify-between border-b-2 border-dark-gray">
          <button
            type="button"
            className="block overflow-hidden flex-col items-center px-2 custom:hidden "
          >
            <HiMenuAlt1
              className="text-3xl text-white w-[2.18rem]"
              size={35}
              onClick={() => setIsClicked(!isClicked)}
            />
          </button>
          <nav className="header-menu">
            <ul className="flex items-center">
              <li className="header-menu-link">
                <a
                  href="/"
                  className="h-basic relative no-underline items-center px-7 inline-flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    src="./assets/logo/bet-age-logo.svg"
                    width={20}
                    height={20}
                    className="action-img"
                    title="BetAge"
                    alt="Bet-age logo"
                  />
                </a>
              </li>
              <li className="max-xs:hidden">
                <a href="/" className="default-link default-height">
                  Esasy
                </a>
              </li>
              <li className="max-xs:hidden">
                <button onClick={ref} className="default-link default-height">
                  Statistika
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4 ">
            <button
              className="relative flex justify-between items-center"
              onClick={showSide}
            >
              <FaTicket size={25} />
              {betSlip.length > 0 && (
                <span
                  className={`absolute -top-1 -right-1 bg-green-600 w-3 h-3 rounded-full block animate-pulse`}
                ></span>
              )}
            </button>
            <time
              dateTime={new Date().toISOString().split('T')[0]}
              className="max-sm:hidden"
            >
              {new Date().toLocaleDateString('en-CA')}
            </time>
          </div>
        </div>
      </header>
      <aside
        className={`fixed top-0 left-0 w-96 bg-dark h-full z-20 flex-col items-center p-4 gap-y-4  overflow-x-hidden ${
          isClicked ? 'flex' : 'hidden'
        } max-xs:w-full`}
      >
        <div className="w-full relative flex flex-row items-center justify-start gap-x-3">
          <img
            src="./assets/logo/bet-age-logo.svg"
            width={20}
            height={20}
            className="action-img"
            title="logo"
            alt=""
          />
          <p className="text-[1.25rem] font-bold">Bet Age</p>
          <HiX
            size={35}
            className="absolute right-2 z-10 action-img"
            onClick={() => setIsClicked(!isClicked)}
          ></HiX>
        </div>
        <div className="w-full bg-dark-gray p-3 rounded-md overflow-y-scroll overflow-hidden">
          <div className="w-full flex justify-between items-center mb-2">
            <span>Talon</span>
            <button onClick={() => clearBetSlip()}>
              <IoTrashOutline size={20} />
            </button>
          </div>
          {betSlip.length > 0 ? (
            <>
              <ul className="max-h-[16.75rem] flex flex-col gap-y-2 overflow-y-scroll overflow-hidden font-segoe mb-5">
                {/* Список ставок */}
                {betSlip.map(
                  (
                    {
                      matchId,
                      team1,
                      team2,
                      localized,
                      marketName,
                      betType,
                      odds,
                    },
                    index
                  ) => (
                    <li
                      key={`${marketName}-${index}`} // Лучше: уникальный ключ
                      className="bg-dark-medium grid grid-cols-[75%,repeat(2,1fr)] items-center rounded-md max-xs:grid-cols-[70%,repeat(2,1fr)]"
                    >
                      <div className="flex flex-row items-start border-r border-dark-gray px-2 py-2 gap-x-1">
                        <span>
                          <IoIosFootball size={20} className="text-orange" />
                        </span>
                        <div className="flex flex-col gap-y-3">
                          <span className="text-xs text-light-gray">
                            {team1} - {team2} <br />
                            {localized}
                          </span>
                          <span className="text-sm text-gray-300">
                            {betType}
                          </span>
                        </div>
                      </div>
                      <span className="flex justify-center items-center px-3 h-full border-r border-dark-gray text-gray-300">
                        {odds.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteFromSlip(matchId)}
                        className="flex flex-row justify-center items-center"
                      >
                        <HiX />
                      </button>
                    </li>
                  )
                )}
              </ul>
              <div className=" bg-gray-800 text-white p-3 rounded-lg text-center">
                <strong className="text-sm opacity-90 uppercase">
                  Umumy koeffitsient
                </strong>
                <div className="text-2xl font-bold mt-1">
                  x{totalOdds.toFixed(2)}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-light mb-2">
                  Goýum(TMT)
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={stake}
                  onChange={(e) => {
                    if (e.target.value <= 0 || e.target.value > 500) {
                      return setStake(null);
                    }
                    setStake(e.target.value);
                  }}
                  min={0}
                  max={500}
                  className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-semibold"
                />
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg mt-4 text-center shadow-lg">
                <div className="text-sm opacity-90">Mümkin ýeňiş</div>
                <div className="text-2xl font-bold mt-1">
                  {potentialWin} TMT
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    stake && parseFloat(stake) > 0
                      ? setShowForm(true)
                      : alert('Введите сумму');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold transition"
                >
                  Tassyklamak
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 text-sm py-4">Talon Boş</p>
          )}
        </div>
      </aside>
      {showForm && (
        <ContactFormModal
          betSlip={betSlip}
          bettingInfo={{
            amount: `${stake}`,
            totalOdds: totalOdds.toFixed(2),
            potentialWin: `${potentialWin}`,
          }}
          onClose={() => setShowForm(false)}
          onConfirm={() => {
            alert('Sag boluň! Siziň bilen 10 minutdan habarlaşarys!');
            setStake(0);
            // Можно очистить купон
            clearBetSlip();
          }}
        />
      )}
    </>
  );
};

export default NavBar;
