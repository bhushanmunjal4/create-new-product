"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "@/components/Form";
import axios from "axios";

export default function CreateProduct() {
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_CREATE_PRODUCT;
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

  const handleSubmit = async (formData: {
    product_name: string;
    original_price: string;
    sale_price: string;
    product_type: string;
    description: string;
  }) => {
    try {
      // Sending POST request with axios
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          api_key: apiKey,
        },
      });

      console.log("API Response:", response);

      if (response.status === 200) {
        toast.success("Product created successfully!");
        router.push("/display-product");
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-10 text-xl">Create New Product</h2>
      <Form onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}
