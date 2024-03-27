import { useEffect } from 'react';

import axios from 'axios';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async (userId, uniqueString) => {
      try {
        if (userId && uniqueString) {
          const API_URL = process.env.REACT_APP_Url;
          const form = new FormData();
          form.append("userId", userId);
          form.append("uniqueString", uniqueString);

          const response = await axios.post(
            API_URL + "user/verify-email",
            form,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.error === true) {
            toast.error(response.data.message);
          } else {
            // If email verification is successful, send another email with referral code
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

    // Extract userId and uniqueString from URL parameters
    const userId = searchParams.get("userId");
    const uniqueString = searchParams.get("uniqueString");

    // Call the verification function
    verifyEmail(userId, uniqueString);
  }, []);

  // Function to send referral email
  const sendReferralEmail = async (userId, referralCode) => {
    try {
      const API_URL = process.env.REACT_APP_Url;
      await axios.post(API_URL + "send-referral-email", {
        userId,
        referralCode,
      });
    } catch (error) {
      console.error("Error sending referral email:", error);
      toast.error("Failed to send referral email.");
    }
  };

  return null;
};

export default EmailVerification;
