import {
    create,
    verify,
    getNumericDate,
    type Payload,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import type { User } from "../../orm/interfaces/user.ts";

export async function createJWT(
    user: User,
    key: CryptoKey,
    exp: number
): Promise<string> {
    const jwt = await create(
        { alg: "HS512", typ: "JWT" },
        {
            id: user.id,
            email: user.email,
            activated: user.isActivated,
            exp: getNumericDate(60 * exp),
        },
        key
    );
    return jwt;
}

export async function verifyJWT(jwt: string, key: CryptoKey): Promise<Payload> {
    return await verify(jwt, key);
}
