import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ListingDetails from "./pages/ListingDetails";
import SingleListing from "./pages/SingleListing";

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

<Route
  path="/listing/:id"
  element={<SingleListing />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;