import { Link, useLocation } from "react-router-dom";

export default function MainPageNav() {
  const location = useLocation();

  return (
    <>
      <nav className="w-40">
        <ul className="h-full flex flex-col bg-gray-100 p-4">
          <li
            className={location.pathname == "/dashboard" ? "text-blue-400" : ""}
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname == "/list" ? "text-blue-400" : ""}>
            <Link to="/list">List</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
