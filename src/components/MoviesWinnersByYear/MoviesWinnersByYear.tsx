import { useQuery } from "@tanstack/react-query";
import { Button, Input, InputRef, Table, TableProps, Typography } from "antd";
import { useCallback, useRef, useState } from "react";
import { getMovies } from "../../providers/moviesProvider.";
import { MovieType } from "../../types/movieTypes";
import { SearchOutlined } from "@ant-design/icons";

const columns: TableProps<MovieType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
];

export default function MoviesWinnersByYear() {
  const [year, setYear] = useState<number>();
  const yearRef = useRef<InputRef>(null);

  const onSearch = useCallback(() => {
    if (yearRef.current?.input?.value) {
      setYear(Number(yearRef.current?.input?.value));
    }
  }, []);

  const topStudioWinners = useQuery({
    enabled: !!year,
    retry: false,
    queryKey: ["moviesWinnersByYear", year],
    queryFn: async () => {
      const response = await getMovies({
        year,
        winner: true,
      });

      return response.data;
    },
  });

  return (
    <>
      <Typography.Title level={4}>List movie winners by year</Typography.Title>

      <div className="flex gap-2 mb-2">
        <Input type="number" name="year" ref={yearRef} />
        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch} />
      </div>
      <Table
        columns={columns}
        loading={topStudioWinners.isFetching}
        dataSource={topStudioWinners.data || []}
        pagination={false}
        rowKey="id"
      />
    </>
  );
}
