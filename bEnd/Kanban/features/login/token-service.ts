import { createJWT, verifyJWT } from "../../utils/jwt/jsonWebToken.ts";
import { Token, tokenColumns } from "../../orm/interfaces/token.ts";
import { config } from "../../config.ts";
import { createModel } from "../../orm/orm.ts";

import type { User } from "../../orm/interfaces/user.ts";

export async function generateTokens(
    user: User
): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenSecret = config.accessTokenKey;
    const refreshTokenSecret = config.refreshTokenKey;

    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("Missing token secret. Aborting token generation");
    }

    // const accessTokenKey = await generateKey(accessTokenSecret);
    // const refreshTokenKey = await generateKey(refreshTokenSecret);

    const accessToken = await createJWT(
        user,
        accessTokenSecret,
        config.accessTokenExpiration
    );
    const refreshToken = await createJWT(
        user,
        refreshTokenSecret,
        config.refreshTokenExpiration
    );

    return { accessToken, refreshToken };
}

export async function saveToken(
    userId: number,
    refreshToken: string
): Promise<void> {
    const TokenModel = createModel<Token>("tokens", tokenColumns);
    try {
        const tokenData = await TokenModel.findOne({ userId: userId });
        if (tokenData) {
            /**
             * If there is a token, we overwrite the refresh token
             * which should be updated on every login.
             */
            await TokenModel.update(
                { userId: userId },
                { refreshToken: refreshToken }
            );
        }
        /**
         * If no token was found in the database, it's likely that the user
         * logs in for the first time, so we save it in the DB.
         */
        await TokenModel.insert({ userId: userId, refreshToken: refreshToken });
    } catch (e) {
        // Rethrowing to catch in a different part
        console.log(e);
        throw e;
        // For dev purposes. To be handled later.
    }
}
