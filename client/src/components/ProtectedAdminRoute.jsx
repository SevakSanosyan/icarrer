
import {
  Navigate,
} from "react-router-dom";

import useAuthStore
from "../store/AuthStore";

function ProtectedAdminRoute({

  children,

}) {

  const { user } =
  useAuthStore();

  if (
    !user ||
    user.role !== "admin"
  ) {

    return (
      <Navigate to="/" />
    );
  }

  return children;
}

export default ProtectedAdminRoute;

