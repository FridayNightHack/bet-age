import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="text-light-gray">
        <div className="mt-32 pb-40">
          <div className="container-wide m-0 mx-auto grid grid-cols-4 gap-10 max-lg:grid-cols-2 max-xs:grid-cols-1">
            <div className="basis-[calc(25%-20px)] max-md:basis-full">
              <img
                src="./assets/logo/bet-age-logo.svg"
                alt="Logo"
                className="w-[3.125rem] h-[3.125rem] object-contain"
              />
              <p className="text-xs mt-3">
                Bet Age - futbol ýaryşlaryň web sahypasy we dünýädäki möhüm ligalaryň hemmesini öz
                içine alýar, şonuň üçin ony ýerli ligalaryňyz üçin, şeýle hem beýleki uly we kiçi
                ligalary üçin ulanyp bilersiňiz!
              </p>
            </div>
            <div className="basis-[calc(25%-20px)] max-md:basis-full">
              <h3 className="text-xl font-semibold">Habarlaşmak üçin</h3>
              <ul className="contacts-list">
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    Biz Barada
                  </a>
                </li>
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    Bize habar iber
                  </a>
                </li>
              </ul>
            </div>
            <div className="basis-[calc(25%-20px)] max-md:basis-full">
              <h3 className="text-xl font-semibold">Çalt giriş</h3>
              <ul className="contacts-list">
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    Ýeňijileriň sanawy
                  </a>
                </li>
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    Kömek
                  </a>
                </li>
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    Gizlinlik we syýasat
                  </a>
                </li>
                <li className="contacts-item">
                  <a href="/" className="contact-link">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="basis-[calc(25%-20px)] max-md:basis-full">
              <h3 className="text-xl font-semibold">Tazelikler</h3>
              <form className="w-full flex items-center justify-center gap-x-0 max-sm:flex-col">
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  className="p-2 border-0 rounded-md flex-grow h-inp-h bg-dark-gray outline-none focus-visible:bg-light focus-visible:text-dark max-sm:w-full"
                  placeholder="Please enter your email"
                  required
                />
                <button type="submit" className="light-button-main is-submit">
                  Gosulmak
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-dark-medium">
          <div className="footer-extra-inner-container container-wide">
            <div className="flex justify-between items-center p-5 px-0 text-xs">
              <p className="text">Bu sahypanyň ähli hukuklary Bet Age degişlidir</p>
              <a href="/" className="p-4">
                <img src="./assets/icon/arrow-up.svg" width="20" height="20" alt="scroll up" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
