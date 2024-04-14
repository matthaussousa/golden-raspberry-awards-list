import { useQuery } from "@tanstack/react-query";
import { Table, TableProps, Typography } from "antd";
import { getProducersWins } from "../../providers/moviesProvider";
import { ProducerWinType } from "../../types/movieTypes";

const columns: TableProps<ProducerWinType>["columns"] = [
  {
    title: "Producer",
    dataIndex: "producer",
    key: "producer",
  },
  {
    title: "Interval",
    dataIndex: "interval",
    key: "interval",
  },
  {
    title: "Previous Year",
    dataIndex: "previousWin",
    key: "previousWin",
  },
  {
    title: "Following Year",
    dataIndex: "followingWin",
    key: "followingWin",
  },
];

/**
 * Renders the ProducersWinsComponent.
 * This component displays a list of years with multiple winners for producers.
 */
export default function ProducersWinsComponent() {
  const producersWins = useQuery({
    retry: false,
    queryKey: ["producersWins"],
    queryFn: async () => {
      const response = await getProducersWins();
      return response.data;
    },
  });

  return (
    <>
      <Typography.Title level={4}>
        List years with multiple winners
      </Typography.Title>

      <Typography.Title level={5}>Maximum</Typography.Title>

      <Table
        data-testid="producers-wins-max-list"
        columns={columns}
        loading={producersWins.isFetching}
        dataSource={producersWins.data?.max || []}
        pagination={false}
        rowKey="producer"
      />

      <Typography.Title level={5} className="mt-2">
        Minimum
      </Typography.Title>

      <Table
        data-testid="producers-wins-min-list"
        columns={columns}
        loading={producersWins.isFetching}
        dataSource={producersWins.data?.min || []}
        pagination={false}
        rowKey="producer"
      />
    </>
  );
}
