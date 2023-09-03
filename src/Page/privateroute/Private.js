import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AutenticationSlice
  );

  console.log(data);

  console.log("Private");

  if (data?.token) {
    // not logged in so redirect to login page with the return url
    // return <Navigate to="/" state={{ from: history.location }} />;

    console.log("this is workking ");

    return <Navigate to="/admin" />;
  }

  return children;
};
