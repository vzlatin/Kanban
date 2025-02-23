import {
	ApiError,
	BadRequestError,
	NetworkError,
	ServerError,
	UnauthorizedError,
} from "../../miscellaneous/utils/errors";

interface ErrorNotificationProps {
	error: ApiError | null;
}

// This will return a component which will be rendered by react-toastify.
const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error }) => {
	if (!error) return null;

	const renderDetails = () => {
		if (error instanceof UnauthorizedError || error instanceof NetworkError) {
			return <p>{error.message}</p>;
		}

		if (error instanceof ServerError) {
			return (
				<p>
					{error.message} (Status code: {error.status})
				</p>
			);
		}

		if (error instanceof BadRequestError) {
			return (
				<div>
					<p>{error.message}</p>
					{error.errors && (
						<ul>
							{error.errors.map((e, index) => {
								return <li key={index}>{JSON.stringify(e)}</li>;
							})}
						</ul>
					)}
				</div>
			);
		}

		return <p>{error.message}</p>;
	};

	return (
		<div>
			<h4>{error.name}</h4>
			{renderDetails()}
		</div>
	);
};

export default ErrorNotification;
