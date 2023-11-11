import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("userId") && searchParams.has("uniqueString")) {
      const userId = searchParams.get("userId");
      const uniqueString = searchParams.get("uniqueString");

      const API_URL = process.env.REACT_APP_Local;

      const verifyEmail = async (userId, uniqueString) => {
        const form = new FormData();
        form.append("userId", userId);
        form.append("uniqueString", uniqueString);

        await axios
          .post(API_URL + "user/verify-email", form, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.error === true) {
              toast.error(response.data.message);
              navigate("/login");
            } else {
              toast.success(`${response.data.message}`);
              navigate("/login");
            }
          })
          .catch((error) => {
            // console.error(error);
            toast.error(error.message);
            navigate("/");
          });
      };
      verifyEmail(userId, uniqueString);
    }
  }, []);
  return <div></div>;
};

export default EmailVerification;
