import { rest } from "msw";

export const userHandlers = [
	rest.post("/api/users", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];
