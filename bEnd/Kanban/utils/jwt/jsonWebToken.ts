/**
 * This is a custom implementation of json web tokens.
 * It's for an exercise reason.
 */

import { encodeBase64, decodeBase64 } from "@std/encoding";

// Encode a string into binary data and vice-versa
const textEnc = (data: string): Uint8Array => new TextEncoder().encode(data);
const textDec = (data: Uint8Array): string => new TextDecoder().decode(data);

export const generateKey = async (key: string): Promise<CryptoKey> => {
    return await crypto.subtle.importKey(
        "raw",
        textEnc(key),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );
};

export const getJWT = async <T>(key: CryptoKey, data: T): Promise<string> => {
    const payload =
        encodeBase64(textEnc(JSON.stringify({ alg: "HS256", typ: "JWT" }))) +
        "." +
        encodeBase64(textEnc(JSON.stringify(data)));
    const signature = encodeBase64(
        new Uint8Array(
            await crypto.subtle.sign({ name: "HMAC" }, key, textEnc(payload))
        )
    );
    return `${payload}.${signature}`;
};

export const verifyJWT = async (
    key: CryptoKey,
    jwt: string
): Promise<string> => {
    const jwtParts = jwt.split(".");
    if (jwtParts.length !== 3) {
        throw new Error("Invalid format of the JWT Token");
    }

    const [header, payload, signature] = jwtParts;
    const data = textEnc(`${header}.${payload}`);

    // Verify signature
    const isValid = await crypto.subtle.verify(
        { name: "HMAC" },
        key,
        decodeBase64(signature),
        data
    );

    if (!isValid) {
        throw new Error("Token in invalid or has been altered");
    }

    // Decode payload and check expiration
    const payloadData = JSON.parse(textDec(decodeBase64(payload)));

    if (payloadData.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (payloadData.exp < currentTime) {
            console.log("Token expired");
            throw new Error("Token has expired");
        }
    }

    return payloadData;
};
