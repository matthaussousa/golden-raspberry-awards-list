import { waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import provider, { baseURL } from "../../providers/provider";
import { renderWithQueryClient } from "../../tests/utils";
import TopStudioWinnersComponent from "./TopStudioWinnersComponent";

describe("TopStudioWinnersComponent", () => {
  it("should render", async () => {
    const expectedData = {};

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=studios-with-win-count`)
      .reply(200, expectedData);

    const { getByTestId } = renderWithQueryClient(
      <TopStudioWinnersComponent />
    );
    expect(getByTestId("studio-winners-list")).toBeInTheDocument();
  });

  it("should render with data", async () => {
    const expectedData = {
      studios: [
        { name: "Studio 1", winCount: 1 },
        { name: "Studio 2", winCount: 1 },
      ],
    };

    const mock = new MockAdapter(provider);

    mock
      .onGet(`${baseURL}/movies?projection=studios-with-win-count`)
      .reply(200, expectedData);

    const { getByText } = renderWithQueryClient(<TopStudioWinnersComponent />);

    await waitFor(() => {
      expect(getByText("Studio 1")).toBeInTheDocument();
      expect(getByText("Studio 2")).toBeInTheDocument();
    });
  });
});
