import { rest } from "msw";

type LoginCredentials = {
	username: string;
	password: string;
};

export const loginHandlers = [
	rest.post<LoginCredentials>("/api/auth/login", (req, res, ctx) => {
		console.log(req.body);

		return res(ctx.status(200));
	}),
];
