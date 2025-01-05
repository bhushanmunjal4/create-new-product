import { Product } from "@/types";
import React from "react";
import { FadeLoader } from "react-spinners";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, loading }) => {
  console.log("products Table Data: ", products);

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] flex justify-center items-center">
        <FadeLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="h-[600px] overflow-hidden rounded-xl">
      <table className="w-full h-full border-collapse rounded-xl">
        <thead className="bg-[#222C38] text-white">
          <tr>
            <th className="px-4 py-6 text-sm font-medium">S.No</th>
            <th className="p-4 text-sm font-medium">Date and Time</th>
            <th className="p-4 text-sm font-medium">Product ID</th>
            <th className="p-4 text-sm font-medium">Name</th>
            <th className="p-4 text-sm font-medium">Original Price</th>
            <th className="p-4 text-sm font-medium">Sale Price</th>
            <th className="p-4 text-sm font-medium">Product Type</th>
            <th className="p-4 text-sm font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={product.id}
                className={`bg-[#141B23] text-white align-top ${
                  index === products.length - 1 ? "rounded-b-xl" : ""
                }`}
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{product.date}</td>
                <td className="p-2 text-center">{product.product_id}</td>
                <td className="p-2 text-center">
                  {" "}
                  {truncateText(product.name, 10)}
                </td>
                <td className="p-2 text-center">{product.original_price}</td>
                <td className="p-2 text-center">{product.sale_price}</td>
                <td className="p-2 text-center">{product.product_type}</td>
                <td className="p-2 text-center">
                  {truncateText(product.description, 8)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="p-4 text-center text-white bg-[#141B23] rounded-b-lg"
              >
                No products added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
