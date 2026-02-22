// utils/teamIcons.js
const teamIcons = {
  'Real Madrid': './assets/teams/Real-Madrid.webp',
  Barcelona: './assets/teams/Barcelona.webp',
  'Manchester City': './assets/teams/Manchester-City.webp',
  Arsenal: './assets/teams/Arsenal.webp',
  Liverpool: './assets/teams/Liverpool.webp',
  'Manchester United': './assets/teams/Manchester-United.webp',
  Chelsea: './assets/teams/Chelsea.webp',
  'Tottenham Hotspur': './assets/teams/Tottenham-Hotspur.webp',
  PSG: './assets/teams/PSG.webp',
  'Olimpique de Marseille': './assets/teams/Olimpique-de-Marseille.webp',
  Bayern: './assets/teams/Bayern-Munchen.webp',
  'Borussia Dortmund': './assets/teams/Borussia-Dortmund.webp',
  Juventus: './assets/teams/Juventus.webp',
  Milan: './assets/teams/AC-Milan.webp',
  'Inter-Milan': './assets/teams/Inter-Milan.webp',
  Roma: './assets/teams/AS-Roma.webp',
  Lazio: './assets/teams/Lazio.webp',
  Porto: './assets/teams/FC-Porto.webp',
  Benfica: './assets/teams/Benfica.webp',
  Galatasaray: './assets/teams/Galatasaray.webp',
  'Nottingham Forest': './assets/teams/Nottingham-Forest.webp',
  'Newcastle United': './assets/teams/Newcastle.webp',
  'Wolverhampton Wanderes': './assets/teams/Wolverhampton-Wanderes.webp',
  Everton: './assets/teams/Everton.webp',
  'Aston Villa': './assets/teams/Aston-Villa.webp',
  Fulham: './assets/teams/Fulham.webp',
  'Leeds United': './assets/teams/Leeds-United.webp',
  Sevilla: './assets/teams/Sevilla.webp',
  Elche: './assets/teams/Elche.webp',
  Getafe: './assets/teams/Getafe.webp',
  'Real Oviedo': './assets/teams/Real-Oviedo.webp',
  'Real Sociedad': './assets/teams/Real-Sociedad.webp',
  'Athletic Bilbao': './assets/teams/Athletic-Bilbao.webp',
  'Deportivo Alaves': './assets/teams/Deportivo-Alaves.webp',
};

// Заглушка
const placeholder = './assets/teams/placeholder.webp';

export function getTeamIcon(teamName) {
  return teamIcons[teamName] || placeholder;
}
