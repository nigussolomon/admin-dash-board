import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function isAdmin() {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const decodedToken = jwt_decode(token);
    if (decodedToken["role"] === "admin") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const AdminProtected = ({ children }) => {
  if (isAdmin() === false) {
    return <Navigate to="/form" replace />;
  }
  return children;
};
export default AdminProtected;
