import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  if (data?.data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;

    if (data?.data?.user?.isAdmin === false) {
      return <Navigate to="/" />;
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

  if (!data?.data?.token) {
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

  if (!data?.data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;
    return <Navigate to="/" />;
  }

  if (data?.data?.user?.isAdmin === false) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export const UserPrivateRoute = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  if (!data?.data?.token) {
    return <Navigate to="/" />;
  }

  if (data?.data?.user?.isAdmin === true) {
    return <Navigate to="/admin" />;
  }

  return children;
};
