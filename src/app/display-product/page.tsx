"use client";
import FilterDropdown from "@/components/Filter";
import Pagination from "@/components/Pagination";
import ProductTable from "@/components/ProductTable";
import SearchBox from "@/components/Search";
import { Product } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ApiResponse {
  _id: string;
  date_n_time: string;
  product_name: string;
  original_price: number;
  sale_price: number;
  product_type: string;
  description: string;
}

export default function DisplayProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const apiUrl = process.env.NEXT_PUBLIC_DISPLAY_PRODUCT;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_CREATE_PRODUCT is not defined in the environment variables."
    );
  }
  if (!apiKey) {
    throw new Error(
      "NEXT_PUBLIC_API_KEY is not defined in the environment variables."
    );
  }

  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://lobster-app-ddwng.ondigitalocean.app/product/list",
          {
            headers: { api_key: apiKey },
          }
        );

        const data = await response.data;

        if (data && Array.isArray(data.message)) {
          const transformedProducts: Product[] = data.message.map(
            (product: ApiResponse) => ({
              id: product._id,
              date: new Date(product.date_n_time).toLocaleString(),
              product_id: product._id,
              name: product.product_name,
              original_price: product.original_price,
              sale_price: product.sale_price,
              product_type: product.product_type,
              description: product.description,
            })
          );
          setProducts(transformedProducts);
          setFilteredProducts(transformedProducts); // Initially show all products
          console.log("all products: ", filteredProducts);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  // Filter products based on search query
  const handleSearch = (query: string) => {
    if (query) {
      const filtered = products.filter((product) => {
        const productName = product.name ? product.name.toLowerCase() : "";
        const productId = product.product_id
          ? String(product.product_id).toLowerCase()
          : "";
        return (
          productName.includes(query.toLowerCase()) ||
          productId.includes(query.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset when query is empty
    }
  };

  const handleFilterChange = (option: string) => {
    if (option === "Product ID") {
      const sortedProducts = [...filteredProducts].sort(
        (a, b) => String(a.product_id).localeCompare(String(b.product_id)) // Ensure product_id is treated as a string
      );
      setFilteredProducts(sortedProducts);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-[1200px] mt-10">
        {/* Title and Controls */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="flex items-center space-x-4">
            <FilterDropdown onFilterChange={handleFilterChange} />
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>

        {/* Product Table */}
        <ProductTable products={currentProducts} loading={loading} />

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            totalItems={filteredProducts.length}
            itemsPerPage={PRODUCTS_PER_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
