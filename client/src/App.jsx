import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ListingDetails from "./pages/ListingDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/admin"
  element={
    localStorage.getItem("admin")
      ? <Admin />
      : <Login />
  }
/>

<Route
  path="/listing/:id"
  element={<ListingDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;