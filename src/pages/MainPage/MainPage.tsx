import { Outlet } from "react-router-dom";
import MainPageNav from "./MainPageNav";

export default function MainPage() {
  return (
    <div className="flex flex-col h-full">
      <section className="p-4 bg-gray-700 text-white">
        Golden Raspberry Awards
      </section>
      <section className="flex w-full h-full">
        <MainPageNav />

        <Outlet />
      </section>
    </div>
  );
}
