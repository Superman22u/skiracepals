export type Gender = "W" | "M";
export type Discipline = "DH" | "SG" | "GS" | "SL" | "AC";

export type User = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  isAdmin: boolean;
  totalPoints: number;
};

export type RaceSummary = {
  id: number;
  place: string;
  discipline: Discipline;
  gender: Gender;
  raceDate: string;
  bettingOpen: boolean;
  hasBet: boolean;
  due: boolean;
  hasResults: boolean;
  points: number | null;
  lastYearUrl: string | null;
  lastYearWinner: string | null;
};

export type Skier = {
  id: number;
  name: string;
  nation: string;
  gender: Gender;
  rank?: number | null;
  rankNote?: "this season" | "last season" | null;
};

export type RaceDetail = {
  id: number;
  place: string;
  discipline: Discipline;
  gender: Gender;
  raceDate: string;
  fisRaceId: number | null;
  bettingOpen: boolean;
  hasResults: boolean;
  points: number | null;
  picks: {
    position: number;
    skierId: number;
    name: string;
    nation: string;
    actual: number | null;
    points: number | null;
  }[];
  results: {
    position: number;
    skierId: number;
    name: string;
    nation: string;
  }[];
  lastYear: {
    raceDate: string;
    url: string;
    winner: string | null;
  }[];
  suggestion: {
    skierId: number;
    name: string;
    nation: string;
    reason: string;
  }[] | null;
};

export type RankedRow = {
  rank: number;
  userId: number;
  nickname: string;
  points: number;
  exact: number;
  topFive: number;
};

export type RankingResponse = {
  visible: boolean;
  rows: RankedRow[];
  groups: {
    id: number;
    name: string;
    ownerNickname: string;
    rows: RankedRow[];
  }[];
  myRaces: {
    raceId: number;
    place: string;
    discipline: Discipline;
    gender: Gender;
    raceDate: string;
    points: number;
    pending: boolean;
  }[];
};
