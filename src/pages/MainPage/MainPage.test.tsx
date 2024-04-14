import { render } from "@testing-library/react";
import MainPage from "./MainPage";
import { MemoryRouter } from "react-router-dom";

describe("MainPage", () => {
  it("should render the page correctly", () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <MainPage />
      </MemoryRouter>
    );

    expect(getByText("Golden Raspberry Awards")).toBeInTheDocument();
    expect(getByTestId("main-page-body")).toBeInTheDocument();
  });
});
