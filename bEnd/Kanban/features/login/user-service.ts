import { hash } from "bcrypt";

import { createModel } from "../../orm/orm.ts";
import { sendActivationMail } from "./mail-service.ts";
import { generateTokens, saveToken } from "./token-service.ts";
import { User, userColumns } from "../../orm/interfaces/user.ts";

export async function register(user: User): Promise<{
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    user: User;
}> {
    const UserModel = createModel<User>("users", userColumns);

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

        if (!insertedUser) {
            throw new Error(
                "Insert failed. Newly inserted user could not be found"
            );
        }
        const tokens = await generateTokens(insertedUser);
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
