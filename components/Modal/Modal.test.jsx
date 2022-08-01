import Modal from "./Modal";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Modal portal", () => {
	const root = document.createElement("div");
	root.setAttribute("id", "modal-root");

	beforeEach(() => {
		document.body.appendChild(root);
	});

	afterEach(cleanup);

	it("modal show and close button", async () => {
		const onClose = jest.fn();

		render(
			<Modal show={true} onClose={onClose}>
				<div>test</div>
			</Modal>
		);

		const closeIcon = screen.getByTestId("onClose");

		expect(screen.getByText("test")).toBeTruthy();

		await user.click(closeIcon);

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
