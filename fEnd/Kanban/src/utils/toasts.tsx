import { Bounce, toast } from "react-toastify";

/**
 * ClassNames are defined globally in the index.css file.
 */

export const renderInfoToast = (content: string | React.ReactNode) => {
  toast.info(content, {
    icon: <img src="/info.svg" />,
    className: "info-toast",
    bodyClassName: "info-toast-body",
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: Bounce,
  });
};

export const renderErrorToast = (content: string | React.ReactNode) => {
  toast.error(content, {
    icon: <img src="error.svg" />,
    className: "error-toast",
    bodyClassName: "error-toast-body",
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: Bounce,
  });
};
