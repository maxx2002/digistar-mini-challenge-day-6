import SearchField from "./ui/SearchField";

function Navbar() {
  return (
    <nav className="flex items-center w-full gap-12 px-8 py-4">
      <div className="flex items-center min-w-48">
        <img src="/images/logo.png" alt="Logo" className="size-16" />{" "}
        <span className="text-2xl font-semibold">Digi Wallet</span>
      </div>
      <SearchField />
      <div className="flex items-center gap-12 font-medium text-darkgray">
        <p>Overview</p>
        <p className="text-black">Finance</p>
        <p>Calendar</p>
        <p>Events</p>
      </div>
    </nav>
  );
}

export default Navbar;
