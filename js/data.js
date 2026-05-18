// Dados das figurinhas — Copa do Mundo FIFA 2026

const TEAMS = {
  // ── GRUPO A (confirmado pelo álbum real) ──
  MEX: { name: 'México',         flag: '🇲🇽', color: '#006847', players: ['Luis Malagón','Johan Vásquez','César Montes','Jesús Gallardo','Israel Reyes','Edson Álvarez','Marcel Ruiz','Hirving Lozano','Raúl Jiménez','Alexis Vega','Roberto Alvarado'] },
  RSA: { name: 'África do Sul',  flag: '🇿🇦', color: '#007A4D', players: ['Ronwen Williams','Raees Erasmus','Rushine de Reuck','Siyanda Xulu','Terrence Mashego','Teboho Mokoena','Ethan Brooks','Percy Tau','Themba Zwane','Lyle Foster','Evidence Makgopa'] },
  KOR: { name: 'Coreia do Sul',  flag: '🇰🇷', color: '#CD2E3A', players: ['Kim Seung-gyu','Kim Moon-hwan','Kim Young-gwon','Kim Min-jae','Kim Jin-su','Jung Woo-young','Lee Jae-sung','Son Heung-min','Lee Kang-in','Hwang Hee-chan','Cho Gue-sung'] },
  CZE: { name: 'Rep. Tcheca',    flag: '🇨🇿', color: '#D7141A', players: ['Jiří Pavlenka','Vladimír Coufal','Ondřej Kúdela','Tomáš Souček','David Zima','Lukáš Provod','Jakub Jankto','Ondřej Duda','Adam Hložek','Patrik Schick','Jan Kuchta'] },

  // ── GRUPO B ──
  USA: { name: 'Estados Unidos', flag: '🇺🇸', color: '#B22234', players: ['Matt Turner','Sergiño Dest','Chris Richards','Walker Zimmerman','Antonee Robinson','Tyler Adams','Weston McKennie','Yunus Musah','Christian Pulisic','Gio Reyna','Ricardo Pepi'] },
  CAN: { name: 'Canadá',         flag: '🇨🇦', color: '#FF0000', players: ['Milan Borjan','Richie Laryea','Kamal Miller','Alistair Johnston','Alphonso Davies','Samuel Piette','Stephen Eustáquio','Tajon Buchanan','Jonathan David','Jonathan Osorio','Cyle Larin'] },
  BRA: { name: 'Brasil',         flag: '🇧🇷', color: '#009C3B', players: ['Alisson','Danilo','Éder Militão','Marquinhos','Guilherme Arana','Casemiro','Bruno Guimarães','Raphinha','Rodrygo','Vinicius Jr.','Gabriel Martinelli'] },
  JPN: { name: 'Japão',          flag: '🇯🇵', color: '#BC002D', players: ['Shuichi Gonda','Hiroki Sakai','Maya Yoshida','Ko Itakura','Yuto Nagatomo','Wataru Endo','Hidemasa Morita','Junya Ito','Daichi Kamada','Takumi Minamino','Kaoru Mitoma'] },

  // ── GRUPO C ──
  ARG: { name: 'Argentina',      flag: '🇦🇷', color: '#74ACDF', players: ['Emiliano Martínez','Nahuel Molina','Cristian Romero','Nicolás Otamendi','Nicolás Tagliafico','Rodrigo De Paul','Leandro Paredes','Alexis Mac Allister','Lionel Messi','Lautaro Martínez','Julián Álvarez'] },
  GER: { name: 'Alemanha',       flag: '🇩🇪', color: '#555555', players: ['Manuel Neuer','Joshua Kimmich','Antonio Rüdiger','Jonathan Tah','David Raum','Robert Andrich','Toni Kroos','Leroy Sané','Jamal Musiala','Florian Wirtz','Kai Havertz'] },
  SEN: { name: 'Senegal',        flag: '🇸🇳', color: '#00853F', players: ['Édouard Mendy','Bouna Sarr','Abdou Diallo','Kalidou Koulibaly','Formane Mendy','Nampalys Mendy','Idrissa Gana Gueye','Ismaila Sarr','Pape Matar Sarr','Sadio Mané','Nicolas Jackson'] },
  NZL: { name: 'Nova Zelândia',  flag: '🇳🇿', color: '#00247D', players: ['Stefan Marinovic','Callan Elliot','Bill Tuiloma','Michael Boxall','Sam Sutton','Elijah Just','Ben Old','Tim Payne','Chris Wood','Matthew Garbett','Liberato Cacace'] },

  // ── GRUPO D ──
  FRA: { name: 'França',         flag: '🇫🇷', color: '#002395', players: ['Mike Maignan','Jules Koundé','Raphaël Varane','William Saliba','Theo Hernandez','Aurélien Tchouaméni','Adrien Rabiot','Ousmane Dembélé','Antoine Griezmann','Marcus Thuram','Kylian Mbappé'] },
  POR: { name: 'Portugal',       flag: '🇵🇹', color: '#006600', players: ['Diogo Costa','João Cancelo','Rúben Dias','Pepe','Nuno Mendes','João Palhinha','Vitinha','Pedro Neto','Bernardo Silva','Bruno Fernandes','Cristiano Ronaldo'] },
  CHI: { name: 'Chile',          flag: '🇨🇱', color: '#D52B1E', players: ['Claudio Bravo','Óscar Opazo','Gary Medel','Paulo Díaz','Sebastián Vegas','Arturo Vidal','Charles Aránguiz','Erick Pulgar','Darío Osorio','Alexis Sánchez','Ben Brereton Díaz'] },
  CIV: { name: 'Costa do Marfim',flag: '🇨🇮', color: '#F77F00', players: ['Badra Ali Sangaré','Serge Aurier','Willy Boly','Simon Deli','Eric Bailly','Franck Kessié','Ibrahim Sangaré','Sébastien Haller','Nicolas Pépé','Wilfried Zaha','Karim Konaté'] },

  // ── GRUPO E ──
  ESP: { name: 'Espanha',        flag: '🇪🇸', color: '#AA151B', players: ['Unai Simón','Dani Carvajal','Pau Cubarsí','Aymeric Laporte','Alejandro Balde','Rodri','Pedri','Gavi','Nico Williams','Lamine Yamal','Ferran Torres'] },
  ENG: { name: 'Inglaterra',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF091F', players: ['Jordan Pickford','Kyle Walker','John Stones','Harry Maguire','Luke Shaw','Declan Rice','Kobbie Mainoo','Bukayo Saka','Phil Foden','Jude Bellingham','Harry Kane'] },
  NGA: { name: 'Nigéria',        flag: '🇳🇬', color: '#008751', players: ['Francis Uzoho','Ola Aina','Leon Balogun','Calvin Bassey','Semi Ajayi','Wilfred Ndidi','Alex Iwobi','Samuel Chukwueze','Taiwo Awoniyi','Kelechi Iheanacho','Victor Osimhen'] },
  ECU: { name: 'Equador',        flag: '🇪🇨', color: '#C8A900', players: ['Hernán Galíndez','Piero Hincapié','Félix Torres','Ángel Mena','Pervis Estupiñán','Moisés Caicedo','Jhegson Méndez','Alan Franco','Gonzalo Plata','Djorkaeff Reasco','Enner Valencia'] },

  // ── GRUPO F ──
  NED: { name: 'Holanda',        flag: '🇳🇱', color: '#FF6600', players: ['Bart Verbruggen','Denzel Dumfries','Stefan de Vrij','Virgil van Dijk','Nathan Aké','Tijjani Reijnders','Frenkie de Jong','Teun Koopmeiners','Donyell Malen','Xavi Simons','Cody Gakpo'] },
  COL: { name: 'Colômbia',       flag: '🇨🇴', color: '#FCD116', players: ['Camilo Vargas','Daniel Muñoz','Yerry Mina','Davinson Sánchez','Johan Mojica','Mateus Uribe','Jefferson Lerma','Juan Cuadrado','James Rodríguez','Luis Díaz','Rafael Santos Borré'] },
  KSA: { name: 'Arábia Saudita', flag: '🇸🇦', color: '#006C35', players: ['Mohammed Al-Owais','Sultan Al-Ghannam','Ali Al-Bulaihi','Abdulelah Al-Malki','Yasser Al-Shahrani','Salman Al-Faraj','Mohamed Kanno','Abdullah Al-Hamdan','Firas Al-Buraikan','Salem Al-Dawsari','Saleh Al-Shehri'] },
  UKR: { name: 'Ucrânia',        flag: '🇺🇦', color: '#005BBB', players: ['Georgiy Bushchan','Yukhym Konoplya','Illia Zabarnyi','Mykola Matviyenko','Vitaliy Mykolenko','Taras Stepanenko','Mykhailo Mudryk','Viktor Tsygankov','Oleksandr Zinchenko','Artem Dovbyk','Roman Yaremchuk'] },

  // ── GRUPO G ──
  BEL: { name: 'Bélgica',        flag: '🇧🇪', color: '#EF3340', players: ['Thibaut Courtois','Thomas Meunier','Jan Vertonghen','Wout Faes','Théo Leoni','Axel Witsel','Kevin De Bruyne','Yannick Carrasco','Leandro Trossard','Lois Openda','Romelu Lukaku'] },
  URU: { name: 'Uruguai',        flag: '🇺🇾', color: '#5EB6E4', players: ['Fernando Muslera','Guillermo Varela','José María Giménez','Diego Godín','Mathías Olivera','Rodrigo Bentancur','Lucas Torreira','Federico Valverde','Giorgian De Arrascaeta','Darwin Núñez','Luis Suárez'] },
  CMR: { name: 'Camarões',       flag: '🇨🇲', color: '#007A5E', players: ['André Onana','Collins Fai','Jean-Charles Castelletto','Bilal Ndong','Harold Moukoudi','André-Frank Zambo Anguissa','Martin Hongla','Gaël Ondoua','Karl Toko Ekambi','Eric M. Choupo-Moting','Vincent Aboubakar'] },
  HON: { name: 'Honduras',       flag: '🇭🇳', color: '#0073CF', players: ['Luis López','Denil Maldonado','Maynor Figueroa','Marcelo Santos','Emilio Izaguirre','Boniek García','José Mario Pinto','Romell Quioto','Deybi Flores','Alberth Elis','Anthony Lozano'] },

  // ── GRUPO H ──
  ITA: { name: 'Itália',         flag: '🇮🇹', color: '#003399', players: ['Gianluigi Donnarumma','Giovanni Di Lorenzo','Giorgio Chiellini','Leonardo Bonucci','Alessandro Bastoni','Nicolò Barella','Marco Verratti','Manuel Locatelli','Davide Frattesi','Federico Chiesa','Gianluca Scamacca'] },
  CRO: { name: 'Croácia',        flag: '🇭🇷', color: '#FF2020', players: ['Dominik Livaković','Josip Juranović','Joško Gvardiol','Dejan Lovren','Borna Sosa','Mateo Kovačić','Marcelo Brozović','Mario Pašalić','Nikola Vlašić','Ivan Perišić','Luka Modrić'] },
  EGY: { name: 'Egito',          flag: '🇪🇬', color: '#CE1126', players: ['Ahmed El Shenawy','Ahmed Fatouh','Ahmed Hegazi','Omar Kamal Youssef','Hossam Omar','Emam Ashour','Ahmed Sayed Zizo','Omar Marmoush','Ramadan Sobhi','Mostafa Mohamed','Mohamed Salah'] },
  JAM: { name: 'Jamaica',        flag: '🇯🇲', color: '#000000', players: ['André Blake','Adrian Mariappa','Damion Lowe','Oniel Fisher','Michael Hector','Bobby Reid','Ravel Morrison','Kasey Palmer','Leon Bailey','Michail Antonio','Shamar Nicholson'] },

  // ── GRUPO I ──
  SUI: { name: 'Suíça',          flag: '🇨🇭', color: '#FF0000', players: ['Yann Sommer','Silvan Widmer','Fabian Schär','Manuel Akanji','Ricardo Rodríguez','Remo Freuler','Granit Xhaka','Denis Zakaria','Xherdan Shaqiri','Breel Embolo','Noah Okafor'] },
  POL: { name: 'Polônia',        flag: '🇵🇱', color: '#DC143C', players: ['Wojciech Szczęsny','Matty Cash','Kamil Glik','Jan Bednarek','Bartosz Bereszyński','Jacek Góralski','Piotr Zieliński','Kamil Jóźwiak','Sebastian Szymański','Arkadiusz Milik','Robert Lewandowski'] },
  COD: { name: 'RD Congo',       flag: '🇨🇩', color: '#007FFF', players: ['Joël Kiassumbua','Yannick Bolasie','Chancel Mbemba','Arthur Masuaku','Débel Makiese','Paul-José M\'Poku','Gaël Kakuta','Théo Bongonda','Dodi Lukébakio','Cédric Bakambu','Silas Wamangituka'] },
  QAT: { name: 'Qatar',          flag: '🇶🇦', color: '#8D153A', players: ['Meshaal Barsham','Pedro Miguel','Bassam Al-Rawi','Boualem Khoukhi','Homam Ahmed','Karim Boudiaf','Assim Madibo','Hassan Al-Haydos','Akram Afif','Almoez Ali','Mohammed Muntari'] },

  // ── GRUPO J ──
  DEN: { name: 'Dinamarca',      flag: '🇩🇰', color: '#C60C30', players: ['Kasper Schmeichel','Jens Stryger Larsen','Andreas Christensen','Simon Kjær','Joakim Mæhle','Thomas Delaney','Pierre-Emile Højbjerg','Mikkel Damsgaard','Christian Eriksen','Andreas Cornelius','Rasmus Hojlund'] },
  SRB: { name: 'Sérvia',         flag: '🇷🇸', color: '#C6363C', players: ['Predrag Rajković','Strahinja Pavlović','Nikola Milenković','Stefan Mitrović','Srdjan Babić','Sasa Lukic','Sergej Milinković-Savić','Filip Kostić','Dušan Tadić','Dušan Vlahović','Aleksandar Mitrović'] },
  MAR: { name: 'Marrocos',       flag: '🇲🇦', color: '#006233', players: ['Yassine Bono','Achraf Hakimi','Noussair Mazraoui','Romain Saiss','Nayef Aguerd','Sofyan Amrabat','Azzedine Ounahi','Selim Amallah','Hakim Ziyech','Zakaria Aboukhlal','Youssef En-Nesyri'] },
  PER: { name: 'Peru',           flag: '🇵🇪', color: '#D91023', players: ['Pedro Gallese','Luis Advíncula','Alexander Callens','Carlos Zambrano','Miguel Trauco','Renato Tapia','Yoshimar Yotún','Edison Flores','André Carrillo','Christian Cueva','Gianluca Lapadula'] },

  // ── GRUPO K ──
  AUT: { name: 'Áustria',        flag: '🇦🇹', color: '#ED2939', players: ['Patrick Pentz','Stefan Lainer','David Alaba','Philipp Lienhart','Maximilian Wöber','Konrad Laimer','Nicolas Seiwald','Marcel Sabitzer','Christoph Baumgartner','Marko Arnautovic','Michael Gregoritsch'] },
  TUR: { name: 'Turquia',        flag: '🇹🇷', color: '#E30A17', players: ['Altay Bayındır','Zeki Çelik','Samet Akaydın','Çağlar Söyüncü','Ferdi Kadıoğlu','Salih Özcan','Hakan Çalhanoğlu','Barış Alper Yılmaz','Yusuf Yazıcı','Kenan Yıldız','Arda Güler'] },
  MLI: { name: 'Mali',           flag: '🇲🇱', color: '#14B53A', players: ['Djigui Diarra','Hamari Traoré','Adama Diakhaby','Moussa Sissako','Falaye Sacko','Lassana Coulibaly','Mohamed Camara','Cheick Doucouré','Adama Traoré','Yves Bissouma','El Bilal Touré'] },
  CRC: { name: 'Costa Rica',     flag: '🇨🇷', color: '#002B7F', players: ['Keylor Navas','Serge Aurier... wait','Juan Pablo Vargas','Francisco Calvo','Bryan Oviedo','Celso Borges','Yeltsin Tejeda','Gerson Torres','Jewison Bennette','Joel Campbell','Bryan Ruiz'] },

  // ── GRUPO L ──
  SCO: { name: 'Escócia',        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#003DA5', players: ['Craig Gordon','Aaron Hickey','Jack Hendry','Grant Hanley','Andrew Robertson','Billy Gilmour','Callum McGregor','John McGinn','Ryan Christie','Scott McTominay','Lawrence Shankland'] },
  IRN: { name: 'Irã',            flag: '🇮🇷', color: '#239F40', players: ['Ali Beiranvand','Sadegh Moharrami','Morteza Pouraliganji','Majid Hosseini','Ehsan Hajsafi','Saeid Ezatolahi','Ahmad Noorollahi','Mehdi Torabi','Alireza Jahanbakhsh','Sardar Azmoun','Mehdi Taremi'] },
  AUS: { name: 'Austrália',      flag: '🇦🇺', color: '#00843D', players: ['Mathew Ryan','Nathaniel Atkinson','Harry Souttar','Kye Rowles','Aziz Behich','Aaron Mooy','Jackson Irvine','Ajdin Hrustić','Mat Leckie','Martin Boyle','Mitchell Duke'] },
  IRQ: { name: 'Iraque',         flag: '🇮🇶', color: '#CE1126', players: ['Jalal Hassan','Ahmed Ibrahim','Salam Shaker','Ali Adnan','Rebin Sulaka','Amjad Attwan','Alaa Abbas','Hussein Ali','Bashar Resan','Humam Tariq','Aymen Hussein'] },
};

const GROUPS = [
  { name: 'Grupo A', teams: ['MEX','RSA','KOR','CZE'] },
  { name: 'Grupo B', teams: ['USA','CAN','BRA','JPN'] },
  { name: 'Grupo C', teams: ['ARG','GER','SEN','NZL'] },
  { name: 'Grupo D', teams: ['FRA','POR','CHI','CIV'] },
  { name: 'Grupo E', teams: ['ESP','ENG','NGA','ECU'] },
  { name: 'Grupo F', teams: ['NED','COL','KSA','UKR'] },
  { name: 'Grupo G', teams: ['BEL','URU','CMR','HON'] },
  { name: 'Grupo H', teams: ['ITA','CRO','EGY','JAM'] },
  { name: 'Grupo I', teams: ['SUI','POL','COD','QAT'] },
  { name: 'Grupo J', teams: ['DEN','SRB','MAR','PER'] },
  { name: 'Grupo K', teams: ['AUT','TUR','MLI','CRC'] },
  { name: 'Grupo L', teams: ['SCO','IRN','AUS','IRQ'] },
];

// ── Build SECTIONS and STICKERS ──
const SECTIONS = [];
const STICKERS = [];
let _num = 1;
const _teamCount = {};

function _add(sectionIdx, name, type, teamCode = null) {
  let teamNum = null;
  if (teamCode) {
    if (_teamCount[teamCode] === undefined) _teamCount[teamCode] = 0;
    teamNum = _teamCount[teamCode]++;
  }
  STICKERS.push({ id: _num++, sectionIdx, name, type, teamCode, teamNum });
}

// Seção 0: Apresentação (1-18)
SECTIONS.push({ id: 0, name: 'Apresentação', icon: '🏆', color: '#C9A800' });
[
  'Copa do Mundo FIFA 2026','Troféu FIFA','Sede — EUA','Sede — Canadá','Sede — México',
  'Logo Oficial','Mascote Oficial','Bola Oficial','Arbitragem FIFA','Linha do Tempo',
  'Lenda — Pelé','Lenda — Maradona','Lenda — Zidane','Lenda — Ronaldo Fenômeno',
  'Lenda — Ronaldinho','Lenda — Beckham','Lenda — Maldini','Lenda — Cruyff',
].forEach(n => _add(0, n, 'special'));

// Seção 1: Estádios (19-42)
SECTIONS.push({ id: 1, name: 'Estádios', icon: '🏟️', color: '#4FC3F7' });
[
  ['MetLife Stadium','Nova Jersey / Nova York'],
  ['SoFi Stadium','Los Angeles'],
  ['AT&T Stadium','Dallas / Fort Worth'],
  ["Levi's Stadium",'São Francisco'],
  ['Arrowhead Stadium','Kansas City'],
  ['Hard Rock Stadium','Miami'],
  ['Lincoln Financial Field','Filadélfia'],
  ['Gillette Stadium','Boston'],
  ['Mercedes-Benz Stadium','Atlanta'],
  ['BC Place','Vancouver'],
  ['BMO Field','Toronto'],
  ['Estadio Azteca','Cidade do México'],
].forEach(([stadium, city]) => {
  _add(1, stadium, 'stadium');
  _add(1, city, 'city');
});

// Seções 2-13: Grupos A–L
// Cada time: 1 escudo (nº 0) + 11 jogadores (nº 1-11) = 12 figurinhas por time
GROUPS.forEach((group, gi) => {
  const secIdx = SECTIONS.length;
  SECTIONS.push({ id: secIdx, name: group.name, icon: '⚽', color: '#1565C0', groupIndex: gi, teams: group.teams });
  _add(secIdx, `${group.name} — Cabeçalho`, 'group-header');
  group.teams.forEach(code => {
    const t = TEAMS[code];
    _add(secIdx, `${t.flag} ${t.name} — Escudo`, 'badge', code);         // teamNum = 0
    t.players.forEach(p => _add(secIdx, `${t.flag} ${p}`, 'player', code)); // teamNum = 1-11
  });
});

// Seção 14: Estrelas do Torneio
SECTIONS.push({ id: SECTIONS.length, name: 'Estrelas do Torneio', icon: '⭐', color: '#FF9800' });
[
  '🇦🇷 Lionel Messi','🇵🇹 Cristiano Ronaldo','🇫🇷 Kylian Mbappé',
  '🇧🇷 Vinicius Jr.','🏴󠁧󠁢󠁥󠁮󠁧󠁿 Jude Bellingham','🇩🇪 Jamal Musiala',
  '🇪🇸 Lamine Yamal','🇳🇱 Virgil van Dijk','🇧🇷 Rodrygo',
  '🇳🇬 Victor Osimhen','🇸🇳 Sadio Mané','🇨🇴 Luis Díaz',
  '🇺🇾 Darwin Núñez','🇵🇱 Robert Lewandowski','🇩🇰 Rasmus Hojlund',
  '🇯🇵 Kaoru Mitoma','🇰🇷 Son Heung-min','🇲🇦 Achraf Hakimi',
  '🇺🇸 Christian Pulisic','🇲🇽 Hirving Lozano','🇨🇦 Alphonso Davies',
  '🇦🇷 Lautaro Martínez','🇪🇸 Pedri','🇩🇪 Florian Wirtz',
  '🇫🇷 Antoine Griezmann','🇵🇹 Bruno Fernandes','🇧🇷 Alisson',
  '🇦🇷 Rodrigo De Paul','🇧🇪 Kevin De Bruyne','🇭🇷 Luka Modrić',
].forEach(n => _add(SECTIONS.length - 1, n, 'star'));

const TOTAL_STICKERS = STICKERS.length;
