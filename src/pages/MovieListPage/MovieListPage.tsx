import MoviesListComponent from "../../components/MoviesListComponent/MoviesListComponent";

/**
 * Renders the MovieListPage component.
 *
 * @returns The rendered MovieListPage component.
 */
export default function MovieListPage() {
  return (
    <div className="w-full max-w-[1440px] p-4">
      <MoviesListComponent />
    </div>
  );
}
