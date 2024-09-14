import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Navbar from "./component/Navbar.tsx";
import Dashboard from "./pages/internal/dashboard/Dashboard.tsx";
import Ticketing from "./pages/internal/ticketing/Ticketing.tsx";
import ClientManagement from "./pages/internal/clientManagement/ClientManagement.tsx";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ims/dashboard" element={<Dashboard />} />
        <Route path="/ims/ticketing" element={<Ticketing />} />
        <Route path="/ims/client-management" element={<ClientManagement />} />
      </Routes>
    </>
  );
}

export default App;
