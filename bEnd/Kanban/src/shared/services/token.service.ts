import type { Payload } from "jwt";
import { config } from "../../https/utils/config.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import type { User } from "../../types/entities.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { createJWT, verifyJWT } from "../../https/utils/jsonWebToken.ts";
import { Token, type TokenType } from "../../types/entities.ts";

import {
  deleteTokenByItself,
  findTokenByItself,
  findTokenByUserId,
  insertToken,
  updateRefreshToken,
} from "../../database/db.ts";

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

export async function saveToken(token: Token): Promise<void> {
  const tokenData = await findTokenByUserId(token.userId);
  if (tokenData.length > 0) {
    /**
     * If there is a token, we overwrite the refresh token
     * which should be updated on every login.
     */
    const updatedToken = await updateRefreshToken(
      token.refreshToken,
      token.userId,
    );
    if (!updatedToken[0]) {
      throw ApiError.BadRequestError(
        `Token with userId: ${token.userId} doesn't exist`,
      );
    }
  } else {
    const result = await insertToken(token);
    const lastInsertedToken = result[0] ?? null;
    if (!lastInsertedToken) throw DatabaseError.ConflictError();
  }
}

export async function removeRefreshToken(token: string): Promise<string> {
  const result = await deleteTokenByItself(token);
  const tokenData = result[0] ?? null;
  if (!tokenData) throw ApiError.BadRequestError("Incorrect refresh token");
  return tokenData.refreshToken;
}

export async function validateToken(
  token: string,
  tokenType: TokenType,
): Promise<
  Payload & {
    id: number;
    email: string;
    fName: string;
    lName: string;
  }
> {
  const key = tokenType === "refresh"
    ? config.refreshTokenKey
    : config.accessTokenKey;
  const userData = await verifyJWT(token, key) as Payload & {
    id: number;
    email: string;
    fName: string;
    lName: string;
  };
  if (tokenType === "refresh") {
    const result = await findTokenByItself(token);
    const refreshToken = result[0] ?? null;
    if (!userData || !refreshToken) throw ApiError.UnauthorizedError();
  }
  return {
    id: userData.id,
    email: userData.email,
    fName: userData.fName,
    lName: userData.lName,
  };
}
