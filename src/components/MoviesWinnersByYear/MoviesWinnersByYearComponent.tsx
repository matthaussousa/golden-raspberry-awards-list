import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, InputRef, Table, TableProps, Typography } from "antd";
import { useCallback, useRef, useState } from "react";
import { getWinnersMoviesByYear } from "../../providers/moviesProvider";
import { MovieType } from "../../types/movieTypes";

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

/**
 * Renders a component that displays a list of movie winners by year.
 */
export default function MoviesWinnersByYear() {
  const [year, setYear] = useState<number>();
  const yearRef = useRef<InputRef>(null);

  /**
   * Handles the search action when the user presses enter or clicks the search button.
   */
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
      const response = await getWinnersMoviesByYear(year);

      return response.data;
    },
  });

  return (
    <>
      <Typography.Title level={4}>List movie winners by year</Typography.Title>

      <div className="flex gap-2 mb-2">
        <Input
          data-testid="year-input"
          type="number"
          name="year"
          ref={yearRef}
          onPressEnter={onSearch}
        />
        <Button
          data-testid="year-search"
          type="primary"
          icon={<SearchOutlined />}
          onClick={onSearch}
        />
      </div>
      <Table
        data-testid="movies-winners-by-year-list"
        columns={columns}
        loading={topStudioWinners.isFetching}
        dataSource={topStudioWinners.data || []}
        pagination={false}
        rowKey="id"
      />
    </>
  );
}
