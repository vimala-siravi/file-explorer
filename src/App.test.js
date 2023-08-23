import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders File Explorer as the heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/File Explorer/i);
  expect(headingElement).toBeInTheDocument();
});
