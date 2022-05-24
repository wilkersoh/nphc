import bcrypt from "bcrypt";
import mongoseDbConnect from "utils/databaseConnect";
import User from "models/User";

mongoseDbConnect();

export default async function getAllUsers(req, res) {
	const { method, query } = req;

	switch (method) {
		case "GET":
			try {
				const { sortBys, limit, page, startSalary, endSalary } = query;
				let users,
					count,
					filterSalary = {};

				// &sortBys=createdAt&sortBys=desc&page=1&limit=10&startSalary=1000&endSalary=2000
				if (startSalary && endSalary) {
					filterSalary = {
						salary: {
							$gte: startSalary,
							$lt: +endSalary + 0.000001,
						},
					};
					await User.find({}).where(filterSalary).count();
				}

				if (!sortBys && !limit && !page) {
					// testing purpose
					users = await User.find({});
				} else if (filterSalary.salary && sortBys) {
					let sortByStep1 = sortBys.replace("sortBys=", "");
					let sortByStep2 = sortByStep1.replace("sortBys=", "");
					const [key, value] = sortByStep2.split("&");

					users = await User.find({})
						.where(filterSalary)
						.sort({ [key]: value })
						.limit(limit * 1)
						.skip((page - 1) * limit)
						.exec();

					return res.json({
						success: true,
						users,
						totalPage: Math.ceil(count / limit),
						currentPage: page,
					});
				} else if (filterSalary.salary) {
					users = await User.find({})
						.where(filterSalary)
						.limit(limit * 1)
						.skip((page - 1) * limit)
						.exec();

					return res.json({
						success: true,
						users,
						totalPage: Math.ceil(count / limit),
						currentPage: page,
					});
				} else if (sortBys) {
					let sortByStep1 = sortBys.replace("sortBys=", "");
					let sortByStep2 = sortByStep1.replace("sortBys=", "");
					const [key, value] = sortByStep2.split("&");

					users = await User.find({})
						.sort({ [key]: value })
						.limit(limit * 1)
						.skip((page - 1) * limit)
						.exec();
				} else {
					users = await User.find({})
						.limit(limit * 1)
						.skip((page - 1) * limit)
						.exec();
				}

				const usersCount = await User.countDocuments();

				res.json({
					success: true,
					users,
					totalPage: Math.ceil(usersCount / limit),
					currentPage: page,
				});
			} catch (error) {
				res
					.status(400)
					.json({ success: false, message: "Something went wrong." });
			}
			break;
		case "POST":
			let errors = {};
			try {
				const uniqueUserId = Date.now() + Math.floor(Math.random() * 100);

				const duplicatedUniqueId = await User.findOne({
					userId: uniqueUserId,
				}).exec();
				if (duplicatedUniqueId)
					return res
						.status(400)
						.json({
							success: false,
							message: "Someting went wrong. Please create again.",
							errros: "Please try again.",
						});

				const hasUser = await User.findOne({ login: req.body.login }).exec();
				if (hasUser)
					return res
						.status(400)
						.json({
							success: false,
							message: "Please try other.",
							errors: { login: "Value already been used." },
						});

				if (!req.body.hasOwnProperty("name") || !req.body.name.length)
					errors["name"] = "Name is Required";
				if (!req.body.hasOwnProperty("name") || !req.body.salary)
					errors["salary"] = "Salary is Required";
				if (!req.body.hasOwnProperty("login") || !req.body.login)
					errors["login"] = "Login is Required";

				if (Object.keys(errors).length) throw new Error();

				// const hashedPassword = await new Promise((resolve, reject) => {
				// 	bcrypt.genSalt( 10, (err, salt) => {
				// 		bcrypt.hash( req.body.login, salt, (err, hash) => {
				// 			if( err ) reject( err );
				// 			resolve( hash )
				// 		})
				// 	})
				// })

				// const user = await User.create({ ...req.body, login: hashedPassword, userId: uniqueUserId });
				const user = await User.create({ ...req.body, userId: uniqueUserId });
				res
					.status(201)
					.json({ success: true, user, message: "Successful created user." });
			} catch (error) {
				res
					.status(400)
					.json({
						success: false,
						message: `Failed to create user. Try again.`,
						errors,
					});
			}
			break;
		default:
			res
				.status(400)
				.json({ success: false, message: "Something went wrong." });
			break;
	}
}
