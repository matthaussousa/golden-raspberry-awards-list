import { useQuery } from "@tanstack/react-query";
import { Table, TablePaginationConfig, TableProps, Typography } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { useCallback, useReducer } from "react";
import { getMovies } from "../../providers/moviesProvider";
import { MovieFilterParams, MovieType } from "../../types/movieTypes";
import TableFilterTextComponent from "../TableFilterTextComponent/TableFilterTextComponent";

const winnerFilterOptions = [
  { text: <span data-testid="winner-yes">Yes</span>, value: true },
  { text: <span data-testid="winner-no">No</span>, value: false },
];

const columns: TableProps<MovieType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    align: "center",
    width: 150,
    filterDropdown: TableFilterTextComponent,
    onHeaderCell: () => {
      return {
        id: "yearColumn",
      };
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Winner?",
    key: "winner",
    align: "center",
    render: (_, record) => (record.winner ? "Yes" : "No"),
    width: 150,
    filters: winnerFilterOptions,
    filterMultiple: false,
    onHeaderCell: () => {
      return {
        id: "winnerColumn",
      };
    },
  },
];

const defaultParams: MovieFilterParams = {
  page: 1,
  size: 10,
  winner: undefined,
  year: undefined,
};

/**
 * Renders a component that displays a list of movies.
 */
export default function MoviesListComponent() {
  const [params, setParams] = useReducer(
    (oldState: MovieFilterParams, newState: MovieFilterParams) => ({
      ...oldState,
      ...newState,
    }),
    defaultParams
  );

  const moviesList = useQuery({
    retry: false,
    queryKey: ["moviesList", params],
    queryFn: async () => {
      const response = await getMovies(params);

      return response.data;
    },
  });

  /**
   * Handles the change in filters and updates the params accordingly.
   * @param pagination - The pagination configuration.
   * @param filters - The filter values.
   */
  const onChangeFilters = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>
    ) => {
      setParams({
        page: pagination.current || defaultParams.page,
        size: pagination.pageSize || defaultParams.size,
        winner: filters.winner ? (filters.winner[0] as boolean) : undefined,
        year: filters.year ? parseInt(filters.year[0] as string) : undefined,
      });
    },
    []
  );

  return (
    <>
      <Typography.Title level={4}>List movies</Typography.Title>

      <Table
        data-testid="movies-list"
        columns={columns}
        loading={moviesList.isFetching}
        dataSource={moviesList.data?.content || []}
        pagination={{
          pageSize: params.size,
          total:
            moviesList.data?.totalElements && moviesList.data?.totalElements > 0
              ? moviesList.data?.totalElements - params.size
              : 0,
          showTotal: (total) => total + " items",
          showSizeChanger: false,
        }}
        rowKey="id"
        onChange={onChangeFilters}
      />
    </>
  );
}
