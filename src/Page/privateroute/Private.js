import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AutenticationSlice
  );

  if (data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;

    return <Navigate to="/admin" />;
  }

  return children;
};

export const PrivateRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AutenticationSlice
  );

  if (!data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;
    return <Navigate to="/" />;
  }

  return children;
};