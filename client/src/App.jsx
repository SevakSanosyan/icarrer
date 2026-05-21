
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ListingDetails from "./pages/ListingDetails";
import MyListings from "./pages/MyListings";

import ProtectedRoute
from "./components/ProtectedRoute";

import ProtectedAdminRoute
from "./components/ProtectedAdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/admin"
          element={

            <ProtectedAdminRoute>

              <Admin />

            </ProtectedAdminRoute>

          }
        />

        <Route
          path="/listing/:id"
          element={<ListingDetails />}
        />

        <Route
          path="/my-listings"
          element={

            <ProtectedRoute>

              <MyListings />

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

