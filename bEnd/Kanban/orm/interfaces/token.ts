export interface Token {
    [key: string]: unknown; // This is WEIRD, to read about it
    id?: number;
    userId: number; // a reference to the User id
    refreshToken: string;
}

export interface TokenJWTPayload {
    exp: number;
    userId: number;
    email: string;
    isActivated: boolean;
}
