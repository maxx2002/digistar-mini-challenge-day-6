import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const getLinkClassName = (path: string) =>
    `cursor-pointer ${
      location.pathname === path ? "text-black" : "text-darkgray"
    }`;

  return (
    <nav className="flex items-center justify-between w-full gap-12 px-8 py-4">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="size-16" />{" "}
        <span className="text-2xl font-semibold">Digi Wallet</span>
      </div>
      <div className="flex items-center gap-12 font-medium">
        <Link to="/overview" className={getLinkClassName("/overview")}>
          Overview
        </Link>
        <Link to="/" className={getLinkClassName("/")}>
          Finance
        </Link>
        <Link to="/calendar" className={getLinkClassName("/calendar")}>
          Calendar
        </Link>
        <Link to="/events" className={getLinkClassName("/events")}>
          Events
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
