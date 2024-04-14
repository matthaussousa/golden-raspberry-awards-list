import { Button, Input, Space } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";

/**
 * Represents a component for filtering a table based on a text input.
 * @param setSelectedKeys - A function to set the selected filter keys.
 * @param selectedKeys - An array of selected filter keys.
 * @param confirm - A function to confirm the filter selection.
 * @param clearFilters - A function to clear the filter selection.
 */
const TableFilterTextComponent = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: FilterDropdownProps) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Input
        data-testid="table-filter-text"
        value={selectedKeys[0]}
        type="number"
        onPressEnter={() => confirm()}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
      />
      <div>
        <Space>
          <Button
            size="small"
            onClick={() => {
              if (clearFilters) {
                clearFilters();
              }
              confirm();
            }}
            type="link"
          >
            reset
          </Button>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            data-testid="table-filter-ok"
          >
            Ok
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default TableFilterTextComponent;
