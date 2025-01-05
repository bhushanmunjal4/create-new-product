"use client";
import React, { useState } from "react";

interface FormData {
  product_name: string;
  original_price: string;
  sale_price: string;
  product_type: string;
  description: string;
}

interface Errors {
  product_name: string;
  original_price: string;
  sale_price: string;
  product_type: string;
  description: string;
}

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });

  const [errors, setErrors] = useState<Errors>({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Allow only numbers in original_price and sale_price
    if (
      (name === "original_price" || name === "sale_price") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.product_name)
      newErrors.product_name = "Product name is required.";
    if (!formData.original_price)
      newErrors.original_price = "Original price is required.";
    if (!formData.sale_price) newErrors.sale_price = "Sale price is required.";
    if (!formData.product_type)
      newErrors.product_type = "Product type is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    return newErrors as {
      product_name: string;
      original_price: string;
      sale_price: string;
      product_type: string;
      description: string;
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass formData to parent component's onSubmit
    onSubmit(formData);
  };

  return (
    <form
      className="bg-[#141B23] p-8 rounded-xl shadow-lg w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        className={`w-full mb-4 p-4 bg-[#202A36] text-white placeholder-[#B2BDC3] rounded text-md ${
          errors.product_name ? "border border-red-500" : ""
        }`}
        name="product_name"
        placeholder="Product Name"
        value={formData.product_name}
        onChange={handleChange}
      />
      {errors.product_name && (
        <p className="text-red-500 mb-2 text-sm">{errors.product_name}</p>
      )}

      <input
        className={`w-full mb-4 p-4 bg-[#202A36] text-white placeholder-[#B2BDC3] rounded text-md ${
          errors.original_price ? "border border-red-500" : ""
        }`}
        name="original_price"
        placeholder="Original Price"
        value={formData.original_price}
        onChange={handleChange}
      />
      {errors.original_price && (
        <p className="text-red-500 mb-2 text-sm">{errors.original_price}</p>
      )}

      <input
        className={`w-full mb-4 p-4 bg-[#202A36] text-white placeholder-[#B2BDC3] rounded text-md ${
          errors.sale_price ? "border border-red-500" : ""
        }`}
        name="sale_price"
        placeholder="Sale Price"
        value={formData.sale_price}
        onChange={handleChange}
      />
      {errors.sale_price && (
        <p className="text-red-500 mb-2 text-sm">{errors.sale_price}</p>
      )}

      <input
        className={`w-full mb-4 p-4 bg-[#202A36] text-white placeholder-[#B2BDC3] rounded text-md ${
          errors.product_type ? "border border-red-500" : ""
        }`}
        name="product_type"
        placeholder="Product Type"
        value={formData.product_type}
        onChange={handleChange}
      />
      {errors.product_type && (
        <p className="text-red-500 mb-2 text-sm">{errors.product_type}</p>
      )}

      <textarea
        className={`w-full mb-4 p-4 bg-[#202A36] text-white placeholder-[#B2BDC3] rounded text-md ${
          errors.description ? "border border-red-500" : ""
        }`}
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      {errors.description && (
        <p className="text-red-500 mb-2 text-sm">{errors.description}</p>
      )}

      <button
        type="submit"
        className="w-full bg-[#0052CC] text-white py-2 rounded hover:bg-blue-700"
      >
        Create Product
      </button>
    </form>
  );
}
