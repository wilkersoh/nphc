import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

const JWT_SECRET = process.env.JWT_TOKEN;
const JWT_NAME = process.env.JWT_TOKEN_NAME;

mongoseDbConnect();

export default async function Login(req, res) {
	const { username, password } = req.body;
	let user;

	user = await User.find({ name: username, login: password }).exec();

	if (!user.length)
		return res.status(401).json({ message: "Invalid Credentials" });

	const token = sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1Week
			_id: user._id,
			username: user.name,
		},
		JWT_SECRET
	);

	const serialised = serialize(JWT_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 1Week
	});

	res.setHeader("Set-Cookie", serialised);
	return res.status(200).json({ message: "Successful login" });
}
