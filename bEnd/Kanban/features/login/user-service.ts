import { hash } from "bcrypt";

import { User } from "../../orm/interfaces/user.ts";
import { sendActivationMail } from "./mail-service.ts";
import { generateTokens, saveToken } from "./token-service.ts";
import { createModel } from "../../orm/orm.ts";

export async function register(user: User): Promise<{
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    user: User;
}> {
    const UserModel = createModel<User>("users");

    try {
        const candidate = await UserModel.findOne({ email: user.email });
        if (candidate) {
            throw new Error(
                `A user with this email: ${user.email} already exists`
            );
        }

        const hashedPassword = await hash(user.password);
        user.password = hashedPassword;
        user.activationLink = crypto.randomUUID();

        const lastInsertedRowId = await UserModel.insert(user);
        await sendActivationMail();

        const insertedUser = await UserModel.findOne({ id: lastInsertedRowId });

        const tokens = await generateTokens(
            {
                exp: Math.floor(Date.now() / 1000) + 15 * 60,
                userId: insertedUser.id!,
                email: insertedUser.email,
                isActivated: insertedUser.isActivated,
            },
            {
                exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                userId: insertedUser.id!,
                email: insertedUser.email,
                isActivated: insertedUser.isActivated,
            }
        );
        const { refreshToken } = tokens;
        await saveToken(insertedUser.id!, refreshToken);
        return {
            tokens,
            user: insertedUser,
        };
    } catch (e) {
        // To handle in a different place
        console.log(e);
        throw e;
        // This is for dev purposes. To handle the error later.
    }
}
