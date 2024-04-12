import { AxiosPromise } from "axios";
import {
  MovieAPIParams,
  MovieType,
  ProducersWinsType,
  TopStudioWinnersType,
  YearsWithMultipleWinnersType,
} from "../types/movieTypes";
import provider from "./provider";

export function getYearsWithMultipleWinners(): AxiosPromise<YearsWithMultipleWinnersType> {
  const url = "/movies?projection=years-with-multiple-winners";

  return provider.get(url);
}

export function getTopStudioWinners(): AxiosPromise<TopStudioWinnersType> {
  const url = "/movies?projection=studios-with-win-count";

  return provider.get(url);
}

export function getProducersWins(): AxiosPromise<ProducersWinsType> {
  const url = "/movies?projection=max-min-win-interval-for-producers";

  return provider.get(url);
}

export function getMovies(params: MovieAPIParams): AxiosPromise<MovieType[]> {
  const url = "/movies";

  return provider.get(url, { params });
}
