import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "@/components/Filter";

jest.mock("react-icons/io", () => ({
  IoIosArrowDown: () => <div data-testid="arrow-down" />,
  IoIosArrowUp: () => <div data-testid="arrow-up" />,
}));

describe("FilterDropdown Component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("should render the filter button", () => {
    render(<FilterDropdown onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should show dropdown when clicked", () => {
    render(<FilterDropdown onFilterChange={mockOnFilterChange} />);

    // Initially dropdown should be hidden
    expect(screen.queryByText("Product ID")).not.toBeInTheDocument();

    // Click the filter button
    fireEvent.click(screen.getByText("Filter"));

    // Dropdown should be visible with all options
    expect(screen.getByText("Product ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Original Price")).toBeInTheDocument();
    expect(screen.getByText("Discount Price")).toBeInTheDocument();
    expect(screen.getByText("Sale Price")).toBeInTheDocument();
    expect(screen.getByText("Product Type")).toBeInTheDocument();
  });

  it("should toggle arrow icon when clicked", () => {
    render(<FilterDropdown onFilterChange={mockOnFilterChange} />);

    // Initially down arrow should be visible
    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();

    // Click to open
    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByTestId("arrow-up")).toBeInTheDocument();

    // Click to close
    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();
  });

  it("should call onFilterChange and close dropdown when option selected", () => {
    render(<FilterDropdown onFilterChange={mockOnFilterChange} />);

    // Open dropdown
    fireEvent.click(screen.getByText("Filter"));

    // Click an option
    fireEvent.click(screen.getByText("Product ID"));

    // Check if callback was called with correct option
    expect(mockOnFilterChange).toHaveBeenCalledWith("Product ID");

    // Dropdown should be closed
    expect(screen.queryByText("Name")).not.toBeInTheDocument();
  });
});
