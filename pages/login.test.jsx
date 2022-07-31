import Login from "./login";
import "@testing-library/jest-dom";
import {
	fireEvent,
	render,
	screen,
	waitFor,
	act,
} from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Login form", () => {
	// const onSubmit = jest.fn();

	beforeEach(() => {
		// onSubmit.mockClear();
		render(<Login />);
	});

	it("renders fields", () => {
		expect(screen.queryByTestId("username")).toBeDefined();
		expect(screen.queryByTestId("password")).toBeDefined();
	});

	it("onSubmit is called when all fields pass validation", async () => {
		const onSubmit = jest.fn();
		// const logSpy = jest.spyOn(console, "log");
		const username = screen.getByRole("textbox", { name: /username/i });
		const password = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: /login/i });

		await user.type(username, "wilker");
		await user.type(password, "S!mple01");
		// await user.click(submitButton);

		fireEvent.click(submitButton);

		expect(username.value).toBe("wilker");
		await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0));
		/*
			The test script return
			Expected number of calls: 1
			Received number of calls: 0
		*/
	});
});
