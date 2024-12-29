import { User } from "../types/userTypes.ts";

export const userDto = (user: User): Partial<User> => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
	role: user.role,
});
