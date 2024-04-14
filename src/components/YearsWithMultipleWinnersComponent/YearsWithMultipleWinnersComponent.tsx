import { useQuery } from "@tanstack/react-query";
import { getYearsWithMultipleWinners } from "../../providers/moviesProvider";
import { Table, TableProps, Typography } from "antd";
import { YearWinnerType } from "../../types/movieTypes";

const columns: TableProps<YearWinnerType>["columns"] = [
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Win Count",
    dataIndex: "winnerCount",
    key: "winners",
  },
];

/**
 * Component that displays a list of years with multiple winners.
 */
export default function YearsWithMultipleWinnersComponent() {
  const yearsWithMultipleWinners = useQuery({
    retry: false,
    queryKey: ["yearsWithMultipleWinners"],
    queryFn: async () => {
      const response = await getYearsWithMultipleWinners();
      return response.data?.years;
    },
  });

  return (
    <>
      <Typography.Title level={4}>
        List years with multiple winners
      </Typography.Title>

      <Table
        data-testid="years-multiple-winners-list"
        columns={columns}
        loading={yearsWithMultipleWinners.isFetching}
        dataSource={yearsWithMultipleWinners.data || []}
        pagination={false}
        rowKey="year"
      />
    </>
  );
}
