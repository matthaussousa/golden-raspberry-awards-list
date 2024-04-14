import MockAdapter from "axios-mock-adapter";
import {
  getMovies,
  getProducersWins,
  getTopStudioWinners,
  getWinnersMoviesByYear,
  getYearsWithMultipleWinners,
} from "./moviesProvider.ts";
import provider, { baseURL } from "./provider.ts";

describe("getYearsWithMultipleWinners", () => {
  const path = "/movies?projection=years-with-multiple-winners";

  it("should return data when 200", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getYearsWithMultipleWinners();

    expect(result.data).toEqual(expectedData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(400, errorMessage);

    await expect(getYearsWithMultipleWinners()).rejects.toThrow();
  });
});

describe("getTopStudioWinners", () => {
  const path = "/movies?projection=studios-with-win-count";

  it("should return data when 200", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getTopStudioWinners();

    expect(result.data).toEqual(expectedData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(400, errorMessage);

    await expect(getTopStudioWinners()).rejects.toThrow();
  });
});

describe("getProducersWins", () => {
  const path = "/movies?projection=max-min-win-interval-for-producers";

  it("should return data when 200", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getProducersWins();

    expect(result.data).toEqual(expectedData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(400, errorMessage);

    await expect(getProducersWins()).rejects.toThrow();
  });
});

describe("getWinnersMoviesByYear", () => {
  const path = "/movies";

  it("should return data when 200", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getWinnersMoviesByYear();

    expect(result.data).toEqual(expectedData);
  });

  it("should return data when 200 with year", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getWinnersMoviesByYear(1990);

    expect(result.data).toEqual(expectedData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(400, errorMessage);

    await expect(getWinnersMoviesByYear()).rejects.toThrow();
  });
});

describe("getMovies", () => {
  const path = "/movies";

  it("should return data when 200", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getMovies({ page: 1, size: 10 });

    expect(result.data).toEqual(expectedData);
  });

  it("should return data when 200 with all params", async () => {
    const expectedData = "Success";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(200, expectedData);
    const result = await getMovies({
      page: 1,
      size: 10,
      winner: true,
      year: 1990,
    });

    expect(result.data).toEqual(expectedData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}${path}`).reply(400, errorMessage);

    await expect(getMovies({ page: 1, size: 10 })).rejects.toThrow();
  });
});
