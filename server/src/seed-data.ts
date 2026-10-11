export type Gender = "W" | "M";
export type Discipline = "DH" | "SG" | "GS" | "SL" | "AC";

export type SeedSkier = { name: string; nation: string; gender: Gender };
export type SeedRace = {
  fisRaceId: number;
  place: string;
  discipline: Discipline;
  gender: Gender;
  raceDate: string;
  season: number;
};

export const seedSkiers: SeedSkier[] = [
  {
    "name": "Mikaela Shiffrin",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Emma Aicher",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Camille Rast",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Sofia Goggia",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Alice Robinson",
    "nation": "NZL",
    "gender": "W"
  },
  {
    "name": "Paula Moltzan",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Laura Pirovano",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Julia Scheib",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Sara Hector",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Kira Weidle-Winkelmann",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Cornelia Huetter",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Lindsey Vonn",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Wendy Holdener",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Kajsa Vickhoff Lie",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Breezy Johnson",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Ester Ledecka",
    "nation": "CZE",
    "gender": "W"
  },
  {
    "name": "Corinne Suter",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Katharina Truppe",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Romane Miradoli",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Lena Duerr",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Valerie Grenier",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Ariane Raedler",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Elena Curtoni",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Nina Ortlieb",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Malorie Blanc",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Zrinka Ljutic",
    "nation": "CRO",
    "gender": "W"
  },
  {
    "name": "Lara della Mea",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Mirjam Puchner",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Anna Swenn Larsson",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Thea Louise Stjernesund",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Ilka Stuhec",
    "nation": "SLO",
    "gender": "W"
  },
  {
    "name": "Nicol Delago",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Nina O'Brien",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Jacqueline Wiles",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Keely Cashman",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Mina Fuerst Holtmann",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Maryna Gasienica-Daniel",
    "nation": "POL",
    "gender": "W"
  },
  {
    "name": "Asja Zenere",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Katharina Liensberger",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Marion Chevrier",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Laura Gauche",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Cornelia Oehlund",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Roberta Melesi",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Dzenifera Germane",
    "nation": "LAT",
    "gender": "W"
  },
  {
    "name": "Stephanie Brunner",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Britt Richardson",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Camille Cerutti",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Magdalena Egger",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Hanna Aronsson Elfman",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "J Hurt A",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Katharina Huber",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Marte Monsen",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Estelle Alphand",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Melanie Meillard",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Eliane Christen",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Caitlin McFarlane",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Katharina Gallhuber",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Vanessa Kasper",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Nadia Delago",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Allison Mollin",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Federica Brignone",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Laurence St-Germain",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Janine Schmitt",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Nadine Fest",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Ana Bucik Jogan",
    "nation": "SLO",
    "gender": "W"
  },
  {
    "name": "Nina Astner",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Mary Bocock",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Jasmine Flury",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Clara Direz",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Stefanie Grob",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Sue Piller",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Marie Lamure",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Ricarda Haaser",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Martina Peterlini",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Lisa Hoerhager",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Anna Trocker",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Jasmina Suter",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Franziska Gritsch",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Lara Gut-Behrami",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Madeleine Sylvester-Davik",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Natalie Falch",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Elisabeth Bocock",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Isabella Wright",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Joana Haehlen",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Asa Ando",
    "nation": "JPN",
    "gender": "W"
  },
  {
    "name": "Hilma Loevblom",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Tricia Mangan",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Neja Dvornik",
    "nation": "SLO",
    "gender": "W"
  },
  {
    "name": "Haley Cutler",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Ilaria Ghisalberti",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Cassidy Gray",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Delia Durrer",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Martina Dubovska",
    "nation": "CZE",
    "gender": "W"
  },
  {
    "name": "Emilia Mondinelli",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Anuk Braendli",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Bianca Bakke Westhoff",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Doriane Escane",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Fabiana Dorigo",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Amelia Smart",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Aline Hoepli",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Katie Hensien",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Priska Ming-Nufer",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Aline Danioth",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Erika Pykalainen",
    "nation": "FIN",
    "gender": "W"
  },
  {
    "name": "Sara Allemand",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Liv Moritz",
    "nation": "USA",
    "gender": "W"
  },
  {
    "name": "Dania Allenbach",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Sophie Nyberg",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Giulia Valleriani",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Sara Thaler",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Lena Wechner",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Elvedina Muzaferija",
    "nation": "BIH",
    "gender": "W"
  },
  {
    "name": "Carla Mijares Ruf",
    "nation": "AND",
    "gender": "W"
  },
  {
    "name": "Alice Pazzaglia",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Christina Ager",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Nicole Good",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Ali Nullmeyer",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Justine Lamontagne",
    "nation": "CAN",
    "gender": "W"
  },
  {
    "name": "Victoria Olivier",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Jessica Hilzinger",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Chisaki Maeda",
    "nation": "JPN",
    "gender": "W"
  },
  {
    "name": "Leona Popovic",
    "nation": "CRO",
    "gender": "W"
  },
  {
    "name": "Jasmin Mathis",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Giorgia Collomb",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Nika Tomsic",
    "nation": "SLO",
    "gender": "W"
  },
  {
    "name": "Cande Moreno",
    "nation": "AND",
    "gender": "W"
  },
  {
    "name": "Garance Meyer",
    "nation": "FRA",
    "gender": "W"
  },
  {
    "name": "Jana Fritz",
    "nation": "GER",
    "gender": "W"
  },
  {
    "name": "Simone Wild",
    "nation": "SUI",
    "gender": "W"
  },
  {
    "name": "Emily Schoepf",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Viktoria Buergler",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Moa Landstroem",
    "nation": "SWE",
    "gender": "W"
  },
  {
    "name": "Zita Toth",
    "nation": "HUN",
    "gender": "W"
  },
  {
    "name": "Beatrice Sola",
    "nation": "ITA",
    "gender": "W"
  },
  {
    "name": "Inni Holm Wembstad",
    "nation": "NOR",
    "gender": "W"
  },
  {
    "name": "Rosa Pohjolainen",
    "nation": "FIN",
    "gender": "W"
  },
  {
    "name": "Carmen Spielberger",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Noa Szollos",
    "nation": "ISR",
    "gender": "W"
  },
  {
    "name": "Leonie Raich",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Lisa Grill",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Leonie Zegg",
    "nation": "AUT",
    "gender": "W"
  },
  {
    "name": "Marco Odermatt",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Lucas Pinheiro Braathen",
    "nation": "BRA",
    "gender": "M"
  },
  {
    "name": "Atle Lie McGrath",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Loic Meillard",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Henrik Kristoffersen",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Timon Haugan",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Franjo von Allmen",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Vincent Kriechmayr",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Dominik Paris",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Giovanni Franzoni",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Marco Schwarz",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Raphael Haaser",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Clement Noel",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Alexis Monney",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Stefan Rogentin",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Stefan Brennsteiner",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Paco Rassat",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Alex Vinatzer",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Nils Allegre",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Ryan Cochran-Siegle",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Mattia Casse",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Stefan Babinsky",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Florian Schieder",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Tanguy Nef",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Daniel Hemetsberger",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Adrian Smiseth Sejersted",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "River Radamus",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Manuel Feller",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Eirik Hystad Solberg",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Linus Strasser",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Sam Maes",
    "nation": "BEL",
    "gender": "M"
  },
  {
    "name": "Michael Matt",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Armand Marchant",
    "nation": "BEL",
    "gender": "M"
  },
  {
    "name": "Cameron Alexander",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Fabio Gstrein",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Fabian Gratz",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Victor Muffat-Jeandet",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Filip Zubcic",
    "nation": "CRO",
    "gender": "M"
  },
  {
    "name": "Miha Hrobat",
    "nation": "SLO",
    "gender": "M"
  },
  {
    "name": "Joshua Sturm",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Luca Aerni",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Steven Amiez",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Leo Anguenot",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Christof Innerhofer",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Fredrik Moeller",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Zan Kranjec",
    "nation": "SLO",
    "gender": "M"
  },
  {
    "name": "Jan Zabystran",
    "nation": "CZE",
    "gender": "M"
  },
  {
    "name": "Alban Elezi Cannaferina",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Benjamin Jacques Alliod",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Maxence Muzaton",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Alexis Pinturault",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Justin Murisier",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Anton Grammel",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Tommaso Sala",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Lukas Feurstein",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Daniel Yule",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Thomas Tumler",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Niels Hintermann",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Alessio Miggiano",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Simon Jocher",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Nils Alphand",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Laurie Taylor",
    "nation": "GBR",
    "gender": "M"
  },
  {
    "name": "Guglielmo Bosca",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Oscar Andreas Sandvik",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Albert Popov",
    "nation": "BUL",
    "gender": "M"
  },
  {
    "name": "James Crawford",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Fabian Ax Swartz",
    "nation": "SWE",
    "gender": "M"
  },
  {
    "name": "Thibaut Favrot",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Dominik Raschner",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Samuel Kolega",
    "nation": "CRO",
    "gender": "M"
  },
  {
    "name": "Kyle Negomir",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Patrick Feurstein",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Dave Ryding",
    "nation": "GBR",
    "gender": "M"
  },
  {
    "name": "Elian Lehto",
    "nation": "FIN",
    "gender": "M"
  },
  {
    "name": "Marco Kohler",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Matthieu Bailet",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Jonas Stockinger",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Stefan Eichberger",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Hans Grahl-Madsen",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Matthias Iten",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Martin Cater",
    "nation": "SLO",
    "gender": "M"
  },
  {
    "name": "Joan Verdu",
    "nation": "AND",
    "gender": "M"
  },
  {
    "name": "Lars Roesti",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Alexander Schmid",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Luis Vogt",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Blaise Giezendanner",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Johannes Strolz",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Felix Monsen",
    "nation": "SWE",
    "gender": "M"
  },
  {
    "name": "Brodie Seger",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Giovanni Borsotti",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Benjamin Ritchie",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Andreas Ploier",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Erik Arvidsson",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Billy Major",
    "nation": "GBR",
    "gender": "M"
  },
  {
    "name": "Flavio Vitale",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Auguste Aulnette",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Ramon Zenhaeusern",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Sam Alphand",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Ryder Sarchett",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Sam Morse",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Bryce Bennett",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Filippo della Vite",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Loevan Parand",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Adrien Theaux",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Aleksander Aamodt Kilde",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Romed Baumann",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Tobias Kastlunger",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Luca de Aliprandini",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Vincent Wieser",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Antoine Azzolin",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Wiley Maple",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Riley Seger",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Jeffrey Read",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Livio Hiltbrand",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Stefan Rieser",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Hugo Desgrippes",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Simon Rueland",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Henrik von Appen",
    "nation": "CHI",
    "gender": "M"
  },
  {
    "name": "Arnaud Boisset",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Kristoffer Jakobsen",
    "nation": "SWE",
    "gender": "M"
  },
  {
    "name": "Joaquim Salarich Baucells",
    "nation": "ESP",
    "gender": "M"
  },
  {
    "name": "Adrian Pertl",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Charles Gamel Seigneur",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Rasmus Bakkevig",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Erik Read",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Albert Ortega Fornesa",
    "nation": "ESP",
    "gender": "M"
  },
  {
    "name": "Sebastian Holzmann",
    "nation": "GER",
    "gender": "M"
  },
  {
    "name": "Jett Seymour",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Lenz Haechler",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Istok Rodes",
    "nation": "CRO",
    "gender": "M"
  },
  {
    "name": "Luke Winters",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Yohei Koyama",
    "nation": "JPN",
    "gender": "M"
  },
  {
    "name": "Jesper Pohjolainen",
    "nation": "FIN",
    "gender": "M"
  },
  {
    "name": "Raphael Lessard",
    "nation": "CAN",
    "gender": "M"
  },
  {
    "name": "Tormis Laine",
    "nation": "EST",
    "gender": "M"
  },
  {
    "name": "Theodor Braekken",
    "nation": "NOR",
    "gender": "M"
  },
  {
    "name": "Matteo Canins",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Andreas Zampa",
    "nation": "SVK",
    "gender": "M"
  },
  {
    "name": "Nicolo Molteni",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "William Hansson",
    "nation": "SWE",
    "gender": "M"
  },
  {
    "name": "Manuel Traninger",
    "nation": "AUT",
    "gender": "M"
  },
  {
    "name": "Aleix Aubert Serracanta",
    "nation": "ESP",
    "gender": "M"
  },
  {
    "name": "Fadri Janutin",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Marc Rochat",
    "nation": "SUI",
    "gender": "M"
  },
  {
    "name": "Jared Goldberg",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Shiro Aihara",
    "nation": "JPN",
    "gender": "M"
  },
  {
    "name": "Guerlain Favre",
    "nation": "FRA",
    "gender": "M"
  },
  {
    "name": "Cooper Puckett",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Max Perathoner",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Nejc Naralocnik",
    "nation": "SLO",
    "gender": "M"
  },
  {
    "name": "Juan del Campo Hernandez",
    "nation": "ESP",
    "gender": "M"
  },
  {
    "name": "Bridger Gile",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Tommaso Saccardi",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "George Steffey",
    "nation": "USA",
    "gender": "M"
  },
  {
    "name": "Simon Talacci",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Gustav Wissting",
    "nation": "SWE",
    "gender": "M"
  },
  {
    "name": "Corrado Barbera",
    "nation": "ITA",
    "gender": "M"
  },
  {
    "name": "Petra Vlhova",
    "nation": "SVK",
    "gender": "W"
  }
];

