import { rest } from "msw";

type LoginCredentials = {
	username: string;
	password: string;
};

export const loginHandlers = [
	rest.post<LoginCredentials>("/api/auth/login", (req, res, ctx) => {
		return res(ctx.json({ message: "success login", status: 200 }));
	}),
];
