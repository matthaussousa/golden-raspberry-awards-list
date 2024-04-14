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
  page: number;
  size: number;
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

export interface PaginatedResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface MovieFilterParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}
