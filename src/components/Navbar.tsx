function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full gap-12 px-8 py-4">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="size-16" />{" "}
        <span className="text-2xl font-semibold">Digi Wallet</span>
      </div>
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
