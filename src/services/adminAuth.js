import { Navigate } from "react-router-dom";

function isAdmin() {
  const token = localStorage.getItem("isAdmin");
  if (token === "true") {
    return true;
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
