import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropover from "@/components/ui/Dropover";

const props = {
  options: ["BTC", "ETH", "BNB"],
  value: "BTC",
  onChange: vi.fn(),
};

describe("Dropover Component", () => {
  test("renders Dropover component", () => {
    render(<Dropover {...props} />);
    expect(screen.getByRole("select")).toBeInTheDocument();
  });

  test("calls onChange when a new option is selected", () => {
    render(<Dropover {...props} />);
    fireEvent.change(screen.getByRole("select"), {
      target: { value: "ETH" },
    });
    expect(props.onChange).toHaveBeenCalled();
  });
});
