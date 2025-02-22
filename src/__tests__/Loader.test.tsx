/* eslint-disable react/react-in-jsx-scope */
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "@/components/ui/Loader";

// Mock the FuzzyText component
vi.mock("@/blocks/TextAnimations/FuzzyText/FuzzyText", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Loader Component", () => {
  test("renders Loader component", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
