import { waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import ProducersWinsComponent from "./ProducersWinsComponent";

describe("ProducersWinsComponent", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=max-min-win-interval-for-producers`)
      .reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(<ProducersWinsComponent />);
    expect(getByTestId("producers-wins-max-list")).toBeInTheDocument();
    expect(getByTestId("producers-wins-min-list")).toBeInTheDocument();
  });

  it("should render with data", async () => {
    const expectedData = {
      min: [
        {
          producer: "Producer 1",
          interval: 1,
          previousWin: 2,
          followingWin: 3,
        },
      ],
      max: [
        {
          producer: "Producer 2",
          interval: 1,
          previousWin: 2,
          followingWin: 3,
        },
      ],
    };

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=max-min-win-interval-for-producers`)
      .reply(200, expectedData);

    const { getByText } = renderWithQueryClient(<ProducersWinsComponent />);

    await waitFor(() => {
      expect(getByText("Producer 1")).toBeInTheDocument();
      expect(getByText("Producer 2")).toBeInTheDocument();
    });
  });
});
