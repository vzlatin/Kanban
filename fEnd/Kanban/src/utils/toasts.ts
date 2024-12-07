import { Bounce, toast } from "react-toastify";

/**
 * ClassNames are defined globally in the index.css file.
 */

export const renderInfoToast = (content: string | React.ReactNode) => {
	toast(content, {
		className: "info-toast",
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
	toast(content, {
		className: "error-toast",
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		theme: "light",
		transition: Bounce,
	});
};
