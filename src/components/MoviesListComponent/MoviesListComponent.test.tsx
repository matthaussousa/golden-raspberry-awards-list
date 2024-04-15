import { fireEvent, getByRole, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-dom/test-utils";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import MoviesListComponent from "./MoviesListComponent";

describe("MoviesListComponent", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<MoviesListComponent />);
    expect(getByTestId("movies-list")).toBeInTheDocument();
  });

  it("should render with data", async () => {
    const expectedData = {
      totalElements: 2,
      content: [
        {
          id: 1,
          year: 1990,
          title: "Movie 1",
          winner: true,
        },
        {
          id: 2,
          year: 2000,
          title: "Movie 2",
          winner: false,
        },
      ],
    };

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByText } = renderWithQueryClient(<MoviesListComponent />);

    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
      expect(getByText("Movie 2")).toBeInTheDocument();
    });
  });

  it("should filter year", async () => {
    const expectedData = {
      totalElements: 2,
      content: [],
    };

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<MoviesListComponent />);

    const container = document.querySelector("#yearColumn") as HTMLElement;

    fireEvent.click(getByRole(container, "button"));

    const searchInput = getByTestId("table-filter-text") as HTMLInputElement;
    fireEvent.change(searchInput, {
      target: { value: 1990 },
    });

    await act(async () => {
      fireEvent.click(getByTestId("table-filter-ok"));
    });

    expect(mock.history.get.length).toBe(2);
    expect(mock.history.get[1].params).toStrictEqual({
      year: 1990,
      page: 0,
      size: 10,
      winner: undefined,
    });
  });

  it("should filter winner", async () => {
    const expectedData = {
      totalElements: 2,
      content: [],
    };

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId, getByText } = renderWithQueryClient(
      <MoviesListComponent />
    );

    const container = document.querySelector("#winnerColumn") as HTMLElement;

    fireEvent.click(getByRole(container, "button"));

    await act(async () => {
      fireEvent.click(getByTestId("winner-yes"));
      fireEvent.click(getByText("OK"));
    });

    expect(mock.history.get.length).toBe(2);
    expect(mock.history.get[1].params).toStrictEqual({
      year: undefined,
      page: 0,
      size: 10,
      winner: true,
    });
  });

  it("should paginate", async () => {
    const expectedData = {
      totalElements: 11,
      content: [
        {
          id: 1,
          year: 1990,
          title: "Movie 1",
          winner: true,
        },
        {
          id: 2,
          year: 2000,
          title: "Movie 2",
          winner: false,
        },
        {
          id: 3,
          year: 2005,
          title: "Movie 3",
          winner: true,
        },
        {
          id: 4,
          year: 2010,
          title: "Movie 4",
          winner: false,
        },
        {
          id: 5,
          year: 2015,
          title: "Movie 5",
          winner: true,
        },
        {
          id: 6,
          year: 2020,
          title: "Movie 6",
          winner: false,
        },
        {
          id: 7,
          year: 2025,
          title: "Movie 7",
          winner: true,
        },
        {
          id: 8,
          year: 2030,
          title: "Movie 8",
          winner: false,
        },
        {
          id: 9,
          year: 2035,
          title: "Movie 9",
          winner: true,
        },
        {
          id: 10,
          year: 2040,
          title: "Movie 10",
          winner: false,
        },
        {
          id: 11,
          year: 2040,
          title: "Movie 11",
          winner: false,
        },
      ],
    };

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTitle, getByText } = renderWithQueryClient(
      <MoviesListComponent />
    );

    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
      expect(getByText("Movie 2")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByTitle("2"));
    });

    expect(mock.history.get.length).toBe(2);
    expect(mock.history.get[1].params).toStrictEqual({
      year: undefined,
      page: 1,
      size: 10,
      winner: undefined,
    });
  });
});
