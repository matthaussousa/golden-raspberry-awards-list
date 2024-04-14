import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import DashboardPage from "./DashboardPage";
import { waitFor } from "@testing-library/react";

describe("DashhboardPage", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock.onGet(`${baseURL}/movies`).reply(200, expectedData);
    mock
      .onGet(`${baseURL}/movies?projection=max-min-win-interval-for-producers`)
      .reply(200, expectedData);
    mock
      .onGet(`${baseURL}/movies?projection=studios-with-win-count`)
      .reply(200, expectedData);
    mock
      .onGet(`${baseURL}/movies?projection=years-with-multiple-winners`)
      .reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<DashboardPage />);

    waitFor(() => {
      expect(getByTestId("movies-list")).toBeInTheDocument();
      expect(getByTestId("movies-winners-by-year-list")).toBeInTheDocument();
      expect(getByTestId("producers-wins-max-list")).toBeInTheDocument();
      expect(getByTestId("producers-wins-min-list")).toBeInTheDocument();
      expect(getByTestId("studio-winners-list")).toBeInTheDocument();
      expect(getByTestId("years-multiple-winners-list")).toBeInTheDocument();
    });
  });
});
