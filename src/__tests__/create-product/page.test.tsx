import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateProduct from "../../app/create-product/page";
import axios from "axios";

// Mock modules
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("axios");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => null,
}));

describe("CreateProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the CreateProduct component", () => {
    render(<CreateProduct />);
    expect(screen.getByText("Create New Product")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
  });

  it("should handle successful product creation", async () => {
    const mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.post.mockResolvedValueOnce({ status: 200, data: {} });

    render(<CreateProduct />);

    // Fill form
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

    // Submit form
    fireEvent.click(screen.getByText("Create Product"));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "https://lobster-app-ddwng.ondigitalocean.app/product/add_new",
        {
          product_name: "Test Product",
          original_price: "100",
          sale_price: "80",
          product_type: "Electronics",
          description: "Test Description",
        },
        {
          headers: {
            "Content-Type": "application/json",
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          },
        }
      );
    });
  });
});
