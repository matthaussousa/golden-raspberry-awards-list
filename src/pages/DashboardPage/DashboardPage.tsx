import { Card } from "antd";
import MoviesWinnersByYear from "../../components/MoviesWinnersByYear/MoviesWinnersByYear";
import ProducersWinsComponent from "../../components/ProducersWinsComponent/ProducersWinsComponent";
import TopStudioWinnersComponent from "../../components/TopStudioWinnersComponent/TopStudioWinnersComponent";
import YearsWithMultipleWinnersList from "../../components/YearsWithMultipleWinnersComponent/YearsWithMultipleWinnersComponent";

export default function DashboardPage() {
  return (
    <div className="h-fit p-4 w-full max-w-[1920px] grid  grid-cols-1 xl:grid-cols-2  gap-4">
      <Card>
        <YearsWithMultipleWinnersList />
      </Card>
      <Card>
        <TopStudioWinnersComponent />
      </Card>
      <Card>
        <ProducersWinsComponent />
      </Card>
      <Card>
        <MoviesWinnersByYear />
      </Card>
    </div>
  );
}
