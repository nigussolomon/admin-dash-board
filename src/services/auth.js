import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token !== null && token !== undefined) {
    return true;
  } else {
    return false;
  }
}

const Protected = ({ children }) => {
  if (isAuthenticated() === false) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
