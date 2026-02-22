import React, { useRef } from 'react';
import { BetSlipProvider } from '../components/BetContext/BetSlipContext';
import NavBar from '../components/navBar';
import MainContent from '../components/main-content';
import Events from '../components/events';
import Records from '../components/records';
import Hero from '../components/hero';
import Footer from '../components/footer';

function Home() {
  const anchor = useRef(null);
  const anchor2 = useRef(null);
  const scrollTo = () => {
    if (anchor.current) {
      anchor.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  const scrollToRecords = () => {
    if (anchor2.current) {
      anchor2.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  return (
    <BetSlipProvider>
      <div className="bg-[#131115]">
        <NavBar ref={scrollToRecords} />
        <main className="main">
          <h1 className="visually-hidden">Bet-age.Futbol Kafe</h1>
          <MainContent ref={scrollTo} />
          <Events c4={anchor} league="Premier League" />
          <Records c4={anchor2} />
          <Hero />
        </main>
        <Footer />
      </div>
    </BetSlipProvider>
  );
}

export default Home;
