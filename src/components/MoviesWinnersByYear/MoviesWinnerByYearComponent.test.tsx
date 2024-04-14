import { fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import MoviesWinnersByYear from "./MoviesWinnersByYearComponent";
import { act } from "react-dom/test-utils";

describe("MoviesWinnerByYearComponent", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<MoviesWinnersByYear />);
    expect(getByTestId("movies-winners-by-year-list")).toBeInTheDocument();
  });

  it("should get movies by year", async () => {
    const expectedData = [
      {
        id: 1,
        year: 1990,
        title: "Movie 1",
        winner: true,
      },
    ];

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId, getByText } = renderWithQueryClient(
      <MoviesWinnersByYear />
    );

    const searchInput = getByTestId("year-input") as HTMLInputElement;
    fireEvent.change(searchInput, {
      target: { value: 1990 },
    });

    await act(async () => {
      fireEvent.click(getByTestId("year-search"));
    });

    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
    });

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].params).toStrictEqual({
      year: 1990,
      winner: true,
    });
  });
});
