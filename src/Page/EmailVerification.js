import { useEffect } from "react";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async (userId, uniqueString) => {
      try {
        if (userId && uniqueString) {
          const API_URL = process.env.REACT_APP_API_URL;
          const response = await axios.post(`${API_URL}/user/verify-email`, {
            userId,
            uniqueString,
          });

          if (response.data.error) {
            toast.error(response.data.message);
          }
        } else {
          toast.error("Invalid verification parameters.");
        }
      } catch (error) {
        toast.error("An error occurred while verifying email.");
      } finally {
        navigate("/login");
      }
    };

    const userId = searchParams.get("userId");
    const uniqueString = searchParams.get("uniqueString");

    verifyEmail(userId, uniqueString);
  }, [navigate, searchParams]);

  return null;
};

export default EmailVerification;

// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const API_URL = "http://localhost:5000/api/"; // process.env.REACT_APP_Local;
// console.log({
//   API_URL: API_URL,
// });

// const EmailVerification = ({ axiosInstance, toast }) => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const sendReferralEmail = async (userId, referralCode) => {
//     try {
//       if (!API_URL) throw new Error("API URL not defined");
//       await axiosInstance.post(`${API_URL}send-referral-email`, {
//         userId,
//         referralCode,
//       });
//     } catch (error) {
//       console.error("Error sending referral email:", error);
//       toast.error("Failed to send referral email.");
//     }
//   };

//   const verifyEmail = async (userId, uniqueString) => {
//     try {
//       if (!userId || !uniqueString) {
//         throw new Error("Invalid verification parameters.");
//       }

//       if (!API_URL) throw new Error("API URL not defined");

//       const response = await axiosInstance.post(`${API_URL}user/verify-email`, {
//         userId,
//         uniqueString,
//       });

//       if (response.data.error) {
//         toast.error(response.data.message);
//       } else {
//         const referralCode = searchParams.get("ref");
//         if (referralCode) {
//           await sendReferralEmail(userId, referralCode);
//         }
//         toast.success(response.data.message);
//         navigate("/login"); // Redirect after successful verification
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           "An error occurred while verifying email."
//       );
//     }
//   };

//   useEffect(() => {
//     const userId = searchParams.get("userId");
//     const uniqueString = searchParams.get("uniqueString");
//     verifyEmail(userId, uniqueString);
//   }, [axiosInstance, navigate, searchParams, toast]);

//   return null;
// };

// EmailVerification.defaultProps = {
//   axiosInstance: axios,
//   toast: toast,
// };

// export default EmailVerification;
