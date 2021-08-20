import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
	if (!options.email.includes("@")) {
		return [{ field: "email", message: "invalid email" }];
	}

	if (options.username.includes("@")) {
		return [{ field: "username", message: "invalid username" }];
	}

	if (options.username.length <= 2) {
		return [{ field: "username", message: "Username is too short" }];
	}

	if (options.password.length <= 3) {
		[{ field: "password", message: "Password is too short" }];
	}

	return null;
};
