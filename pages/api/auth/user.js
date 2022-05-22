export default async function (req, res) {
	const { cookies } = req;

	const jwt = cookies.appToken;

	console.log("jwt :>> ", jwt);
	return res.status(200).json({ message: "ok" });
}
