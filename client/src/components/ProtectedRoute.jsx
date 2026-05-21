import {
    Navigate,
  } from "react-router-dom";
  
  import useAuthStore
  from "../store/AuthStore";
  
  function ProtectedRoute({
  
    children,
  
  }) {
  
    const { token } =
    useAuthStore();
  
    if (!token) {
  
      return (
  
        <Navigate
          to="/"
        />
  
      );
    }
  
    return children;
  }
  
  export default ProtectedRoute;