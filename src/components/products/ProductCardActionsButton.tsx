"use client";
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { TProduct } from "@/types/product.type";
type TProductCardActionsButtonProps = {
  product: TProduct;
};
const ProductCardActionsButton = ({
  product,
}: TProductCardActionsButtonProps) => {
  const handleDeleteProduct = () => {
    console.log(product?.slug);
  };
  const handleEditProduct = () => {};
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <Link href={`/products/${product?.slug}/details`}>
        <button
          className="rounded-full bg-white p-2.5 shadow transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="View product"
        >
          <Eye className="h-4 w-4" />
        </button>
      </Link>
      <button
        onClick={handleEditProduct}
        className="rounded-full bg-white p-2.5 shadow transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Edit product"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={handleDeleteProduct}
        className="rounded-full bg-white p-2.5 shadow transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Delete product"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProductCardActionsButton;
