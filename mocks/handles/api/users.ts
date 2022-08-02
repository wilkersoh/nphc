import { rest } from "msw";

type LoginCredentials = {
	username: string;
	password: string;
};

export const userHandlers = [
	rest.post("/api/users", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];
