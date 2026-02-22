import React from 'react';

const containerWide = 'max-w-container-wide mx-auto px-4'; // Adjusted for a wider container
const MainContent = ({ ref }) => {
  return (
    <>
      <section className="flex items-center w-full h-[100vh] bg-[url('../public/assets/slider-img/slider-2.webp')] bg-no-repeat bg-cover bg-center py-base bg-dark">
        <h2 className="visually-hidden">Geljekdäki wakalar</h2>
        <div className={`${containerWide} w-full flex flex-col items-start justify-center h-full`}>
          <div className="flex flex-col items-start gap-y-9 max-xs:items-center">
            <span className="main-content-above">Kim ýeňer</span>
            <h3 className="font-medium text-[clamp(40px,3.33vw,100px)]">Göreliň</h3>
            <p className="relative w-[44.375rem] overflow-hidden font-light max-sm:w-[min(47.3vw,710px)] max-xs:w-full">
              Bet Age - futbol ýaryşlaryň web sahypasy we dünýädäki möhüm ligalaryň hemmesini öz
              içine alýar, şonuň üçin ony ýerli ligalaryňyz üçin, şeýle hem beýleki uly we kiçi
              ligalary üçin ulanyp bilersiňiz!
            </p>
            <button
              className="button h-[2.5rem] !border-x !border-y !border-solid !border-orange bg-orange rounded-button text-light transition-all hover:bg-inherit hover:text-orange active:text-wheat active:!border-wheat active:scale-110"
              onClick={ref}>
              Çaklama
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainContent;
