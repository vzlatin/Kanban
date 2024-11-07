import { createJWT } from "../utils/jsonWebToken.ts";
import { Token, tokenColumns } from "../types/tokenTypes.ts";
import { config } from "../utils/config.ts";
import { createModel } from "../orm/orm.ts";

import type { User } from "../types/userTypes.ts";
import { DatabaseErrors } from "../errors/databaseErrors.ts";

export async function generateTokens(
    user: User
): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenSecret = config.accessTokenKey;
    const refreshTokenSecret = config.refreshTokenKey;

    if (!accessTokenSecret)
        throw new Error("Property missing or undefined: accessTokenSecret");

    if (!refreshTokenSecret)
        throw new Error("Property missing or undefined: refreshTokenSecret");

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

export async function saveToken(token: Token): Promise<void> {
    const TokenModel = createModel<Token>("tokens", tokenColumns);
    const tokenData = await TokenModel.findOne({ userId: token.userId });
    if (tokenData) {
        /**
         * If there is a token, we overwrite the refresh token
         * which should be updated on every login.
         */
        await TokenModel.update(
            { userId: token.userId },
            { refreshToken: token.refreshToken }
        );
    }
    /**
     * If no token was found in the database, it's likely that the user
     * logs in for the first time, so we save it in the DB.
     */
    const lastInsertedId = await TokenModel.insert(token);
    if (!lastInsertedId) throw DatabaseErrors.ConflictError();
}
