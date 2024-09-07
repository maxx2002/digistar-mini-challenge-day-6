import "./App.css";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <DataProvider>
      <main className="grid min-h-screen grid-cols-4">
        <section className="col-span-3 bg-gray">
          <Navbar />
          <Content />
        </section>
        <section className="col-span-1 bg-white shadow-md">
          <Sidebar />
        </section>
      </main>
    </DataProvider>
  );
}

export default App;
