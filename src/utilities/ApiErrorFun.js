import { toast } from "react-toastify";

// This function checks the type of error and returns a toast.
export const ErrorFunc = (message) => {
  console.log(message);
  let { response } = message;
  //   if (response.status === 403) {
  toast.error(`${response.data.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "Forbidden403",
  });
  //   }
};