export const seedRaces: SeedRace[] = [
  {
    "fisRaceId": 131577,
    "place": "Soelden",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-10-24",
    "season": 2027
  },
  {
    "fisRaceId": 131578,
    "place": "Soelden",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-10-25",
    "season": 2027
  },
  {
    "fisRaceId": 131579,
    "place": "Levi",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-11-14",
    "season": 2027
  },
  {
    "fisRaceId": 131580,
    "place": "Levi",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-11-15",
    "season": 2027
  },
  {
    "fisRaceId": 131581,
    "place": "Gurgl",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-11-21",
    "season": 2027
  },
  {
    "fisRaceId": 131582,
    "place": "Gurgl",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-11-22",
    "season": 2027
  },
  {
    "fisRaceId": 131697,
    "place": "Copper Mountain, CO",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-11-28",
    "season": 2027
  },
  {
    "fisRaceId": 131583,
    "place": "Killington",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-11-28",
    "season": 2027
  },
  {
    "fisRaceId": 131698,
    "place": "Copper Mountain, CO",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-11-29",
    "season": 2027
  },
  {
    "fisRaceId": 131584,
    "place": "Killington",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-11-29",
    "season": 2027
  },
  {
    "fisRaceId": 131702,
    "place": "Beaver Creek",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-12-03",
    "season": 2027
  },
  {
    "fisRaceId": 131703,
    "place": "Beaver Creek",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-12-04",
    "season": 2027
  },
  {
    "fisRaceId": 131704,
    "place": "Beaver Creek",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-12-05",
    "season": 2027
  },
  {
    "fisRaceId": 131597,
    "place": "Tremblant",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-12-05",
    "season": 2027
  },
  {
    "fisRaceId": 131705,
    "place": "Beaver Creek",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-12-06",
    "season": 2027
  },
  {
    "fisRaceId": 131598,
    "place": "Tremblant",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-12-06",
    "season": 2027
  },
  {
    "fisRaceId": 131601,
    "place": "Beaver Creek",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-12-11",
    "season": 2027
  },
  {
    "fisRaceId": 131602,
    "place": "Beaver Creek",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-12-12",
    "season": 2027
  },
  {
    "fisRaceId": 131706,
    "place": "Val d'Isere",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-12-12",
    "season": 2027
  },
  {
    "fisRaceId": 131603,
    "place": "Beaver Creek",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-12-13",
    "season": 2027
  },
  {
    "fisRaceId": 131707,
    "place": "Val d'Isere",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-12-13",
    "season": 2027
  },
  {
    "fisRaceId": 131604,
    "place": "St. Moritz",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-12-18",
    "season": 2027
  },
  {
    "fisRaceId": 131711,
    "place": "Val Gardena-Groeden Südtirol",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-12-18",
    "season": 2027
  },
  {
    "fisRaceId": 131605,
    "place": "St. Moritz",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-12-19",
    "season": 2027
  },
  {
    "fisRaceId": 131712,
    "place": "Val Gardena-Groeden Südtirol",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-12-19",
    "season": 2027
  },
  {
    "fisRaceId": 131713,
    "place": "Alta Badia",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-12-20",
    "season": 2027
  },
  {
    "fisRaceId": 131606,
    "place": "St. Moritz",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-12-20",
    "season": 2027
  },
  {
    "fisRaceId": 131714,
    "place": "Alta Badia",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-12-21",
    "season": 2027
  },
  {
    "fisRaceId": 131607,
    "place": "Courchevel",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-12-22",
    "season": 2027
  },
  {
    "fisRaceId": 131715,
    "place": "Madonna di Campiglio",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-12-23",
    "season": 2027
  },
  {
    "fisRaceId": 131838,
    "place": "Bormio",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-12-28",
    "season": 2027
  },
  {
    "fisRaceId": 131608,
    "place": "Dachstein West / Gosau",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-12-28",
    "season": 2027
  },
  {
    "fisRaceId": 131839,
    "place": "Bormio",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-12-29",
    "season": 2027
  },
  {
    "fisRaceId": 131609,
    "place": "Dachstein West / Gosau",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-12-29",
    "season": 2027
  },
  {
    "fisRaceId": 131716,
    "place": "Kranjska Gora",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2027-01-02",
    "season": 2027
  },
  {
    "fisRaceId": 131717,
    "place": "Kranjska Gora",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-03",
    "season": 2027
  },
  {
    "fisRaceId": 131654,
    "place": "Flachau",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-01-04",
    "season": 2027
  },
  {
    "fisRaceId": 131655,
    "place": "Flachau",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2027-01-05",
    "season": 2027
  },
  {
    "fisRaceId": 131718,
    "place": "Adelboden",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2027-01-09",
    "season": 2027
  },
  {
    "fisRaceId": 131658,
    "place": "Val di Fassa",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-01-09",
    "season": 2027
  },
  {
    "fisRaceId": 131719,
    "place": "Adelboden",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-10",
    "season": 2027
  },
  {
    "fisRaceId": 131659,
    "place": "Val di Fassa",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-01-10",
    "season": 2027
  },
  {
    "fisRaceId": 131664,
    "place": "Cortina d'Ampezzo",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-01-15",
    "season": 2027
  },
  {
    "fisRaceId": 131723,
    "place": "Wengen",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-01-15",
    "season": 2027
  },
  {
    "fisRaceId": 131665,
    "place": "Cortina d'Ampezzo",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-01-16",
    "season": 2027
  },
  {
    "fisRaceId": 131724,
    "place": "Wengen",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-01-16",
    "season": 2027
  },
  {
    "fisRaceId": 131666,
    "place": "Cortina d'Ampezzo",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-01-17",
    "season": 2027
  },
  {
    "fisRaceId": 131725,
    "place": "Wengen",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-17",
    "season": 2027
  },
  {
    "fisRaceId": 131667,
    "place": "Kronplatz",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-01-19",
    "season": 2027
  },
  {
    "fisRaceId": 131729,
    "place": "Kitzbuehel",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-01-22",
    "season": 2027
  },
  {
    "fisRaceId": 131668,
    "place": "Jasna",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-01-23",
    "season": 2027
  },
  {
    "fisRaceId": 131730,
    "place": "Kitzbuehel",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-01-23",
    "season": 2027
  },
  {
    "fisRaceId": 131866,
    "place": "Jasna",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2027-01-24",
    "season": 2027
  },
  {
    "fisRaceId": 131731,
    "place": "Kitzbuehel",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-24",
    "season": 2027
  },
  {
    "fisRaceId": 131732,
    "place": "Schladming",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2027-01-26",
    "season": 2027
  },
  {
    "fisRaceId": 131733,
    "place": "Schladming",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-27",
    "season": 2027
  },
  {
    "fisRaceId": 131670,
    "place": "Kranjska Gora",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-01-29",
    "season": 2027
  },
  {
    "fisRaceId": 131734,
    "place": "Chamonix",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-01-30",
    "season": 2027
  },
  {
    "fisRaceId": 131671,
    "place": "Kranjska Gora",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2027-01-30",
    "season": 2027
  },
  {
    "fisRaceId": 131737,
    "place": "Garmisch-Partenkirchen",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-02-20",
    "season": 2027
  },
  {
    "fisRaceId": 131672,
    "place": "Lenzerheide",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-02-20",
    "season": 2027
  },
  {
    "fisRaceId": 131738,
    "place": "Garmisch-Partenkirchen",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-02-21",
    "season": 2027
  },
  {
    "fisRaceId": 131673,
    "place": "Lenzerheide",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-02-21",
    "season": 2027
  },
  {
    "fisRaceId": 131676,
    "place": "Garmisch-Partenkirchen",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-02-27",
    "season": 2027
  },
  {
    "fisRaceId": 131741,
    "place": "Saalbach",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-02-27",
    "season": 2027
  },
  {
    "fisRaceId": 131677,
    "place": "Garmisch-Partenkirchen",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-02-28",
    "season": 2027
  },
  {
    "fisRaceId": 131742,
    "place": "Saalbach",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-02-28",
    "season": 2027
  },
  {
    "fisRaceId": 131746,
    "place": "Kvitfjell",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-03-06",
    "season": 2027
  },
  {
    "fisRaceId": 131678,
    "place": "Soldeu",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-03-06",
    "season": 2027
  },
  {
    "fisRaceId": 131747,
    "place": "Kvitfjell",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-03-07",
    "season": 2027
  },
  {
    "fisRaceId": 131679,
    "place": "Soldeu",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2027-03-07",
    "season": 2027
  },
  {
    "fisRaceId": 131683,
    "place": "Narvik (TBC)",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-03-12",
    "season": 2027
  },
  {
    "fisRaceId": 131748,
    "place": "Are",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2027-03-13",
    "season": 2027
  },
  {
    "fisRaceId": 131684,
    "place": "Narvik (TBC)",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-03-13",
    "season": 2027
  },
  {
    "fisRaceId": 131749,
    "place": "Are",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-03-14",
    "season": 2027
  },
  {
    "fisRaceId": 131690,
    "place": "Sun Valley",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2027-03-20",
    "season": 2027
  },
  {
    "fisRaceId": 131689,
    "place": "Sun Valley",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2027-03-20",
    "season": 2027
  },
  {
    "fisRaceId": 131692,
    "place": "Sun Valley",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2027-03-21",
    "season": 2027
  },
  {
    "fisRaceId": 131691,
    "place": "Sun Valley",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2027-03-21",
    "season": 2027
  },
  {
    "fisRaceId": 131693,
    "place": "Sun Valley",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2027-03-23",
    "season": 2027
  },
  {
    "fisRaceId": 131694,
    "place": "Sun Valley",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2027-03-24",
    "season": 2027
  },
  {
    "fisRaceId": 131696,
    "place": "Sun Valley",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2027-03-25",
    "season": 2027
  },
  {
    "fisRaceId": 131695,
    "place": "Sun Valley",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2027-03-25",
    "season": 2027
  }
];
