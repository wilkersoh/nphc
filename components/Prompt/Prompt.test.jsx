import Prompt from "./Prompt";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Prompt portal", () => {
	it("when `show` is true show component", () => {
		const show = jest.fn();
		const onClose = jest.fn();

		// const { container } = render(<Prompt show={true} onClose={onClose} />);
		// expect(container.find(".promptBackground")).toHaveLength(1);
	});
});
