import * as jose from 'jose';
import { serialize } from "cookie";
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

const JWT_SECRET = process.env.JWT_TOKEN;
const JWT_NAME = process.env.JWT_TOKEN_NAME;
const JWT_ISSUER = process.env.JWT_TOKEN_ISSUER;

mongoseDbConnect();

export default async function Login(req, res) {
	const { username, password } = req.body;
	let user;

	user = await User.find({ name: username, login: password }).exec();

	if (!user.length)
		return res.status(401).json({ message: "Invalid Credentials" });

	const token = await new jose.SignJWT({ userId: user._id })
	.setProtectedHeader({ alg: 'HS256' })
	.setIssuedAt()
	.setIssuer( JWT_ISSUER )
  .setAudience( user.name )
	.setExpirationTime('1w')
	.sign(new TextEncoder().encode( JWT_SECRET ));

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
