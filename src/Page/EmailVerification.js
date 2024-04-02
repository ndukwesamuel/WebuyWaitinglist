import { useEffect } from 'react';

import axios from 'axios';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

const EmailVerification = ({ axiosInstance, toast }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sendReferralEmail = async (userId, referralCode) => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;
        await axiosInstance.post(`${API_URL}/send-referral-email`, {
          userId,
          referralCode,
        });
      } catch (error) {
        console.error("Error sending referral email:", error);
        toast.error("Failed to send referral email.");
      }
    };

    const verifyEmail = async (userId, uniqueString) => {
      try {
        if (userId && uniqueString) {
          const API_URL = process.env.REACT_APP_API_URL; // Assuming REACT_APP_API_URL is defined
          const response = await axiosInstance.post(
            `${API_URL}/user/verify-email`,
            {
              userId,
              uniqueString,
            }
          );

          if (response.data.error) {
            toast.error(response.data.message);
          } else {
            const referralCode = searchParams.get("ref");
            if (referralCode) {
              await sendReferralEmail(userId, referralCode);
            }
            toast.success(response.data.message);
          }
        } else {
          toast.error("Invalid verification parameters.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while verifying email.");
      } finally {
        navigate("/login");
      }
    };

    const userId = searchParams.get("userId");
    const uniqueString = searchParams.get("uniqueString");

    verifyEmail(userId, uniqueString);
  }, [axiosInstance, navigate, searchParams, toast]);

  return null;
};

EmailVerification.defaultProps = {
  axiosInstance: axios,
  toast: toast,
};

export default EmailVerification;
