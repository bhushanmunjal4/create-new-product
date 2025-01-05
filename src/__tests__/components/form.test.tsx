import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../../components/Form";

describe("Form Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("should render all form fields", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Original Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sale Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Product Type")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Create Product")).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty form", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Create Product"));

    expect(screen.getByText("Product name is required.")).toBeInTheDocument();
    expect(screen.getByText("Original price is required.")).toBeInTheDocument();
    expect(screen.getByText("Sale price is required.")).toBeInTheDocument();
    expect(screen.getByText("Product type is required.")).toBeInTheDocument();
    expect(screen.getByText("Description is required.")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should submit form with valid data", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Product Name"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Original Price"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Sale Price"), {
      target: { value: "80" },
    });
    fireEvent.change(screen.getByPlaceholderText("Product Type"), {
      target: { value: "Electronics" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText("Create Product"));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      product_name: "Test Product",
      original_price: "100",
      sale_price: "80",
      product_type: "Electronics",
      description: "Test Description",
    });
  });
});
