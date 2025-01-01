import { Context } from "@oak/oak/context";
import { ApiError } from "../../errors/apiErrors.ts";
import { validateToken } from "../../shared/services/token.service.ts";
import { Payload } from "jwt";

export const initialConnectionAuthHandlerWS = async (ctx: Context) => {
	const { request } = ctx;
	const accessToken = request.url.searchParams.get("token");
	if (!accessToken) {
		throw ApiError.UnauthorizedError();
	}
	const userData: Omit<Payload, "exp"> = await validateToken(
		accessToken,
		"access"
	);

	if (!ctx.isUpgradable) {
		throw ApiError.BadRequestError("Connection is not upgradeable");
	}

	const socket = ctx.upgrade();
	socket._token = accessToken;
	socket._user = userData;
	return socket;
};
