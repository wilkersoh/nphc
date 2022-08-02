import Prompt from "./Prompt";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Prompt portal", () => {
	const root = document.createElement("div");
	root.setAttribute("id", "modal-root");

	beforeEach(() => {
		document.body.appendChild(root);
	});

	afterEach(cleanup);

	it("Prompt show and close button", async () => {
		const onClose = jest.fn();

		render(
			<Prompt show={true} onClose={onClose}>
				<div>test</div>
			</Prompt>
		);
		// expect(container.find(".promptBackground")).toHaveLength(1);

		const closeIcon = screen.getByTestId("onClose");

		expect(screen.getByText("test")).toBeTruthy();

		await user.click(closeIcon);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("when `show` is false return null", () => {
		render(<Prompt show={false} />);

		expect(root.firstElementChild).toBeNull();
	});
});
