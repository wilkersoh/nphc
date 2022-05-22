import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [credentials, setCredentials] = useState({});

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await axios.post("/api/auth/login", credentials);

			if (!user) throw new Error("Please try again.");

			// successful login
			router.push("/");
		} catch (error) {
			const { data } = error.response;
			toast(data.message);
		}
	};

	return (
		<Layout>
			<Toaster />
			<div className="flex mt-40 justify-center">
				<form onSubmit={handleSubmit} className="w-48 md:w-[400px]">
					<div className="flex flex-col">
						<label htmlFor="username">Username</label>
						<input
							onChange={handleOnChange}
							type="text"
							value={credentials.username || ""}
							name="username"
							id="username"
							className="text-black pl-2"
						/>
					</div>
					<div className="flex flex-col mt-2">
						<label htmlFor="password">Password</label>
						<input
							onChange={handleOnChange}
							type="password"
							value={credentials.password || ""}
							name="password"
							id="password"
							className="text-black pl-2"
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
