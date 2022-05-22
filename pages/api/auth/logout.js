import { serialize } from "cookie";

const JWT_NAME = process.env.JWT_TOKEN_NAME;

export default async function (req, res) {
	const { cookies } = req;
	const jwt = cookies.appToken;

	if (!jwt) return res.status(200).json({ message: "Already logout" });

	const serialised = serialize(JWT_NAME, null, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		path: "/",
		maxAge: -1,
	});

	res.setHeader("Set-Cookie", serialised);
	res.status(200).json({ message: "Successful Logout" });
}
