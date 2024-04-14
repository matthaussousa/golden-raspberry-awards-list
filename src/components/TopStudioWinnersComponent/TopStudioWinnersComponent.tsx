import { useQuery } from "@tanstack/react-query";
import { Table, TableProps, Typography } from "antd";
import { getTopStudioWinners } from "../../providers/moviesProvider";
import { StudioWinnerType } from "../../types/movieTypes";

const columns: TableProps<StudioWinnerType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Win Count",
    dataIndex: "winCount",
    key: "winCount",
  },
];

/**
 * Renders a component that displays the top 3 studios with winners.
 * @returns JSX.Element
 */
export default function TopStudioWinnersComponent() {
  const topStudioWinners = useQuery({
    retry: false,
    queryKey: ["topStudioWinners"],
    queryFn: async () => {
      const response = await getTopStudioWinners();

      if (!Array.isArray(response.data?.studios)) {
        return [];
      }

      return response.data.studios.slice(0, 3);
    },
  });

  return (
    <>
      <Typography.Title level={4}>Top 3 Studios with winners</Typography.Title>

      <Table
        data-testid="studio-winners-list"
        columns={columns}
        loading={topStudioWinners.isFetching}
        dataSource={topStudioWinners.data || []}
        pagination={false}
        rowKey="name"
      />
    </>
  );
}
