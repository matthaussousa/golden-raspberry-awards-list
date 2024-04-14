import { waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import YearsWithMultipleWinnersComponent from "./YearsWithMultipleWinnersComponent";

describe("YearsWithMultipleWinnersComponent", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=years-with-multiple-winners`)
      .reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(
      <YearsWithMultipleWinnersComponent />
    );
    expect(getByTestId("years-multiple-winners-list")).toBeInTheDocument();
  });

  it("should render with data", async () => {
    const expectedData = {
      years: [
        { year: 1990, winnerCount: 1 },
        { year: 2000, winnerCount: 1 },
      ],
    };

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=years-with-multiple-winners`)
      .reply(200, expectedData);

    const { getByText } = renderWithQueryClient(
      <YearsWithMultipleWinnersComponent />
    );

    await waitFor(() => {
      expect(getByText("1990")).toBeInTheDocument();
      expect(getByText("2000")).toBeInTheDocument();
    });
  });
});
