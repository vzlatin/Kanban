import { createJWT, verifyJWT } from "../../https/utils/jsonWebToken.ts";
import {
  Token,
  tokenColumns,
  type TokenType,
} from "../../https/types/tokenTypes.ts";
import { config } from "../../https/utils/config.ts";
import { createModel } from "../../storage/orm/orm.ts";

import type { User } from "../../https/types/userTypes.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import type { Payload } from "jwt";
import {
  aquireConnection,
  releaseConnection,
} from "../../storage/database/connectionPool.ts";

export async function generateTokens(
  user: User,
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessTokenSecret = config.accessTokenKey;
  const refreshTokenSecret = config.refreshTokenKey;

  if (!accessTokenSecret) {
    throw new Error("Property missing or undefined: accessTokenSecret");
  }

  if (!refreshTokenSecret) {
    throw new Error("Property missing or undefined: refreshTokenSecret");
  }

  const accessToken = await createJWT(
    user,
    accessTokenSecret,
    config.accessTokenExpiration,
  );
  const refreshToken = await createJWT(
    user,
    refreshTokenSecret,
    config.refreshTokenExpiration,
  );

  return { accessToken, refreshToken };
}

export function saveToken(token: Token): void {
  const TokenModel = createModel<Token>("tokens", tokenColumns);

  const tokenData = TokenModel.findOne(
    { userId: token.userId },
    "AND",
  );

  if (tokenData) {
    /**
     * If there is a token, we overwrite the refresh token
     * which should be updated on every login.
     */
    const updatedToken = TokenModel.update(
      { userId: token.userId },
      { refreshToken: token.refreshToken },
      "AND",
    );

    if (!updatedToken) {
      throw ApiError.BadRequestError(
        `Token with userId: ${token.userId} doesn't exist`,
      );
    }
  } else {
    const lastInsertedId = TokenModel.insert(token);

    if (!lastInsertedId) throw DatabaseError.ConflictError();
  }
}

export function removeToken(token: string): string {
  const TokenModel = createModel<Token>("tokens", tokenColumns);
  const tokenData = TokenModel.delete({ refreshToken: token });
  if (!tokenData) throw ApiError.BadRequestError("Incorrect refresh token");

  return tokenData.refreshToken;
}

export async function validateToken(
  token: string,
  tokenType: TokenType,
): Promise<Omit<Payload, "exp">> {
  const TokenModel = createModel<Token>("tokens", tokenColumns);
  const key = tokenType === "refresh"
    ? config.refreshTokenKey
    : config.accessTokenKey;
  const userData = await verifyJWT(token, key);

  if (tokenType === "refresh") {
    const refreshToken = TokenModel.findOne({ refreshToken: token });
    if (!userData || !refreshToken) throw ApiError.UnauthorizedError();
  }

  return {
    id: userData.id,
    email: userData.email,
    fName: userData.fName,
    lName: userData.lName,
  };
}
