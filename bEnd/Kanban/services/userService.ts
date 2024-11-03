import { hash } from "bcrypt";

import { createModel } from "../orm/orm.ts";
import { BadRequest } from "../errors/httpErrors.ts";
import { User, userColumns } from "../types/userTypes.ts";
import { DBInsertFailed } from "../errors/databaseErrors.ts";
import { generateTokens, saveToken } from "./tokenService.ts";

export async function register(user: User): Promise<{
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    user: User;
}> {
    const UserModel = createModel<User>("users", userColumns);

    const candidate = await UserModel.findOne({ email: user.email });
    if (candidate) {
        throw BadRequest(
            `The user with the email: ${user.email} already exists`
        );
    }

    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;

    const lastInsertedRowId = await UserModel.insert(user);
    if (!lastInsertedRowId)
        throw DBInsertFailed(
            `Could not perform Insert operation using: ${JSON.stringify(user)}`
        );
    /** If we reach this, the previous insert has succeded. We can guarantee lastInsertedRowId exists */
    const insertedUser = await UserModel.findOne({ id: lastInsertedRowId });
    const tokens = await generateTokens(insertedUser!);
    const { refreshToken } = tokens;
    await saveToken({ userId: insertedUser!.id!, refreshToken });
    return {
        tokens,
        user: insertedUser!,
    };
}
