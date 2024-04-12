export interface YearWinnerType {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersType {
  years: YearWinnerType[];
}

export interface StudioWinnerType {
  name: string;
  winCount: number;
}

export interface TopStudioWinnersType {
  studios: StudioWinnerType[];
}

export interface ProducerWinType {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersWinsType {
  min: ProducerWinType[];
  max: ProducerWinType[];
}

export interface MovieAPIParams {
  page?: number;
  size?: number;
  winner?: boolean;
  year?: number;
}

export interface MovieType {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}
