import React from 'react';

const leaders = [
  { id: 1, position: 1, name: 'Head x Pain', score: 350 },
  { id: 2, position: 2, name: 'Ka1zifer', score: 200 },
  { id: 3, position: 3, name: 'Peaky Blinders', score: 195 },
  { id: 4, position: 4, name: 'Lucif3r', score: 100 },
  { id: 5, position: 5, name: 'Bvlvarii', score: 59 },
];

const winners = [
  { id: 1, rank: 1, phone: '61******', score: 234 },
  { id: 2, rank: 2, phone: '69******', score: 234 },
  { id: 3, rank: 3, phone: '71******', score: 234 },
];

const Records = ({ c4 }) => {
  return (
    <>
      <section
        className="relative overflow-hidden bg-[url('../public/assets/background/stadium3.webp')] bg-no-repeat bg-center bg-cover"
        ref={c4}>
        <h2 className="visually-hidden">Liderlar we Ýeňijiler</h2>
        <div className="container-wide relative pb-20">
          <ul className="grid grid-cols-2 gap-x-8 max-sm:grid-cols-1">
            <li className="flex flex-col">
              <header className="w-full relative flex justify-center items-center py-[calc(2.5rem*2)]">
                <p className="relative px-4 font-semibold line-between">Liderlar</p>
              </header>
              <ul className="h-full flex flex-col justify-between px-10 bg-dark-gray rounded">
                {leaders.map(({ id, position, name, score }) => (
                  <li key={id} className="rankings-list-item">
                    <span className="relative">
                      <span className="w-[2.875em] aspect-square relative inline-flex items-center justify-center rounded-full mx-2 bg-orange">
                        {position}
                      </span>
                      {name}
                    </span>
                    <span className="rankings-points">{`${score} Score`}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex flex-col">
              <header className="w-full relative flex justify-center items-center py-[calc(2.5rem*2)]">
                <p className="relative px-4 font-semibold line-between">Ýeňijiler</p>
              </header>
              <article className="h-full gap-y-4 grid grid-rows-2">
                <div className="rounded flex flex-col justify-around bg-[#333] rounded-lg shadow-md px-8 py-4">
                  {winners.map(({ id, rank, phone, score }) => (
                    <div key={id} className="flex justify-between items-center px-2">
                      <span className="font-bold">
                        <span className="rank">{rank}</span>
                        {phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1***$2')}
                      </span>
                      <span className="score">{`${score} Score`}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#6A5ACD] p-5 text-center rounded">
                  <div className="flex justify-around items-center mb-5">
                    <div className="text-center">
                      <time className="text-[clamp(28px,3.2vw,48px)] font-bold mb-1 block">06</time>
                      <span className="text-xl capitalize">Gün</span>
                    </div>
                    <div className="text-center">
                      <time className="text-[clamp(28px,3.2vw,48px)] font-bold mb-1 block">22</time>
                      <span className="text-xl capitalize">Sagat</span>
                    </div>
                    <div className="text-center">
                      <time className="text-[clamp(28px,3.2vw,48px)] font-bold mb-1 block">57</time>
                      <span className="text-xl capitalize">Minut</span>
                    </div>
                    <div className="text-center">
                      <time className="text-[clamp(28px,3.2vw,48px)] font-bold mb-1 block">37</time>
                      <span className="text-xl capitalize">Sekund</span>
                    </div>
                  </div>
                  <p className="text-[#ddd]">Bu aýyň ýeňijileri yglan edilýänçä</p>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Records;
