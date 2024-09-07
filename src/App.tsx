import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Finance from "./pages/finance/Finance";
import Overview from "./pages/overview/Overview";
import Calendar from "./pages/calendar/Calendar";
import Events from "./pages/events/Events";
import { DataProvider } from "./contexts/DataContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <DataProvider>
      <Router>
        <main className="grid min-h-screen grid-cols-4">
          <section className="col-span-3 bg-gray">
            <Navbar />
            <Routes>
              <Route path="/" element={<Finance />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </section>
          <section className="col-span-1 bg-white shadow-md">
            <Sidebar />
          </section>
        </main>
      </Router>
    </DataProvider>
  );
}

export default App;
