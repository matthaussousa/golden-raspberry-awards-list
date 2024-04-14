import { waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import MovieListPage from "./MovieListPage";

describe("MovieListPage", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<MovieListPage />);

    waitFor(() => {
      expect(getByTestId("movies-list")).toBeInTheDocument();
    });
  });
});
