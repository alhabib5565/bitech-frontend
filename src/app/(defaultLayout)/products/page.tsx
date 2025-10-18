import React from "react";
import { cookies } from "next/headers";
import { ProductCard } from "@/components/products/ProductCard";
import { TProduct } from "@/types/product.type";
const ProductsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["products"],
    },
  });
  const products = await res.json();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 container">
      {products.map((product: TProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
