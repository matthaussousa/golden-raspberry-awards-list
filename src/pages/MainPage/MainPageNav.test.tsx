import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainPageNav from "./MainPageNav";

describe("MainPageNav", () => {
  it("should highlight the active link correctly", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <MainPageNav />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText("Dashboard");
    const listLink = screen.getByText("List");

    waitFor(() => {
      expect(dashboardLink).toHaveClass("text-blue-400");
      expect(listLink).not.toHaveClass("text-blue-400");
    });
  });

  it("should navigate to the correct route when a link is clicked", () => {
    render(
      <MemoryRouter>
        <MainPageNav />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText("Dashboard");
    const listLink = screen.getByText("List");

    waitFor(() => {
      expect(screen.getByTestId("main-page-nav")).toBeInTheDocument();
    });

    // Simulate clicking on the "List" link
    listLink.click();

    waitFor(() => {
      expect(screen.getByTestId("main-page-nav")).toBeInTheDocument();
      expect(screen.getByTestId("main-page-nav")).toHaveTextContent("List");
    });

    // Simulate clicking on the "Dashboard" link
    dashboardLink.click();

    waitFor(() => {
      expect(screen.getByTestId("main-page-nav")).toBeInTheDocument();
      expect(screen.getByTestId("main-page-nav")).toHaveTextContent(
        "Dashboard"
      );
    });
  });
});
