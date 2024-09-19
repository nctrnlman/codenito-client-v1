import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/internal/dashboard/Dashboard.tsx";
import Ticketing from "./pages/internal/ticketing/Ticketing.tsx";
import ClientManagement from "./pages/internal/clientManagement/ClientManagement.tsx";
import Calendar from "./pages/internal/calendar/Calendar.tsx";
import LoginPage from "./pages/internal/auth/LoginPage.tsx";
import StickyNotes from "./pages/internal/notes/StickyNotes.tsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ims/login" element={<LoginPage />} />
        <Route
          path="/ims/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/ims/ticketing"
          element={<ProtectedRoute element={<Ticketing />} />}
        />
        <Route
          path="/ims/client-management"
          element={<ProtectedRoute element={<ClientManagement />} />}
        />
        <Route
          path="/ims/calendar"
          element={<ProtectedRoute element={<Calendar />} />}
        />
        <Route
          path="/ims/sticky-notes"
          element={<ProtectedRoute element={<StickyNotes />} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;