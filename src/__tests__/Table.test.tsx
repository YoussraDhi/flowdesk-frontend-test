/* eslint-disable react/react-in-jsx-scope */
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "@/components/ui/Table";

const props = {
  columns: [
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
  ],
  data: [
    { name: "John", age: 25 },
    { name: "Jane", age: 24 },
  ],
  onSort: vi.fn(),
};

describe("Table Component", () => {
  test("renders Table component", () => {
    render(<Table {...props} />);
    expect(screen.getByRole("data-table")).toBeInTheDocument();
  });
});
