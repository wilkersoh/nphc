import Badge from "./Badge";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Badge Component", () => {
	it("when `true` is green ", () => {
		const { container } = render(<Badge isTrue={true} />);
		expect(container.querySelector("span")).toHaveClass("bg-green-600");
	});

	it("when `false` is red ", () => {
		const { container } = render(<Badge isTrue={false} />);
		expect(container.querySelector("span")).toHaveClass("bg-red-600");
	});
});
