import React from "react";
import { cookies } from "next/headers";
import { ProductCard } from "@/components/products/ProductCard";
import { TProduct } from "@/types/product.type";
import SearchFilter from "@/components/products/SearchFilter";
import MyPagination from "@/components/products/Pagination";
import CreateProductModal from "@/components/products/CreateProductModal";

interface TParams {
  searchParams: Promise<{
    searchedText?: string;
    categoryId?: string;
  }>;
}

const ProductsPage = async ({ searchParams }: TParams) => {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products"],
      },
    }
  );
  const products = await res.json();

  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "force-cache",
    }
  );
  const categories = await categoryRes.json();
  return (
    <div className="container space-y-6 py-6">
      {/* Search + Filter component */}
      <div className="flex justify-between">
        <SearchFilter categories={categories} />
        <CreateProductModal />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products?.length > 0 ? (
          products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
      <MyPagination />
    </div>
  );
};

export default ProductsPage;
