import React from "react";
import { render, screen } from "@testing-library/react";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/types";

jest.mock("react-spinners", () => ({
  FadeLoader: () => <div data-testid="fade-loader">Loading...</div>,
}));

describe("ProductTable Component", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      date: "2024-01-05 12:00:00",
      product_id: "PROD001",
      name: "Test Product with Long Name",
      original_price: 100,
      sale_price: 80,
      product_type: "Electronics",
      description: "This is a very long description that should be truncated",
    },
  ];

  it("should render loading state", () => {
    render(<ProductTable products={[]} loading={true} />);
    expect(screen.getByTestId("fade-loader")).toBeInTheDocument();
  });

  it("should render table headers", () => {
    render(<ProductTable products={mockProducts} loading={false} />);

    const headers = [
      "S.No",
      "Date and Time",
      "Product ID",
      "Name",
      "Original Price",
      "Sale Price",
      "Product Type",
      "Description",
    ];

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("should render truncated product data correctly", () => {
    render(<ProductTable products={mockProducts} loading={false} />);

    expect(screen.getByText("PROD001")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  it('should show "No products added" when products array is empty', () => {
    render(<ProductTable products={[]} loading={false} />);
    expect(screen.getByText("No products added")).toBeInTheDocument();
  });

  it("should render serial numbers correctly", () => {
    render(<ProductTable products={mockProducts} loading={false} />);
    expect(screen.getByText("1")).toBeInTheDocument(); // First row should have S.No as 1
  });
});
