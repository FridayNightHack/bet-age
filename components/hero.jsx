import React from 'react';
import Events from './events';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Hero = () => {
  return (
    <>
      <section className="bg-dark">
        <h2 className="visually-hidden">Ähli Ligalaryň wakalary</h2>
        <Events league="La Liga" />
        <Events league="Serie A" />
        <div className="container-wide w-full">
          <div id="image-carousel" className="splide" aria-label="Beautiful Images">
            <Splide
              options={{
                heightRatio: 0.4,
              }}
              aria-label="My Favorite Images">
              <SplideSlide>
                <img
                  src="./assets/slider-img/laliga-small.webp"
                  alt="La liga event 1"
                  weight={100}
                  height={100}
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="./assets/slider-img/laliga-2-small.webp"
                  alt="La liga event 2"
                  weight={100}
                  height={100}
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="./assets/slider-img/laliga-3-small.webp"
                  alt="La liga event 3"
                  weight={100}
                  height={100}
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>
        <Events league="Bundesliga" />
      </section>
    </>
  );
};

export default Hero;
