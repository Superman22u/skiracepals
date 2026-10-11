import type { Discipline, Gender } from "./seed-data";

export type PriorFinish = { position: number; name: string; nation: string };
export type PriorRace = {
  fisRaceId: number;
  place: string;
  discipline: Discipline;
  gender: Gender;
  raceDate: string;
  resultUrl: string;
  finishes: PriorFinish[];
};

export const priorSeed: PriorRace[] = [
  {
    "fisRaceId": 127331,
    "place": "Soelden",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2025-10-25",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127331",
    "finishes": [
      {
        "position": 1,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Lara Gut-Behrami",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Nina O'Brien",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 8,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 9,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 10,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      }
    ]
  },
  {
    "fisRaceId": 127332,
    "place": "Soelden",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2025-10-26",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127332",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Thibaut Favrot",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Zan Kranjec",
        "nation": "SLO"
      },
      {
        "position": 10,
        "name": "Flavio Vitale",
        "nation": "FRA"
      }
    ]
  },
  {
    "fisRaceId": 127333,
    "place": "Levi",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2025-11-15",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127333",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 3,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 7,
        "name": "Neja Dvornik",
        "nation": "SLO"
      },
      {
        "position": 8,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Marion Chevrier",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Katharina Liensberger",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127334,
    "place": "Levi",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2025-11-16",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127334",
    "finishes": [
      {
        "position": 1,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 2,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 3,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 4,
        "name": "Laurie Taylor",
        "nation": "GBR"
      },
      {
        "position": 5,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 7,
        "name": "Dave Ryding",
        "nation": "GBR"
      },
      {
        "position": 8,
        "name": "Steven Amiez",
        "nation": "FRA"
      },
      {
        "position": 9,
        "name": "Michael Matt",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Fabio Gstrein",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127335,
    "place": "Gurgl",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2025-11-22",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127335",
    "finishes": [
      {
        "position": 1,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 2,
        "name": "Armand Marchant",
        "nation": "BEL"
      },
      {
        "position": 3,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Tanguy Nef",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Dominik Raschner",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Victor Muffat-Jeandet",
        "nation": "FRA"
      },
      {
        "position": 8,
        "name": "Linus Strasser",
        "nation": "GER"
      },
      {
        "position": 9,
        "name": "Albert Popov",
        "nation": "BUL"
      },
      {
        "position": 10,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      }
    ]
  },
  {
    "fisRaceId": 127336,
    "place": "Gurgl",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2025-11-23",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127336",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 3,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Lena Duerr",
        "nation": "GER"
      },
      {
        "position": 8,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 9,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 10,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      }
    ]
  },
  {
    "fisRaceId": 127440,
    "place": "Copper Mountain, CO",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2025-11-27",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127440",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Stefan Babinsky",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Fredrik Moeller",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Lukas Feurstein",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Guglielmo Bosca",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Ryan Cochran-Siegle",
        "nation": "USA"
      }
    ]
  },
  {
    "fisRaceId": 127441,
    "place": "Copper Mountain, CO",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2025-11-28",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127441",
    "finishes": [
      {
        "position": 1,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Filip Zubcic",
        "nation": "CRO"
      },
      {
        "position": 4,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 6,
        "name": "Zan Kranjec",
        "nation": "SLO"
      },
      {
        "position": 7,
        "name": "Sam Maes",
        "nation": "BEL"
      },
      {
        "position": 9,
        "name": "Thomas Tumler",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Alexander Schmid",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127442,
    "place": "Copper Mountain, CO",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2025-11-29",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127442",
    "finishes": [
      {
        "position": 1,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 2,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 5,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Lena Duerr",
        "nation": "GER"
      },
      {
        "position": 7,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 8,
        "name": "Mina Fuerst Holtmann",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Asja Zenere",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Katharina Liensberger",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127443,
    "place": "Copper Mountain, CO",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2025-11-30",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127443",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Lena Duerr",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 4,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 6,
        "name": "Katharina Liensberger",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 9,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 10,
        "name": "Camille Rast",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127340,
    "place": "Beaver Creek",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2025-12-04",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127340",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Ryan Cochran-Siegle",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Adrian Smiseth Sejersted",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Stefan Eichberger",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Cameron Alexander",
        "nation": "CAN"
      }
    ]
  },
  {
    "fisRaceId": 127341,
    "place": "Beaver Creek",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2025-12-05",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127341",
    "finishes": [
      {
        "position": 1,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Fredrik Moeller",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Stefan Eichberger",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "James Crawford",
        "nation": "CAN"
      },
      {
        "position": 8,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Stefan Babinsky",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127343,
    "place": "Tremblant",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2025-12-06",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127343",
    "finishes": [
      {
        "position": 1,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 2,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 3,
        "name": "Valerie Grenier",
        "nation": "CAN"
      },
      {
        "position": 4,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Clara Direz",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Estelle Alphand",
        "nation": "SWE"
      },
      {
        "position": 8,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Nina O'Brien",
        "nation": "USA"
      }
    ]
  },
  {
    "fisRaceId": 127342,
    "place": "Beaver Creek",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2025-12-07",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127342",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 3,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 6,
        "name": "River Radamus",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Thibaut Favrot",
        "nation": "FRA"
      },
      {
        "position": 9,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Lukas Feurstein",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127344,
    "place": "Tremblant",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2025-12-07",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127344",
    "finishes": [
      {
        "position": 1,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 3,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 4,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 8,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Lena Duerr",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127347,
    "place": "St. Moritz",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2025-12-12",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127347",
    "finishes": [
      {
        "position": 1,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Magdalena Egger",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Mirjam Puchner",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Romane Miradoli",
        "nation": "FRA"
      },
      {
        "position": 8,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Nina Ortlieb",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127348,
    "place": "St. Moritz",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2025-12-13",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127348",
    "finishes": [
      {
        "position": 1,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 2,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Mirjam Puchner",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Magdalena Egger",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Nina Ortlieb",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Marte Monsen",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Ariane Raedler",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127350,
    "place": "Val d'Isere",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2025-12-13",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127350",
    "finishes": [
      {
        "position": 1,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Luca Aerni",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "River Radamus",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 8,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Patrick Feurstein",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Ryder Sarchett",
        "nation": "USA"
      }
    ]
  },
  {
    "fisRaceId": 127349,
    "place": "St. Moritz",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2025-12-14",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127349",
    "finishes": [
      {
        "position": 1,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 2,
        "name": "Romane Miradoli",
        "nation": "FRA"
      },
      {
        "position": 3,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Laura Gauche",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Malorie Blanc",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      }
    ]
  },
  {
    "fisRaceId": 127351,
    "place": "Val d'Isere",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2025-12-14",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127351",
    "finishes": [
      {
        "position": 1,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Oscar Andreas Sandvik",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Hans Grahl-Madsen",
        "nation": "NOR"
      },
      {
        "position": 7,
        "name": "Tommaso Sala",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Steven Amiez",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Matthias Iten",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127352,
    "place": "Courchevel",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2025-12-16",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127352",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 7,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Marion Chevrier",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Dzenifera Germane",
        "nation": "LAT"
      }
    ]
  },
  {
    "fisRaceId": 127339,
    "place": "Val Gardena-Groeden Südtirol",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2025-12-18",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127339",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Nils Allegre",
        "nation": "FRA"
      },
      {
        "position": 5,
        "name": "Nils Alphand",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Florian Schieder",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Elian Lehto",
        "nation": "FIN"
      }
    ]
  },
  {
    "fisRaceId": 127357,
    "place": "Val Gardena-Groeden Südtirol",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2025-12-19",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127357",
    "finishes": [
      {
        "position": 1,
        "name": "Jan Zabystran",
        "nation": "CZE"
      },
      {
        "position": 2,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Nils Allegre",
        "nation": "FRA"
      },
      {
        "position": 5,
        "name": "Matthieu Bailet",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Christof Innerhofer",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Daniel Hemetsberger",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Raphael Haaser",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127360,
    "place": "Val d'Isere",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2025-12-20",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127360",
    "finishes": [
      {
        "position": 1,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Ilka Stuhec",
        "nation": "SLO"
      },
      {
        "position": 5,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 6,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 7,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Nicol Delago",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Emma Aicher",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127356,
    "place": "Val Gardena-Groeden Südtirol",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2025-12-20",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127356",
    "finishes": [
      {
        "position": 1,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Florian Schieder",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Nils Alphand",
        "nation": "FRA"
      },
      {
        "position": 5,
        "name": "Alessio Miggiano",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Niels Hintermann",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Adrien Theaux",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Elian Lehto",
        "nation": "FIN"
      }
    ]
  },
  {
    "fisRaceId": 127362,
    "place": "Alta Badia",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2025-12-21",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127362",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 3,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Fabian Gratz",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "River Radamus",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Patrick Feurstein",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Loic Meillard",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127361,
    "place": "Val d'Isere",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2025-12-21",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127361",
    "finishes": [
      {
        "position": 1,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 3,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Elena Curtoni",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Camille Cerutti",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Ilka Stuhec",
        "nation": "SLO"
      },
      {
        "position": 8,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Romane Miradoli",
        "nation": "FRA"
      }
    ]
  },
  {
    "fisRaceId": 127363,
    "place": "Alta Badia",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2025-12-22",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127363",
    "finishes": [
      {
        "position": 1,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 3,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 6,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 7,
        "name": "Tanguy Nef",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 9,
        "name": "Oscar Andreas Sandvik",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127364,
    "place": "Livigno",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2025-12-27",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127364",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Simon Jocher",
        "nation": "GER"
      },
      {
        "position": 7,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Guglielmo Bosca",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Nils Allegre",
        "nation": "FRA"
      }
    ]
  },
  {
    "fisRaceId": 127365,
    "place": "Semmering",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2025-12-27",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127365",
    "finishes": [
      {
        "position": 1,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 4,
        "name": "Valerie Grenier",
        "nation": "CAN"
      },
      {
        "position": 5,
        "name": "Maryna Gasienica-Daniel",
        "nation": "POL"
      },
      {
        "position": 6,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Lena Duerr",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127366,
    "place": "Semmering",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2025-12-28",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127366",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 4,
        "name": "Katharina Liensberger",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Cornelia Oehlund",
        "nation": "SWE"
      },
      {
        "position": 8,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 9,
        "name": "Eliane Christen",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Dzenifera Germane",
        "nation": "LAT"
      }
    ]
  },
  {
    "fisRaceId": 127367,
    "place": "Kranjska Gora",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-01-03",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127367",
    "finishes": [
      {
        "position": 1,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 5,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 7,
        "name": "Maryna Gasienica-Daniel",
        "nation": "POL"
      },
      {
        "position": 8,
        "name": "Nina O'Brien",
        "nation": "USA"
      },
      {
        "position": 9,
        "name": "Valerie Grenier",
        "nation": "CAN"
      },
      {
        "position": 10,
        "name": "Lara della Mea",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127368,
    "place": "Kranjska Gora",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-01-04",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127368",
    "finishes": [
      {
        "position": 1,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Dzenifera Germane",
        "nation": "LAT"
      },
      {
        "position": 8,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 9,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 10,
        "name": "Martina Peterlini",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127369,
    "place": "Madonna di Campiglio",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-01-07",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127369",
    "finishes": [
      {
        "position": 1,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 2,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 3,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 4,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 5,
        "name": "Eirik Hystad Solberg",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Armand Marchant",
        "nation": "BEL"
      },
      {
        "position": 8,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Steven Amiez",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Tanguy Nef",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127374,
    "place": "Adelboden",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-01-10",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127374",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 3,
        "name": "Leo Anguenot",
        "nation": "FRA"
      },
      {
        "position": 4,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "River Radamus",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Fabian Gratz",
        "nation": "GER"
      },
      {
        "position": 10,
        "name": "Luca Aerni",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127372,
    "place": "Zauchensee",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-01-10",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127372",
    "finishes": [
      {
        "position": 1,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Jacqueline Wiles",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Janine Schmitt",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 7,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Romane Miradoli",
        "nation": "FRA"
      },
      {
        "position": 9,
        "name": "Nicol Delago",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Elena Curtoni",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127375,
    "place": "Adelboden",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-01-11",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127375",
    "finishes": [
      {
        "position": 1,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 2,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 5,
        "name": "Manuel Feller",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 7,
        "name": "Steven Amiez",
        "nation": "FRA"
      },
      {
        "position": 8,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Armand Marchant",
        "nation": "BEL"
      }
    ]
  },
  {
    "fisRaceId": 127376,
    "place": "Flachau",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-01-13",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127376",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 7,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 8,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 9,
        "name": "Eliane Christen",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Katharina Huber",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127380,
    "place": "Wengen",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-01-16",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127380",
    "finishes": [
      {
        "position": 1,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Stefan Babinsky",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Ryan Cochran-Siegle",
        "nation": "USA"
      },
      {
        "position": 7,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Adrian Smiseth Sejersted",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Nils Allegre",
        "nation": "FRA"
      }
    ]
  },
  {
    "fisRaceId": 127385,
    "place": "Tarvisio",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-01-17",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127385",
    "finishes": [
      {
        "position": 1,
        "name": "Nicol Delago",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Nina Ortlieb",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Ilka Stuhec",
        "nation": "SLO"
      },
      {
        "position": 9,
        "name": "Marte Monsen",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Nadia Delago",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127381,
    "place": "Wengen",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-01-17",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127381",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Cameron Alexander",
        "nation": "CAN"
      },
      {
        "position": 8,
        "name": "Daniel Hemetsberger",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Nils Allegre",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Christof Innerhofer",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127386,
    "place": "Tarvisio",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-01-18",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127386",
    "finishes": [
      {
        "position": 1,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 2,
        "name": "Lindsey Vonn",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 4,
        "name": "Romane Miradoli",
        "nation": "FRA"
      },
      {
        "position": 5,
        "name": "Keely Cashman",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 9,
        "name": "Mirjam Puchner",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Laura Pirovano",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127382,
    "place": "Wengen",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-01-18",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127382",
    "finishes": [
      {
        "position": 1,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 3,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Matthias Iten",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Filip Zubcic",
        "nation": "CRO"
      },
      {
        "position": 9,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Eirik Hystad Solberg",
        "nation": "NOR"
      }
    ]
  },
  {
    "fisRaceId": 127387,
    "place": "Kronplatz",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-01-20",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127387",
    "finishes": [
      {
        "position": 1,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 4,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Maryna Gasienica-Daniel",
        "nation": "POL"
      },
      {
        "position": 6,
        "name": "Federica Brignone",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 9,
        "name": "Valerie Grenier",
        "nation": "CAN"
      },
      {
        "position": 10,
        "name": "Lara della Mea",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127391,
    "place": "Kitzbuehel",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-01-23",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127391",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Stefan Babinsky",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Adrian Smiseth Sejersted",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Christof Innerhofer",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127392,
    "place": "Kitzbuehel",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-01-24",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127392",
    "finishes": [
      {
        "position": 1,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Maxence Muzaton",
        "nation": "FRA"
      },
      {
        "position": 4,
        "name": "Florian Schieder",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Nils Allegre",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Niels Hintermann",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Luis Vogt",
        "nation": "GER"
      },
      {
        "position": 9,
        "name": "Miha Hrobat",
        "nation": "SLO"
      },
      {
        "position": 10,
        "name": "Felix Monsen",
        "nation": "SWE"
      }
    ]
  },
  {
    "fisRaceId": 127394,
    "place": "Spindleruv Mlyn",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-01-24",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127394",
    "finishes": [
      {
        "position": 1,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 2,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Nina O'Brien",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Sue Piller",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Lara della Mea",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "J Hurt A",
        "nation": "USA"
      },
      {
        "position": 9,
        "name": "Britt Richardson",
        "nation": "CAN"
      },
      {
        "position": 10,
        "name": "Emma Aicher",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127393,
    "place": "Kitzbuehel",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-01-25",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127393",
    "finishes": [
      {
        "position": 1,
        "name": "Manuel Feller",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Linus Strasser",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 5,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 6,
        "name": "Armand Marchant",
        "nation": "BEL"
      },
      {
        "position": 7,
        "name": "Tanguy Nef",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 9,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      }
    ]
  },
  {
    "fisRaceId": 127395,
    "place": "Spindleruv Mlyn",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-01-25",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127395",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 7,
        "name": "Katharina Huber",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 10,
        "name": "Lena Duerr",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127396,
    "place": "Schladming",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-01-27",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127396",
    "finishes": [
      {
        "position": 1,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 3,
        "name": "Alban Elezi Cannaferina",
        "nation": "FRA"
      },
      {
        "position": 4,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Sam Maes",
        "nation": "BEL"
      },
      {
        "position": 7,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Giovanni Borsotti",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Anton Grammel",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127397,
    "place": "Schladming",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-01-28",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127397",
    "finishes": [
      {
        "position": 1,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 4,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 5,
        "name": "Fabio Gstrein",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 7,
        "name": "Alex Vinatzer",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Eirik Hystad Solberg",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Tanguy Nef",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Manuel Feller",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127402,
    "place": "Crans Montana",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-01-31",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127402",
    "finishes": [
      {
        "position": 1,
        "name": "Malorie Blanc",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 3,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Roberta Melesi",
        "nation": "ITA"
      },
      {
        "position": 5,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 7,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Mirjam Puchner",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Ester Ledecka",
        "nation": "CZE"
      }
    ]
  },
  {
    "fisRaceId": 127404,
    "place": "Crans Montana",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-02-01",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127404",
    "finishes": [
      {
        "position": 1,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 3,
        "name": "Ryan Cochran-Siegle",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Benjamin Jacques Alliod",
        "nation": "ITA"
      },
      {
        "position": 6,
        "name": "Lars Roesti",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Alessio Miggiano",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Florian Schieder",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Alexis Monney",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127412,
    "place": "Soldeu",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-02-27",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127412",
    "finishes": [
      {
        "position": 1,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Nina Ortlieb",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 5,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Jacqueline Wiles",
        "nation": "USA"
      },
      {
        "position": 9,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Ester Ledecka",
        "nation": "CZE"
      }
    ]
  },
  {
    "fisRaceId": 127407,
    "place": "Garmisch Partenkirchen",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-02-28",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127407",
    "finishes": [
      {
        "position": 1,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 2,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Ryan Cochran-Siegle",
        "nation": "USA"
      },
      {
        "position": 8,
        "name": "Florian Schieder",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Justin Murisier",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127373,
    "place": "Soldeu",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-02-28",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127373",
    "finishes": [
      {
        "position": 1,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 2,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 3,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 5,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 7,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 8,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Laura Gauche",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127413,
    "place": "Soldeu",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-03-01",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127413",
    "finishes": [
      {
        "position": 1,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 6,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 7,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 8,
        "name": "Federica Brignone",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Nina Ortlieb",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127400,
    "place": "Val di Fassa",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-03-06",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127400",
    "finishes": [
      {
        "position": 1,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 4,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 5,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Ilka Stuhec",
        "nation": "SLO"
      },
      {
        "position": 8,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 9,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Elena Curtoni",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127419,
    "place": "Kranjska Gora",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-03-07",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127419",
    "finishes": [
      {
        "position": 1,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 2,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 6,
        "name": "Leo Anguenot",
        "nation": "FRA"
      },
      {
        "position": 7,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Anton Grammel",
        "nation": "GER"
      },
      {
        "position": 9,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Marco Schwarz",
        "nation": "AUT"
      }
    ]
  },
  {
    "fisRaceId": 127417,
    "place": "Val di Fassa",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-03-07",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127417",
    "finishes": [
      {
        "position": 1,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 5,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 9,
        "name": "Marte Monsen",
        "nation": "NOR"
      }
    ]
  },
  {
    "fisRaceId": 127420,
    "place": "Kranjska Gora",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-03-08",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127420",
    "finishes": [
      {
        "position": 1,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 4,
        "name": "Michael Matt",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Linus Strasser",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 7,
        "name": "Dominik Raschner",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Eirik Hystad Solberg",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Paco Rassat",
        "nation": "FRA"
      },
      {
        "position": 10,
        "name": "Tanguy Nef",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127418,
    "place": "Val di Fassa",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-03-08",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127418",
    "finishes": [
      {
        "position": 1,
        "name": "Elena Curtoni",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Kajsa Vickhoff Lie",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Asja Zenere",
        "nation": "ITA"
      },
      {
        "position": 4,
        "name": "Romane Miradoli",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Malorie Blanc",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Stefanie Grob",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127424,
    "place": "Courchevel",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-03-13",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127424",
    "finishes": [
      {
        "position": 1,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 3,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Daniel Hemetsberger",
        "nation": "AUT"
      },
      {
        "position": 7,
        "name": "Miha Hrobat",
        "nation": "SLO"
      },
      {
        "position": 8,
        "name": "Martin Cater",
        "nation": "SLO"
      },
      {
        "position": 9,
        "name": "Adrian Smiseth Sejersted",
        "nation": "NOR"
      },
      {
        "position": 10,
        "name": "Justin Murisier",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127426,
    "place": "Are",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-03-14",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127426",
    "finishes": [
      {
        "position": 1,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 2,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 4,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 5,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Zrinka Ljutic",
        "nation": "CRO"
      },
      {
        "position": 7,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 8,
        "name": "Thea Louise Stjernesund",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "J Hurt A",
        "nation": "USA"
      },
      {
        "position": 10,
        "name": "Asja Zenere",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127408,
    "place": "Courchevel",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-03-14",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127408",
    "finishes": []
  },
  {
    "fisRaceId": 127427,
    "place": "Are",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-03-15",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127427",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 3,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 4,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Dzenifera Germane",
        "nation": "LAT"
      },
      {
        "position": 7,
        "name": "Cornelia Oehlund",
        "nation": "SWE"
      },
      {
        "position": 8,
        "name": "Lara Colturi",
        "nation": "ALB"
      },
      {
        "position": 9,
        "name": "Hanna Aronsson Elfman",
        "nation": "SWE"
      },
      {
        "position": 10,
        "name": "Camille Rast",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127425,
    "place": "Courchevel",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-03-15",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127425",
    "finishes": []
  },
  {
    "fisRaceId": 127433,
    "place": "Lillehammer",
    "discipline": "DH",
    "gender": "M",
    "raceDate": "2026-03-21",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127433",
    "finishes": [
      {
        "position": 1,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Miha Hrobat",
        "nation": "SLO"
      },
      {
        "position": 6,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Marco Odermatt",
        "nation": "SUI"
      },
      {
        "position": 8,
        "name": "Benjamin Jacques Alliod",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Daniel Hemetsberger",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Florian Schieder",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127432,
    "place": "Lillehammer",
    "discipline": "DH",
    "gender": "W",
    "raceDate": "2026-03-21",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127432",
    "finishes": [
      {
        "position": 1,
        "name": "Laura Pirovano",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Breezy Johnson",
        "nation": "USA"
      },
      {
        "position": 3,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 6,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Nicol Delago",
        "nation": "ITA"
      },
      {
        "position": 8,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Sofia Goggia",
        "nation": "ITA"
      }
    ]
  },
  {
    "fisRaceId": 127434,
    "place": "Lillehammer",
    "discipline": "SG",
    "gender": "W",
    "raceDate": "2026-03-22",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127434",
    "finishes": [
      {
        "position": 1,
        "name": "Sofia Goggia",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Corinne Suter",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Kira Weidle-Winkelmann",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 5,
        "name": "Cornelia Huetter",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Ester Ledecka",
        "nation": "CZE"
      },
      {
        "position": 7,
        "name": "Ariane Raedler",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Elena Curtoni",
        "nation": "ITA"
      },
      {
        "position": 9,
        "name": "Malorie Blanc",
        "nation": "SUI"
      },
      {
        "position": 10,
        "name": "Keely Cashman",
        "nation": "USA"
      }
    ]
  },
  {
    "fisRaceId": 127435,
    "place": "Lillehammer",
    "discipline": "SG",
    "gender": "M",
    "raceDate": "2026-03-22",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127435",
    "finishes": [
      {
        "position": 1,
        "name": "Dominik Paris",
        "nation": "ITA"
      },
      {
        "position": 2,
        "name": "Vincent Kriechmayr",
        "nation": "AUT"
      },
      {
        "position": 3,
        "name": "Raphael Haaser",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Alexis Monney",
        "nation": "SUI"
      },
      {
        "position": 5,
        "name": "Giovanni Franzoni",
        "nation": "ITA"
      },
      {
        "position": 6,
        "name": "Stefan Rogentin",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Fredrik Moeller",
        "nation": "NOR"
      },
      {
        "position": 8,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Mattia Casse",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Franjo von Allmen",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127436,
    "place": "Lillehammer",
    "discipline": "GS",
    "gender": "M",
    "raceDate": "2026-03-24",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127436",
    "finishes": [
      {
        "position": 1,
        "name": "Lucas Pinheiro Braathen",
        "nation": "BRA"
      },
      {
        "position": 2,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 4,
        "name": "Stefan Brennsteiner",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 6,
        "name": "Sam Maes",
        "nation": "BEL"
      },
      {
        "position": 7,
        "name": "Joshua Sturm",
        "nation": "AUT"
      },
      {
        "position": 9,
        "name": "Marco Schwarz",
        "nation": "AUT"
      },
      {
        "position": 10,
        "name": "Fabian Gratz",
        "nation": "GER"
      }
    ]
  },
  {
    "fisRaceId": 127437,
    "place": "Lillehammer",
    "discipline": "SL",
    "gender": "W",
    "raceDate": "2026-03-24",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127437",
    "finishes": [
      {
        "position": 1,
        "name": "Mikaela Shiffrin",
        "nation": "USA"
      },
      {
        "position": 2,
        "name": "Wendy Holdener",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Emma Aicher",
        "nation": "GER"
      },
      {
        "position": 4,
        "name": "Katharina Truppe",
        "nation": "AUT"
      },
      {
        "position": 5,
        "name": "Paula Moltzan",
        "nation": "USA"
      },
      {
        "position": 6,
        "name": "Anna Swenn Larsson",
        "nation": "SWE"
      },
      {
        "position": 7,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 8,
        "name": "Caitlin McFarlane",
        "nation": "FRA"
      },
      {
        "position": 9,
        "name": "Anna Trocker",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Marion Chevrier",
        "nation": "FRA"
      }
    ]
  },
  {
    "fisRaceId": 127438,
    "place": "Lillehammer",
    "discipline": "GS",
    "gender": "W",
    "raceDate": "2026-03-25",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127438",
    "finishes": [
      {
        "position": 1,
        "name": "Valerie Grenier",
        "nation": "CAN"
      },
      {
        "position": 2,
        "name": "Mina Fuerst Holtmann",
        "nation": "NOR"
      },
      {
        "position": 3,
        "name": "Julia Scheib",
        "nation": "AUT"
      },
      {
        "position": 4,
        "name": "Sara Hector",
        "nation": "SWE"
      },
      {
        "position": 5,
        "name": "Stephanie Brunner",
        "nation": "AUT"
      },
      {
        "position": 6,
        "name": "Camille Rast",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Alice Robinson",
        "nation": "NZL"
      },
      {
        "position": 8,
        "name": "Anna Trocker",
        "nation": "ITA"
      },
      {
        "position": 10,
        "name": "Vanessa Kasper",
        "nation": "SUI"
      }
    ]
  },
  {
    "fisRaceId": 127439,
    "place": "Lillehammer",
    "discipline": "SL",
    "gender": "M",
    "raceDate": "2026-03-25",
    "resultUrl": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=127439",
    "finishes": [
      {
        "position": 1,
        "name": "Timon Haugan",
        "nation": "NOR"
      },
      {
        "position": 2,
        "name": "Loic Meillard",
        "nation": "SUI"
      },
      {
        "position": 3,
        "name": "Eduard Hallberg",
        "nation": "FIN"
      },
      {
        "position": 4,
        "name": "Henrik Kristoffersen",
        "nation": "NOR"
      },
      {
        "position": 5,
        "name": "Clement Noel",
        "nation": "FRA"
      },
      {
        "position": 6,
        "name": "Tanguy Nef",
        "nation": "SUI"
      },
      {
        "position": 7,
        "name": "Michael Matt",
        "nation": "AUT"
      },
      {
        "position": 8,
        "name": "Atle Lie McGrath",
        "nation": "NOR"
      },
      {
        "position": 9,
        "name": "Linus Strasser",
        "nation": "GER"
      },
      {
        "position": 10,
        "name": "Victor Muffat-Jeandet",
        "nation": "FRA"
      }
    ]
  }
];
