import { AxiosPromise } from "axios";
import {
  MovieAPIParams,
  MovieType,
  PaginatedResponse,
  ProducersWinsType,
  TopStudioWinnersType,
  YearsWithMultipleWinnersType,
} from "../types/movieTypes";
import provider from "./provider";

/**
 * Retrieves the years with multiple winners from the movies provider.
 * @returns {AxiosPromise<YearsWithMultipleWinnersType>} The promise that resolves to the years with multiple winners.
 */
export function getYearsWithMultipleWinners(): AxiosPromise<YearsWithMultipleWinnersType> {
  const url = "/movies?projection=years-with-multiple-winners";

  return provider.get(url);
}

/**
 * Retrieves the top studio winners from the server.
 * @returns {AxiosPromise<TopStudioWinnersType>} The promise that resolves to the top studio winners.
 */
export function getTopStudioWinners(): AxiosPromise<TopStudioWinnersType> {
  const url = "/movies?projection=studios-with-win-count";

  return provider.get(url);
}

/**
 * Retrieves the list of producer wins from the server.
 * @returns {AxiosPromise<ProducersWinsType>} The promise that resolves to the list of producer wins.
 */
export function getProducersWins(): AxiosPromise<ProducersWinsType> {
  const url = "/movies?projection=max-min-win-interval-for-producers";

  return provider.get(url);
}

/**
 * Retrieves the list of winning movies by year.
 * If a year is provided, it retrieves the winning movies for that specific year.
 * If no year is provided, it retrieves the winning movies for all years.
 *
 * @param year - The year for which to retrieve the winning movies (optional).
 * @returns A promise that resolves to an array of MovieType objects representing the winning movies.
 */
export function getWinnersMoviesByYear(
  year?: number
): AxiosPromise<MovieType[]> {
  const url = "/movies";

  return provider.get(url, {
    params: {
      winner: true,
      year,
    },
  });
}

/**
 * Retrieves a list of movies based on the provided parameters.
 *
 * @param params - The parameters for the movie API request.
 * @returns A promise that resolves to the paginated response containing the list of movies.
 */
export function getMovies(
  params: MovieAPIParams
): AxiosPromise<PaginatedResponse<MovieType>> {
  const url = "/movies";

  return provider.get(url, { params });
}
