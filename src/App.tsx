import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Home from "./pages/HomePage.tsx";
import Navbar from "./component/Navbar.tsx";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
