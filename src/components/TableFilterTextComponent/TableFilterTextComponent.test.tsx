import { render, fireEvent, waitFor } from "@testing-library/react";
import TableFilterTextComponent from "./TableFilterTextComponent";
import { vi } from "vitest";

describe("TableFilterTextComponent", () => {
  it("should render with initial value", () => {
    const setSelectedKeys = vi.fn();
    const selectedKeys = ["initial value"] as string[];
    const confirm = vi.fn();
    const clearFilters = vi.fn();

    const { getByTestId } = render(
      <TableFilterTextComponent
        prefixCls=""
        close={vi.fn()}
        visible={true}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    );

    const inputElement = getByTestId("table-filter-text") as HTMLInputElement;

    waitFor(() => {
      expect(inputElement).toBeInTheDocument();
      expect(inputElement.value).toBe("initial value");
    });
  });

  it("should update selectedKeys on input change", () => {
    const setSelectedKeys = vi.fn();
    const selectedKeys = [] as string[];
    const confirm = vi.fn();
    const clearFilters = vi.fn();

    const { getByTestId } = render(
      <TableFilterTextComponent
        prefixCls=""
        close={vi.fn()}
        visible={true}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    );

    const inputElement = getByTestId("table-filter-text");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    waitFor(() => {
      expect(setSelectedKeys).toHaveBeenCalledWith(["new value"]);
    });
  });

  it("should call confirm on Enter key press", () => {
    const setSelectedKeys = vi.fn();
    const selectedKeys = [] as string[];
    const confirm = vi.fn();
    const clearFilters = vi.fn();

    const { getByTestId } = render(
      <TableFilterTextComponent
        prefixCls=""
        close={vi.fn()}
        visible={true}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    );

    const inputElement = getByTestId("table-filter-text");
    fireEvent.keyPress(inputElement, { key: "Enter" });

    waitFor(() => {
      expect(confirm).toHaveBeenCalled();
    });
  });

  it("should call confirm and clearFilters on reset button click", () => {
    const setSelectedKeys = vi.fn();
    const selectedKeys = [] as string[];
    const confirm = vi.fn();
    const clearFilters = vi.fn();

    const { getByText } = render(
      <TableFilterTextComponent
        prefixCls=""
        close={vi.fn()}
        visible={true}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    );

    const resetButton = getByText("reset");
    fireEvent.click(resetButton);

    expect(clearFilters).toHaveBeenCalled();
    expect(confirm).toHaveBeenCalled();
  });

  it("should call confirm on Ok button click", () => {
    const setSelectedKeys = vi.fn();
    const selectedKeys = [] as string[];
    const confirm = vi.fn();
    const clearFilters = vi.fn();

    const { getByTestId } = render(
      <TableFilterTextComponent
        prefixCls=""
        close={vi.fn()}
        visible={true}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    );

    const okButton = getByTestId("table-filter-ok");
    fireEvent.click(okButton);

    expect(confirm).toHaveBeenCalled();
  });
});
