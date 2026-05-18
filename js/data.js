// Dados das figurinhas — Copa do Mundo FIFA 2026
// Cada time: 1 escudo (nº 0) + 19 jogadores (nº 1-19) = 20 figurinhas por time

const TEAMS = {
  // ── GRUPO A ──
  MEX: { name: 'México',         flag: '🇲🇽', color: '#006847', players: ['Luis Malagón','Johan Vásquez','César Montes','Jesús Gallardo','Israel Reyes','Edson Álvarez','Marcel Ruiz','Hirving Lozano','Raúl Jiménez','Alexis Vega','Roberto Alvarado','Santiago Giménez','Guillermo Ochoa','Néstor Araujo','Alan Pulido','Uriel Antuna','Diego Laínez','Carlos Rodríguez','Orbelin Pineda'] },
  RSA: { name: 'África do Sul',  flag: '🇿🇦', color: '#007A4D', players: ['Ronwen Williams','Raees Erasmus','Rushine de Reuck','Siyanda Xulu','Terrence Mashego','Teboho Mokoena','Ethan Brooks','Percy Tau','Themba Zwane','Lyle Foster','Evidence Makgopa','Bongani Zungu','Keagan Dolly','Grant Kekana','Khuliso Mudau','Ntsako Makhubela','Yusuf Maart','Itumeleng Khune','Lebo Mothiba'] },
  KOR: { name: 'Coreia do Sul',  flag: '🇰🇷', color: '#CD2E3A', players: ['Kim Seung-gyu','Kim Moon-hwan','Kim Young-gwon','Kim Min-jae','Kim Jin-su','Jung Woo-young','Lee Jae-sung','Son Heung-min','Lee Kang-in','Hwang Hee-chan','Cho Gue-sung','Oh Hyeon-gyu','Hong Hyun-seok','Kwon Chang-hoon','Hwang In-beom','Song Min-kyu','Na Sang-ho','Kim Tae-hwan','Cho Hyun-woo'] },
  CZE: { name: 'Rep. Tcheca',    flag: '🇨🇿', color: '#D7141A', players: ['Jiří Pavlenka','Vladimír Coufal','Ondřej Kúdela','Tomáš Souček','David Zima','Lukáš Provod','Jakub Jankto','Ondřej Duda','Adam Hložek','Patrik Schick','Jan Kuchta','Tomáš Chorý','Antonín Barák','Pavel Kadeřábek','Lukáš Haraslín','Marek Suchý','Tomáš Vaclík','Ondřej Lingr','Matěj Jurásek'] },

  // ── GRUPO B ──
  USA: { name: 'Estados Unidos', flag: '🇺🇸', color: '#B22234', players: ['Matt Turner','Sergiño Dest','Chris Richards','Walker Zimmerman','Antonee Robinson','Tyler Adams','Weston McKennie','Yunus Musah','Christian Pulisic','Gio Reyna','Ricardo Pepi','Josh Sargent','Jordan Morris','Brenden Aaronson','Timothy Weah','Joe Scally','Zack Steffen','DeAndre Yedlin','Folarin Balogun'] },
  CAN: { name: 'Canadá',         flag: '🇨🇦', color: '#FF0000', players: ['Milan Borjan','Richie Laryea','Kamal Miller','Alistair Johnston','Alphonso Davies','Samuel Piette','Stephen Eustáquio','Tajon Buchanan','Jonathan David','Jonathan Osorio','Cyle Larin','Ismaël Koné','Charles-Andreas Brym','Raheem Edwards','Derek Cornelius','Mark-Anthony Kaye','Tanner Tessmann','Liam Millar','Lucas Cavallini'] },
  BRA: { name: 'Brasil',         flag: '🇧🇷', color: '#009C3B', players: ['Alisson','Danilo','Éder Militão','Marquinhos','Guilherme Arana','Casemiro','Bruno Guimarães','Raphinha','Rodrygo','Vinicius Jr.','Gabriel Martinelli','Gabriel Jesus','Richarlison','Lucas Paquetá','Antony','Endrick','Neymar Jr.','Ederson','Pedro'] },
  JPN: { name: 'Japão',          flag: '🇯🇵', color: '#BC002D', players: ['Shuichi Gonda','Hiroki Sakai','Maya Yoshida','Ko Itakura','Yuto Nagatomo','Wataru Endo','Hidemasa Morita','Junya Ito','Daichi Kamada','Takumi Minamino','Kaoru Mitoma','Takefusa Kubo','Hiroki Ito','Takehiro Tomiyasu','Yuki Soma','Ao Tanaka','Keito Nakamura','Shogo Taniguchi','Ayase Ueda'] },

  // ── GRUPO C ──
  ARG: { name: 'Argentina',      flag: '🇦🇷', color: '#74ACDF', players: ['Emiliano Martínez','Nahuel Molina','Cristian Romero','Nicolás Otamendi','Nicolás Tagliafico','Rodrigo De Paul','Leandro Paredes','Alexis Mac Allister','Lionel Messi','Lautaro Martínez','Julián Álvarez','Ángel Di María','Giovani Lo Celso','Germán Pezzella','Franco Armani','Marcos Acuña','Thiago Almada','Valentín Carboni','Enzo Fernández'] },
  GER: { name: 'Alemanha',       flag: '🇩🇪', color: '#555555', players: ['Manuel Neuer','Joshua Kimmich','Antonio Rüdiger','Jonathan Tah','David Raum','Robert Andrich','Toni Kroos','Leroy Sané','Jamal Musiala','Florian Wirtz','Kai Havertz','Ilkay Gündogan','Serge Gnabry','Thomas Müller','Maximilian Mittelstädt','Niclas Füllkrug','Pascal Groß','Benjamin Henrichs','Chris Führich'] },
  SEN: { name: 'Senegal',        flag: '🇸🇳', color: '#00853F', players: ['Édouard Mendy','Bouna Sarr','Abdou Diallo','Kalidou Koulibaly','Formane Mendy','Nampalys Mendy','Idrissa Gana Gueye','Ismaila Sarr','Pape Matar Sarr','Sadio Mané','Nicolas Jackson','Krepin Diatta','Pape Guèye','Alfred Gomis','Fodé Ballo-Touré','Pathé Ciss','Lamine Camara','Bamba Dieng','Habib Diallo'] },
  NZL: { name: 'Nova Zelândia',  flag: '🇳🇿', color: '#00247D', players: ['Stefan Marinovic','Callan Elliot','Bill Tuiloma','Michael Boxall','Sam Sutton','Elijah Just','Ben Old','Tim Payne','Chris Wood','Matthew Garbett','Liberato Cacace','Joe Bell','Myer Bevan','Dane Ingham','Moses Dyer','Sarpreet Singh','Marco Rojas','Ryan Thomas','Winston Reid'] },

  // ── GRUPO D ──
  FRA: { name: 'França',         flag: '🇫🇷', color: '#002395', players: ['Mike Maignan','Jules Koundé','Raphaël Varane','William Saliba','Theo Hernandez','Aurélien Tchouaméni','Adrien Rabiot','Ousmane Dembélé','Antoine Griezmann','Marcus Thuram','Kylian Mbappé','Randal Kolo Muani','Kingsley Coman','Jonathan Clauss','Benjamin Pavard','N\'Golo Kanté','Ibrahima Konaté','Christopher Nkunku','Mattéo Guendouzi'] },
  POR: { name: 'Portugal',       flag: '🇵🇹', color: '#006600', players: ['Diogo Costa','João Cancelo','Rúben Dias','Pepe','Nuno Mendes','João Palhinha','Vitinha','Pedro Neto','Bernardo Silva','Bruno Fernandes','Cristiano Ronaldo','Rafael Leão','João Félix','Rúben Neves','Gonçalo Ramos','Diogo Dalot','Otávio','Ricardo Horta','Sérgio Oliveira'] },
  CHI: { name: 'Chile',          flag: '🇨🇱', color: '#D52B1E', players: ['Claudio Bravo','Óscar Opazo','Gary Medel','Paulo Díaz','Sebastián Vegas','Arturo Vidal','Charles Aránguiz','Erick Pulgar','Darío Osorio','Alexis Sánchez','Ben Brereton Díaz','Mauricio Isla','Iván Morales','Marcos Bolados','Gabriel Suazo','Guillermo Maripán','Marcelino Núñez','Eduardo Vargas','Felipe Mora'] },
  CIV: { name: 'Costa do Marfim',flag: '🇨🇮', color: '#F77F00', players: ['Badra Ali Sangaré','Serge Aurier','Willy Boly','Simon Deli','Eric Bailly','Franck Kessié','Ibrahim Sangaré','Sébastien Haller','Nicolas Pépé','Wilfried Zaha','Karim Konaté','Cristian Kouamé','Odilon Kossounou','Ghislain Konan','Jean-Philippe Krasso','Oumar Diakité','Ismaël Traoré','Steeve Yago','Max-Alain Gradel'] },

  // ── GRUPO E ──
  ESP: { name: 'Espanha',        flag: '🇪🇸', color: '#AA151B', players: ['Unai Simón','Dani Carvajal','Pau Cubarsí','Aymeric Laporte','Alejandro Balde','Rodri','Pedri','Gavi','Nico Williams','Lamine Yamal','Ferran Torres','Alejandro Grimaldo','Marcos Llorente','Fabián Ruiz','Mikel Merino','Álex Baena','Dani Olmo','Joselu','José Gayà'] },
  ENG: { name: 'Inglaterra',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF091F', players: ['Jordan Pickford','Kyle Walker','John Stones','Harry Maguire','Luke Shaw','Declan Rice','Kobbie Mainoo','Bukayo Saka','Phil Foden','Jude Bellingham','Harry Kane','Trent Alexander-Arnold','Marcus Rashford','Ollie Watkins','Cole Palmer','Aaron Ramsdale','Conor Gallagher','Jarrod Bowen','Levi Colwill'] },
  NGA: { name: 'Nigéria',        flag: '🇳🇬', color: '#008751', players: ['Francis Uzoho','Ola Aina','Leon Balogun','Calvin Bassey','Semi Ajayi','Wilfred Ndidi','Alex Iwobi','Samuel Chukwueze','Taiwo Awoniyi','Kelechi Iheanacho','Victor Osimhen','Ademola Lookman','Zaidu Sanusi','Cyriel Dessers','Bright Osayi-Samuel','Paul Onuachu','Oghenekaro Etebo','William Troost-Ekong','Maduka Okoye'] },
  ECU: { name: 'Equador',        flag: '🇪🇨', color: '#C8A900', players: ['Hernán Galíndez','Piero Hincapié','Félix Torres','Ángel Mena','Pervis Estupiñán','Moisés Caicedo','Jhegson Méndez','Alan Franco','Gonzalo Plata','Djorkaeff Reasco','Enner Valencia','Sebas Méndez','Byron Castillo','Jackson Porozo','Ayrton Preciado','Jordy Caicedo','Renato Ibarra','Jhon Cifuentes','Pedro Vite'] },

  // ── GRUPO F ──
  NED: { name: 'Holanda',        flag: '🇳🇱', color: '#FF6600', players: ['Bart Verbruggen','Denzel Dumfries','Stefan de Vrij','Virgil van Dijk','Nathan Aké','Tijjani Reijnders','Frenkie de Jong','Teun Koopmeiners','Donyell Malen','Xavi Simons','Cody Gakpo','Wout Weghorst','Ryan Gravenberch','Memphis Depay','Lutsharel Geertruida','Justin Kluivert','Georginio Wijnaldum','Davy Klaassen','Patrick van Aanholt'] },
  COL: { name: 'Colômbia',       flag: '🇨🇴', color: '#FCD116', players: ['Camilo Vargas','Daniel Muñoz','Yerry Mina','Davinson Sánchez','Johan Mojica','Mateus Uribe','Jefferson Lerma','Juan Cuadrado','James Rodríguez','Luis Díaz','Rafael Santos Borré','Cucho Hernández','Jhon Durán','Santiago Arias','Jorge Carrascal','Miguel Ángel Borja','Cristian Borja','Wilmar Barrios','Eder Álvarez Balanta'] },
  KSA: { name: 'Arábia Saudita', flag: '🇸🇦', color: '#006C35', players: ['Mohammed Al-Owais','Sultan Al-Ghannam','Ali Al-Bulaihi','Abdulelah Al-Malki','Yasser Al-Shahrani','Salman Al-Faraj','Mohamed Kanno','Abdullah Al-Hamdan','Firas Al-Buraikan','Salem Al-Dawsari','Saleh Al-Shehri','Riyadh Sharahili','Sami Al-Najei','Mohammed Al-Breik','Saud Abdulhamid','Nawaf Al-Abed','Hatan Bahbri','Taiseer Al-Jassim','Yasir Al-Shahrani'] },
  UKR: { name: 'Ucrânia',        flag: '🇺🇦', color: '#005BBB', players: ['Georgiy Bushchan','Yukhym Konoplya','Illia Zabarnyi','Mykola Matviyenko','Vitaliy Mykolenko','Taras Stepanenko','Mykhailo Mudryk','Viktor Tsygankov','Oleksandr Zinchenko','Artem Dovbyk','Roman Yaremchuk','Andriy Yarmolenko','Oleksandr Karavaev','Ruslan Malinovskyi','Mykola Shaparenko','Yevhen Makarenko','Dmytro Kryskiv','Heorhiy Sudakov','Serhiy Sydorchuk'] },

  // ── GRUPO G ──
  BEL: { name: 'Bélgica',        flag: '🇧🇪', color: '#EF3340', players: ['Thibaut Courtois','Thomas Meunier','Jan Vertonghen','Wout Faes','Théo Leoni','Axel Witsel','Kevin De Bruyne','Yannick Carrasco','Leandro Trossard','Lois Openda','Romelu Lukaku','Amadou Onana','Arthur Theate','Alexis Saelemaekers','Charles De Ketelaere','Dries Mertens','Timothy Castagne','Sander Berge','Maarten Vandevoordt'] },
  URU: { name: 'Uruguai',        flag: '🇺🇾', color: '#5EB6E4', players: ['Fernando Muslera','Guillermo Varela','José María Giménez','Diego Godín','Mathías Olivera','Rodrigo Bentancur','Lucas Torreira','Federico Valverde','Giorgian De Arrascaeta','Darwin Núñez','Luis Suárez','Edinson Cavani','Ronald Araújo','Maxi Gómez','Nicolás De La Cruz','Brian Rodríguez','Facundo Pellistri','Matías Vecino','Diego Rossi'] },
  CMR: { name: 'Camarões',       flag: '🇨🇲', color: '#007A5E', players: ['André Onana','Collins Fai','Jean-Charles Castelletto','Bilal Ndong','Harold Moukoudi','André-Frank Zambo Anguissa','Martin Hongla','Gaël Ondoua','Karl Toko Ekambi','Eric M. Choupo-Moting','Vincent Aboubakar','Jean-Pierre Nsame','Joël Tagueu','Samuel Oum Gouet','Stéphane Bahoken','Moumi Ngamaleu','Georges-Kevin N\'Koudou','Clinton N\'Jie','Jérôme Ngom Mbekeli'] },
  HON: { name: 'Honduras',       flag: '🇭🇳', color: '#0073CF', players: ['Luis López','Denil Maldonado','Maynor Figueroa','Marcelo Santos','Emilio Izaguirre','Boniek García','José Mario Pinto','Romell Quioto','Deybi Flores','Alberth Elis','Anthony Lozano','Rigoberto Rivas','Douglas Martínez','Héctor Castellanos','Joseph Rosales','Kervin Arriaga','Brayan Beckeles','Carlos Discua','Bryan Moya'] },

  // ── GRUPO H ──
  ITA: { name: 'Itália',         flag: '🇮🇹', color: '#003399', players: ['Gianluigi Donnarumma','Giovanni Di Lorenzo','Giorgio Chiellini','Leonardo Bonucci','Alessandro Bastoni','Nicolò Barella','Marco Verratti','Manuel Locatelli','Davide Frattesi','Federico Chiesa','Gianluca Scamacca','Lorenzo Pellegrini','Ciro Immobile','Jorginho','Federico Dimarco','Matteo Politano','Giacomo Raspadori','Matteo Darmian','Wilfried Gnonto'] },
  CRO: { name: 'Croácia',        flag: '🇭🇷', color: '#FF2020', players: ['Dominik Livaković','Josip Juranović','Joško Gvardiol','Dejan Lovren','Borna Sosa','Mateo Kovačić','Marcelo Brozović','Mario Pašalić','Nikola Vlašić','Ivan Perišić','Luka Modrić','Bruno Petković','Lovro Majer','Andrej Kramarić','Sime Vrsaljko','Ivan Gvardiol','Luka Ivanušec','Mislav Oršić','Josip Šutalo'] },
  EGY: { name: 'Egito',          flag: '🇪🇬', color: '#CE1126', players: ['Ahmed El Shenawy','Ahmed Fatouh','Ahmed Hegazi','Omar Kamal Youssef','Hossam Omar','Emam Ashour','Ahmed Sayed Zizo','Omar Marmoush','Ramadan Sobhi','Mostafa Mohamed','Mohamed Salah','Mohamed Elneny','Trézéguet','Akram Tawfik','Mahmoud Hamdi','Amr El Sulaya','Karim Hafez','Mahmoud Kahraba','Ibrahim Adel'] },
  JAM: { name: 'Jamaica',        flag: '🇯🇲', color: '#000000', players: ['André Blake','Adrian Mariappa','Damion Lowe','Oniel Fisher','Michael Hector','Bobby Reid','Ravel Morrison','Kasey Palmer','Leon Bailey','Michail Antonio','Shamar Nicholson','Ethan Pinnock','Javain Brown','Lamar Walker','Kevon Lambert','Joel Latibeaudiere','Cory Burke','Je-Vaughn Watson','Brentford Daley'] },

  // ── GRUPO I ──
  SUI: { name: 'Suíça',          flag: '🇨🇭', color: '#FF0000', players: ['Yann Sommer','Silvan Widmer','Fabian Schär','Manuel Akanji','Ricardo Rodríguez','Remo Freuler','Granit Xhaka','Denis Zakaria','Xherdan Shaqiri','Breel Embolo','Noah Okafor','Steven Zuber','Haris Seferović','Nico Elvedi','Djibril Sow','Michael Lang','Fabian Frei','Kwadwo Duah','Edimilson Fernandes'] },
  POL: { name: 'Polônia',        flag: '🇵🇱', color: '#DC143C', players: ['Wojciech Szczęsny','Matty Cash','Kamil Glik','Jan Bednarek','Bartosz Bereszyński','Jacek Góralski','Piotr Zieliński','Kamil Jóźwiak','Sebastian Szymański','Arkadiusz Milik','Robert Lewandowski','Krzysztof Piątek','Paweł Dawidowicz','Mateusz Klich','Bartosz Slisz','Damian Szymański','Karol Świderski','Nicola Zalewski','Jakub Kiwior'] },
  COD: { name: 'RD Congo',       flag: '🇨🇩', color: '#007FFF', players: ['Joël Kiassumbua','Yannick Bolasie','Chancel Mbemba','Arthur Masuaku','Débel Makiese','Paul-José M\'Poku','Gaël Kakuta','Théo Bongonda','Dodi Lukébakio','Cédric Bakambu','Silas Wamangituka','Jonathan Bolingi','Youssouf Mulumbu','Firmin Mubele','Issama Mpeko','Marcel Tisserand','Cédric Ibara','Merveille Bope Bokadi','Glody Ngonda'] },
  QAT: { name: 'Qatar',          flag: '🇶🇦', color: '#8D153A', players: ['Meshaal Barsham','Pedro Miguel','Bassam Al-Rawi','Boualem Khoukhi','Homam Ahmed','Karim Boudiaf','Assim Madibo','Hassan Al-Haydos','Akram Afif','Almoez Ali','Mohammed Muntari','Ismail Mohamad','Yusuf Abdurisag','Khaled Muneer Mohammed','Salem Al-Hajri','Naif Al-Hadhrami','Jassim Gaber','Abdelaziz Hatem','Ró-Ró'] },

  // ── GRUPO J ──
  DEN: { name: 'Dinamarca',      flag: '🇩🇰', color: '#C60C30', players: ['Kasper Schmeichel','Jens Stryger Larsen','Andreas Christensen','Simon Kjær','Joakim Mæhle','Thomas Delaney','Pierre-Emile Højbjerg','Mikkel Damsgaard','Christian Eriksen','Andreas Cornelius','Rasmus Hojlund','Yussuf Poulsen','Daniel Wass','Martin Braithwaite','Mathias Jensen','Alexander Bah','Lukas Lerager','Jacob Bruun Larsen','Jesper Lindstrøm'] },
  SRB: { name: 'Sérvia',         flag: '🇷🇸', color: '#C6363C', players: ['Predrag Rajković','Strahinja Pavlović','Nikola Milenković','Stefan Mitrović','Srdjan Babić','Sasa Lukic','Sergej Milinković-Savić','Filip Kostić','Dušan Tadić','Dušan Vlahović','Aleksandar Mitrović','Ivan Ilić','Nemanja Gudelj','Darko Lazović','Andrija Živković','Marko Grujić','Strahinja Eraković','Lazar Samardzic','Pavle Vagić'] },
  MAR: { name: 'Marrocos',       flag: '🇲🇦', color: '#006233', players: ['Yassine Bono','Achraf Hakimi','Noussair Mazraoui','Romain Saiss','Nayef Aguerd','Sofyan Amrabat','Azzedine Ounahi','Selim Amallah','Hakim Ziyech','Zakaria Aboukhlal','Youssef En-Nesyri','Munir El Haddadi','Amine Harit','Adam Masina','Badr Benoun','Imran Louza','Abdelhamid Sabiri','Walid Cheddira','Ryan Mmaee'] },
  PER: { name: 'Peru',           flag: '🇵🇪', color: '#D91023', players: ['Pedro Gallese','Luis Advíncula','Alexander Callens','Carlos Zambrano','Miguel Trauco','Renato Tapia','Yoshimar Yotún','Edison Flores','André Carrillo','Christian Cueva','Gianluca Lapadula','Santiago Ormeño','Bryan Reyna','Marcos López','Anderson Santamaría','Alberto Rodríguez','Oliver Sonne','Raziel García','Jesús Castillo'] },

  // ── GRUPO K ──
  AUT: { name: 'Áustria',        flag: '🇦🇹', color: '#ED2939', players: ['Patrick Pentz','Stefan Lainer','David Alaba','Philipp Lienhart','Maximilian Wöber','Konrad Laimer','Nicolas Seiwald','Marcel Sabitzer','Christoph Baumgartner','Marko Arnautovic','Michael Gregoritsch','Sasa Kalajdzic','Patrick Wimmer','Stefan Posch','Florian Grillitsch','Xaver Schlager','Romano Schmid','Hannes Wolf','Christoph Trimmel'] },
  TUR: { name: 'Turquia',        flag: '🇹🇷', color: '#E30A17', players: ['Altay Bayındır','Zeki Çelik','Samet Akaydın','Çağlar Söyüncü','Ferdi Kadıoğlu','Salih Özcan','Hakan Çalhanoğlu','Barış Alper Yılmaz','Yusuf Yazıcı','Kenan Yıldız','Arda Güler','Merih Demiral','Cengiz Ünder','Orkun Kökçü','Ozan Kabak','Kaan Ayhan','Okay Yokuşlu','İrfan Can Kahveci','Yunus Akgün'] },
  MLI: { name: 'Mali',           flag: '🇲🇱', color: '#14B53A', players: ['Djigui Diarra','Hamari Traoré','Adama Diakhaby','Moussa Sissako','Falaye Sacko','Lassana Coulibaly','Mohamed Camara','Cheick Doucouré','Adama Traoré','Yves Bissouma','El Bilal Touré','Moussa Marega','Kalifa Coulibaly','Mamadou Doumbia','Ibrahima Koné','Boubacar Traoré','Sékou Koïta','Nene Dorgeles','Amadou Haidara'] },
  CRC: { name: 'Costa Rica',     flag: '🇨🇷', color: '#002B7F', players: ['Keylor Navas','Óscar Duarte','Juan Pablo Vargas','Francisco Calvo','Bryan Oviedo','Celso Borges','Yeltsin Tejeda','Gerson Torres','Jewison Bennette','Joel Campbell','Bryan Ruiz','Kendall Waston','Ronald Matarrita','Manfred Ugalde','Anthony Contreras','Marvin Angulo','Johan Venegas','Randall Leal','Brandon Aguilera'] },

  // ── GRUPO L ──
  SCO: { name: 'Escócia',        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#003DA5', players: ['Craig Gordon','Aaron Hickey','Jack Hendry','Grant Hanley','Andrew Robertson','Billy Gilmour','Callum McGregor','John McGinn','Ryan Christie','Scott McTominay','Lawrence Shankland','Ryan Fraser','Stuart Armstrong','Kieran Tierney','David Turnbull','Kenny McLean','Che Adams','Nathan Patterson','Ryan Jack'] },
  IRN: { name: 'Irã',            flag: '🇮🇷', color: '#239F40', players: ['Ali Beiranvand','Sadegh Moharrami','Morteza Pouraliganji','Majid Hosseini','Ehsan Hajsafi','Saeid Ezatolahi','Ahmad Noorollahi','Mehdi Torabi','Alireza Jahanbakhsh','Sardar Azmoun','Mehdi Taremi','Ramin Rezaeian','Karim Ansarifard','Milad Mohammadi','Omid Noorafkan','Saman Ghoddos','Mohammad Mohebi','Ali Gholizadeh','Mohammad Karimi'] },
  AUS: { name: 'Austrália',      flag: '🇦🇺', color: '#00843D', players: ['Mathew Ryan','Nathaniel Atkinson','Harry Souttar','Kye Rowles','Aziz Behich','Aaron Mooy','Jackson Irvine','Ajdin Hrustić','Mat Leckie','Martin Boyle','Mitchell Duke','Craig Goodwin','Riley McGree','Awer Mabil','Jason Davidson','Fran Karacic','Marco Tilio','Keanu Baccus','Bailey Wright'] },
  IRQ: { name: 'Iraque',         flag: '🇮🇶', color: '#CE1126', players: ['Jalal Hassan','Ahmed Ibrahim','Salam Shaker','Ali Adnan','Rebin Sulaka','Amjad Attwan','Alaa Abbas','Hussein Ali','Bashar Resan','Humam Tariq','Aymen Hussein','Mohanad Ali','Ali Faez','Saad Abdul Amir','Karrar Jassim','Dhurgham Ismaeel','Ahmed Yasin','Ahmed Amer Natiq','Osama Rashid'] },
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
// Cada time: 1 escudo (nº 0) + 19 jogadores (nº 1-19) = 20 figurinhas por time
GROUPS.forEach((group, gi) => {
  const secIdx = SECTIONS.length;
  SECTIONS.push({ id: secIdx, name: group.name, icon: '⚽', color: '#1565C0', groupIndex: gi, teams: group.teams });
  _add(secIdx, `${group.name} — Cabeçalho`, 'group-header');
  group.teams.forEach(code => {
    const t = TEAMS[code];
    _add(secIdx, `${t.flag} ${t.name} — Escudo`, 'badge', code);           // teamNum = 0
    t.players.forEach(p => _add(secIdx, `${t.flag} ${p}`, 'player', code)); // teamNum = 1-19
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
