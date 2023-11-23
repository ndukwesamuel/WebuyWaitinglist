import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  if (data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;

    if (data?.isAdmin === false) {
      return <Navigate to="/facilitator" />;
    } else {
      return <Navigate to="/admin" />;
    }
  }

  return children;
};

export const PrivateRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  console.log({ data });

  if (!data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminPrivateRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  if (!data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;
    return <Navigate to="/" />;
  }

  if (data?.isAdmin === false) {
    return <Navigate to="/facilitator" />;
  }

  return children;
};

export const UserPrivateRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  if (!data?.token) {
    return <Navigate to="/" />;
  }

  if (data?.isAdmin === true) {
    return <Navigate to="/admin" />;
  }

  return children;
};
