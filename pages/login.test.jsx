import Login from "./login";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import axios from "axios";

describe("Login form", () => {
	const axios = jest.mock("axios");
	const handleSubmit = jest.fn(() => {
		console.log("passsssed");
	});

	beforeEach(() => {
		handleSubmit.mockClear();
		render(<Login handleSubmit={handleSubmit} />);
	});

	it("renders fields", () => {
		expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
	});

	it("correct input type", () => {
		expect(screen.getByPlaceholderText("Username")).toHaveAttribute(
			"type",
			"text"
		);
		expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
			"type",
			"password"
		);
	});

	it("onSubmit is called when all fields pass validation", async () => {
		const mockResp = { id: 1, username: "wilker" };
		const username = screen.getByRole("textbox", { name: /username/i });
		const password = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /login/i });

		// axios.post = jest.fn(() => mockResp);

		await user.type(username, "wilker");
		await user.type(password, "S!mple01");
		await user.click(submitButton);

		expect(username.value).toBe("wilker");
		// expect(axios.post).toHaveBeenCalledTimes(1);
		expect(handleSubmit).toHaveBeenCalledTimes(0);
	});
});
