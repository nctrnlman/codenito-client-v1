import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/internal/dashboard/Dashboard.tsx";
import Ticketing from "./pages/internal/ticketing/Ticketing.tsx";
import ClientManagement from "./pages/internal/clientManagement/ClientManagement.tsx";
import LoginPage from "./pages/internal/auth/LoginPage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/ims/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
