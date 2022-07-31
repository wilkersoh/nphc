import Header from "./Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
	it("Title", () => {
		render(<Header />);

		expect(screen.getByText(/Salary System/i)).toBeInTheDocument();
	});
});
