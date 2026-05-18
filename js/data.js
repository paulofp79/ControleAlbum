// Dados das figurinhas - Copa do Mundo FIFA 2026

const TEAMS = {
  USA: { name: 'Estados Unidos', flag: '🇺🇸', color: '#B22234', players: ['Christian Pulisic', 'Matt Turner', 'Tyler Adams', 'Weston McKennie', 'Ricardo Pepi', 'Timothy Weah'] },
  CAN: { name: 'Canadá',         flag: '🇨🇦', color: '#FF0000', players: ['Alphonso Davies', 'Jonathan David', 'Cyle Larin', 'Milan Borjan', 'Tajon Buchanan', 'Stephen Eustáquio'] },
  MAR: { name: 'Marrocos',       flag: '🇲🇦', color: '#006233', players: ['Achraf Hakimi', 'Youssef En-Nesyri', 'Hakim Ziyech', 'Yassine Bono', 'Sofyan Amrabat', 'Azzedine Ounahi'] },
  KOR: { name: 'Coreia do Sul',  flag: '🇰🇷', color: '#CD2E3A', players: ['Son Heung-min', 'Lee Kang-in', 'Kim Min-jae', 'Hwang Hee-chan', 'Cho Gue-sung', 'Kim Seung-gyu'] },
  MEX: { name: 'México',         flag: '🇲🇽', color: '#006847', players: ['Hirving Lozano', 'Guillermo Ochoa', 'Raúl Jiménez', 'Henry Martín', 'Edson Álvarez', 'Andrés Guardado'] },
  BRA: { name: 'Brasil',         flag: '🇧🇷', color: '#009C3B', players: ['Vinicius Jr.', 'Rodrygo', 'Raphinha', 'Alisson', 'Marquinhos', 'Bruno Guimarães'] },
  JPN: { name: 'Japão',          flag: '🇯🇵', color: '#BC002D', players: ['Kaoru Mitoma', 'Takumi Minamino', 'Daichi Kamada', 'Shuichi Gonda', 'Maya Yoshida', 'Ritsu Doan'] },
  NZL: { name: 'Nova Zelândia',  flag: '🇳🇿', color: '#00247D', players: ['Chris Wood', 'Tommy Smith', 'Bill Tuiloma', 'Michael Boxall', 'Stefan Marinovic', 'Liberato Cacace'] },
  ARG: { name: 'Argentina',      flag: '🇦🇷', color: '#74ACDF', players: ['Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez', 'Emiliano Martínez', 'Rodrigo De Paul', 'Alexis Mac Allister'] },
  GER: { name: 'Alemanha',       flag: '🇩🇪', color: '#555555', players: ['Joshua Kimmich', 'Jamal Musiala', 'Florian Wirtz', 'Manuel Neuer', 'Antonio Rüdiger', 'Kai Havertz'] },
  SEN: { name: 'Senegal',        flag: '🇸🇳', color: '#00853F', players: ['Sadio Mané', 'Kalidou Koulibaly', 'Édouard Mendy', 'Idrissa Gana Gueye', 'Ismaila Sarr', 'Habib Diallo'] },
  CHI: { name: 'Chile',          flag: '🇨🇱', color: '#D52B1E', players: ['Alexis Sánchez', 'Arturo Vidal', 'Gary Medel', 'Ben Brereton Díaz', 'Charles Aránguiz', 'Claudio Bravo'] },
  FRA: { name: 'França',         flag: '🇫🇷', color: '#002395', players: ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Mike Maignan', 'William Saliba', 'Eduardo Camavinga'] },
  POR: { name: 'Portugal',       flag: '🇵🇹', color: '#006600', players: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão', 'Rúben Dias', 'Bernardo Silva', 'Diogo Costa'] },
  CIV: { name: 'Costa do Marfim',flag: '🇨🇮', color: '#F77F00', players: ['Sébastien Haller', 'Franck Kessié', 'Nicolas Pépé', 'Serge Aurier', 'Wilfried Zaha', 'Willy Boly'] },
  PER: { name: 'Peru',           flag: '🇵🇪', color: '#D91023', players: ['Jefferson Farfán', 'Gianluca Lapadula', 'André Carrillo', 'Pedro Gallese', 'Renato Tapia', 'Christian Cueva'] },
  ESP: { name: 'Espanha',        flag: '🇪🇸', color: '#AA151B', players: ['Pedri', 'Gavi', 'Lamine Yamal', 'Unai Simón', 'Dani Carvajal', 'Rodri'] },
  ENG: { name: 'Inglaterra',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF091F', players: ['Harry Kane', 'Jude Bellingham', 'Phil Foden', 'Jordan Pickford', 'Bukayo Saka', 'Declan Rice'] },
  NGA: { name: 'Nigéria',        flag: '🇳🇬', color: '#008751', players: ['Victor Osimhen', 'Wilfred Ndidi', 'Alex Iwobi', 'Kelechi Iheanacho', 'Ahmed Musa', 'Francis Uzoho'] },
  ECU: { name: 'Equador',        flag: '🇪🇨', color: '#C8A900', players: ['Enner Valencia', 'Moisés Caicedo', 'Gonzalo Plata', 'Piero Hincapié', 'Pervis Estupiñán', 'Djorkaeff Reasco'] },
  NED: { name: 'Holanda',        flag: '🇳🇱', color: '#FF6600', players: ['Virgil van Dijk', 'Frenkie de Jong', 'Xavi Simons', 'Memphis Depay', 'Nathan Aké', 'Cody Gakpo'] },
  COL: { name: 'Colômbia',       flag: '🇨🇴', color: '#C8A900', players: ['Luis Díaz', 'James Rodríguez', 'Falcao García', 'David Ospina', 'Juan Cuadrado', 'Yerry Mina'] },
  KSA: { name: 'Arábia Saudita', flag: '🇸🇦', color: '#006C35', players: ['Salem Al-Dawsari', 'Mohammed Al-Owais', 'Ali Al-Bulaihi', 'Abdullah Al-Hamdan', 'Firas Al-Buraikan', 'Saleh Al-Shehri'] },
  UKR: { name: 'Ucrânia',        flag: '🇺🇦', color: '#005BBB', players: ['Andriy Yarmolenko', 'Oleksandr Zinchenko', 'Mykhailo Mudryk', 'Georgiy Bushchan', 'Taras Stepanenko', 'Artem Dovbyk'] },
  BEL: { name: 'Bélgica',        flag: '🇧🇪', color: '#EF3340', players: ['Kevin De Bruyne', 'Romelu Lukaku', 'Thibaut Courtois', 'Jan Vertonghen', 'Axel Witsel', 'Dries Mertens'] },
  URU: { name: 'Uruguai',        flag: '🇺🇾', color: '#5EB6E4', players: ['Luis Suárez', 'Edinson Cavani', 'Darwin Núñez', 'Diego Godín', 'Federico Valverde', 'Fernando Muslera'] },
  CMR: { name: 'Camarões',       flag: '🇨🇲', color: '#007A5E', players: ['André Onana', 'Vincent Aboubakar', 'Eric M. Choupo-Moting', 'Karl Toko Ekambi', 'Olivier Ntcham', 'Martin Hongla'] },
  HON: { name: 'Honduras',       flag: '🇭🇳', color: '#0073CF', players: ['Romell Quioto', 'Anthony Lozano', 'Maynor Figueroa', 'Luis López', 'Alberth Elis', 'Denil Maldonado'] },
  ITA: { name: 'Itália',         flag: '🇮🇹', color: '#003399', players: ['Gianluigi Donnarumma', 'Federico Chiesa', 'Nicolò Barella', 'Ciro Immobile', 'Alessandro Bastoni', 'Manuel Locatelli'] },
  CRO: { name: 'Croácia',        flag: '🇭🇷', color: '#FF2020', players: ['Luka Modrić', 'Ivan Perišić', 'Marcelo Brozović', 'Dominik Livaković', 'Mateo Kovačić', 'Dejan Lovren'] },
  EGY: { name: 'Egito',          flag: '🇪🇬', color: '#CE1126', players: ['Mohamed Salah', 'Mohamed Elneny', 'Omar Marmoush', 'Ahmed El Shenawy', 'Trézéguet', 'Akram Tawfik'] },
  JAM: { name: 'Jamaica',        flag: '🇯🇲', color: '#000000', players: ['Michail Antonio', 'Bobby Reid', 'Adrian Mariappa', 'André Blake', 'Shamar Nicholson', 'Ethan Pinnock'] },
  SUI: { name: 'Suíça',          flag: '🇨🇭', color: '#FF0000', players: ['Granit Xhaka', 'Xherdan Shaqiri', 'Yann Sommer', 'Manuel Akanji', 'Silvan Widmer', 'Breel Embolo'] },
  POL: { name: 'Polônia',        flag: '🇵🇱', color: '#DC143C', players: ['Robert Lewandowski', 'Wojciech Szczęsny', 'Piotr Zieliński', 'Grzegorz Krychowiak', 'Kamil Glik', 'Arkadiusz Milik'] },
  COD: { name: 'RD Congo',       flag: '🇨🇩', color: '#007FFF', players: ['Arthur Masuaku', 'Cédric Bakambu', 'Chancel Mbemba', 'Gaël Kakuta', 'Dodi Lukébakio', 'Joël Kiassumbua'] },
  QAT: { name: 'Qatar',          flag: '🇶🇦', color: '#8D153A', players: ['Almoez Ali', 'Hassan Al-Haydos', 'Akram Afif', 'Bassam Al-Rawi', 'Meshaal Barsham', 'Karim Boudiaf'] },
  DEN: { name: 'Dinamarca',      flag: '🇩🇰', color: '#C60C30', players: ['Christian Eriksen', 'Kasper Schmeichel', 'Pierre-Emile Højbjerg', 'Joakim Mæhle', 'Simon Kjær', 'Andreas Cornelius'] },
  SRB: { name: 'Sérvia',         flag: '🇷🇸', color: '#C6363C', players: ['Aleksandar Mitrović', 'Dušan Vlahović', 'Sergej Milinković-Savić', 'Dušan Tadić', 'Predrag Rajković', 'Filip Kostić'] },
  RSA: { name: 'África do Sul',  flag: '🇿🇦', color: '#007A4D', players: ['Percy Tau', 'Bongani Zungu', 'Lyle Foster', 'Ronwen Williams', 'Themba Zwane', 'Evidence Makgopa'] },
  UZB: { name: 'Uzbequistão',    flag: '🇺🇿', color: '#1EB53A', players: ['Eldor Shomurodov', 'Jasur Yakhshiboev', 'Otabek Shukurov', 'Jasur Jalolov', 'Abdukodir Khusanov', 'Khojimat Erkinov'] },
  AUT: { name: 'Áustria',        flag: '🇦🇹', color: '#ED2939', players: ['David Alaba', 'Marcel Sabitzer', 'Marko Arnautovic', 'Michael Gregoritsch', 'Christoph Baumgartner', 'Patrick Wimmer'] },
  TUR: { name: 'Turquia',        flag: '🇹🇷', color: '#E30A17', players: ['Hakan Çalhanoğlu', 'Arda Güler', 'Kenan Yıldız', 'Merih Demiral', 'Cengiz Ünder', 'Altay Bayındır'] },
  MLI: { name: 'Mali',           flag: '🇲🇱', color: '#14B53A', players: ['Yves Bissouma', 'Moussa Marega', 'Mohamed Camara', 'Hamari Traoré', 'Adama Coulibaly', 'Cheick Doucouré'] },
  CRC: { name: 'Costa Rica',     flag: '🇨🇷', color: '#002B7F', players: ['Keylor Navas', 'Bryan Ruiz', 'Joel Campbell', 'Celso Borges', 'Bryan Oviedo', 'Francisco Calvo'] },
  SCO: { name: 'Escócia',        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#003DA5', players: ['Andrew Robertson', 'Scott McTominay', 'John McGinn', 'Kieran Tierney', 'Lawrence Shankland', 'Craig Gordon'] },
  IRN: { name: 'Irã',            flag: '🇮🇷', color: '#239F40', players: ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh', 'Ali Beiranvand', 'Ehsan Hajsafi', 'Saeid Ezatolahi'] },
  AUS: { name: 'Austrália',      flag: '🇦🇺', color: '#00843D', players: ['Mathew Ryan', 'Aaron Mooy', 'Mitch Duke', 'Mat Leckie', 'Martin Boyle', 'Ajdin Hrustić'] },
  IRQ: { name: 'Iraque',         flag: '🇮🇶', color: '#CE1126', players: ['Amjad Attwan', 'Hussein Ali', 'Alaa Abbas', 'Mohanad Ali', 'Bashar Resan', 'Aymen Hussein'] },
};

const GROUPS = [
  { name: 'Grupo A', teams: ['USA', 'CAN', 'MAR', 'KOR'] },
  { name: 'Grupo B', teams: ['MEX', 'BRA', 'JPN', 'NZL'] },
  { name: 'Grupo C', teams: ['ARG', 'GER', 'SEN', 'CHI'] },
  { name: 'Grupo D', teams: ['FRA', 'POR', 'CIV', 'PER'] },
  { name: 'Grupo E', teams: ['ESP', 'ENG', 'NGA', 'ECU'] },
  { name: 'Grupo F', teams: ['NED', 'COL', 'KSA', 'UKR'] },
  { name: 'Grupo G', teams: ['BEL', 'URU', 'CMR', 'HON'] },
  { name: 'Grupo H', teams: ['ITA', 'CRO', 'EGY', 'JAM'] },
  { name: 'Grupo I', teams: ['SUI', 'POL', 'COD', 'QAT'] },
  { name: 'Grupo J', teams: ['DEN', 'SRB', 'RSA', 'UZB'] },
  { name: 'Grupo K', teams: ['AUT', 'TUR', 'MLI', 'CRC'] },
  { name: 'Grupo L', teams: ['SCO', 'IRN', 'AUS', 'IRQ'] },
];

// Build sections and stickers arrays
const SECTIONS = [];
const STICKERS = [];
let _num = 1;

function _add(sectionIdx, name, type, teamCode = null) {
  const id = _num++;
  STICKERS.push({ id, sectionIdx, name, type, teamCode });
  return id;
}

// Section 0: Apresentação (1-18)
SECTIONS.push({ id: 0, name: 'Apresentação', icon: '🏆', color: '#C9A800' });
[
  'Copa do Mundo FIFA 2026', 'Troféu FIFA', 'Sede — EUA', 'Sede — Canadá', 'Sede — México',
  'Logo Oficial', 'Mascote Oficial', 'Bola Oficial', 'Arbitragem FIFA', 'Linha do Tempo',
  'Lenda — Pelé', 'Lenda — Maradona', 'Lenda — Zidane', 'Lenda — Ronaldo Fenômeno',
  'Lenda — Ronaldinho', 'Lenda — Beckham', 'Lenda — Maldini', 'Lenda — Cruyff',
].forEach(n => _add(0, n, 'special'));

// Section 1: Estádios (19-42)
SECTIONS.push({ id: 1, name: 'Estádios', icon: '🏟️', color: '#4FC3F7' });
[
  ['MetLife Stadium',        'Nova Jersey / Nova York'],
  ['SoFi Stadium',           'Los Angeles'],
  ['AT&T Stadium',           'Dallas / Fort Worth'],
  ["Levi's Stadium",         'São Francisco'],
  ['Arrowhead Stadium',      'Kansas City'],
  ['Hard Rock Stadium',      'Miami'],
  ['Lincoln Financial Field','Filadélfia'],
  ['Gillette Stadium',       'Boston'],
  ['Mercedes-Benz Stadium',  'Atlanta'],
  ['BC Place',               'Vancouver'],
  ['BMO Field',              'Toronto'],
  ['Estadio Azteca',         'Cidade do México'],
].forEach(([stadium, city]) => {
  _add(1, stadium, 'stadium');
  _add(1, city, 'city');
});

// Sections 2-13: Groups A-L
GROUPS.forEach((group, gi) => {
  const secIdx = SECTIONS.length;
  SECTIONS.push({ id: secIdx, name: group.name, icon: '⚽', color: '#1565C0', groupIndex: gi, teams: group.teams });
  _add(secIdx, `${group.name} — Cabeçalho`, 'group-header');
  group.teams.forEach(code => {
    const t = TEAMS[code];
    _add(secIdx, `${t.flag} ${t.name} — Escudo`, 'badge', code);
    _add(secIdx, `${t.flag} ${t.name} — Foto do Time`, 'team-photo', code);
    t.players.forEach(p => _add(secIdx, `${t.flag} ${p}`, 'player', code));
  });
});

// Section 14: Estrelas (469-498)
SECTIONS.push({ id: SECTIONS.length, name: 'Estrelas do Torneio', icon: '⭐', color: '#FF9800' });
[
  '🇦🇷 Lionel Messi', '🇵🇹 Cristiano Ronaldo', '🇫🇷 Kylian Mbappé',
  '🇧🇷 Vinicius Jr.', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jude Bellingham', '🇩🇪 Jamal Musiala',
  '🇪🇸 Lamine Yamal', '🇳🇱 Virgil van Dijk', '🇧🇷 Rodrygo',
  '🇳🇬 Victor Osimhen', '🇸🇳 Sadio Mané', '🇨🇴 Luis Díaz',
  '🇺🇾 Darwin Núñez', '🇵🇱 Robert Lewandowski', '🇩🇰 Christian Eriksen',
  '🇯🇵 Kaoru Mitoma', '🇰🇷 Son Heung-min', '🇲🇦 Achraf Hakimi',
  '🇺🇸 Christian Pulisic', '🇲🇽 Hirving Lozano', '🇨🇦 Alphonso Davies',
  '🇦🇷 Lautaro Martínez', '🇪🇸 Pedri', '🇩🇪 Florian Wirtz',
  '🇫🇷 Antoine Griezmann', '🇵🇹 Bruno Fernandes', '🇧🇷 Alisson',
  '🇦🇷 Rodrigo De Paul', '🇧🇪 Kevin De Bruyne', '🇭🇷 Luka Modrić',
].forEach(n => _add(SECTIONS.length - 1, n, 'star'));

// Export read-only total
const TOTAL_STICKERS = STICKERS.length;
