import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";

import { TProduct } from "@/types/product.type";
import ProductImages from "@/components/product_details/ProductImages";
import ProductActions from "@/components/product_details/ProductActions";

type TParams = {
  params: Promise<{ slug: string }>;
};

const ProductDetails = async ({ params }: TParams) => {
  const slug = (await params).slug;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const product: TProduct = await res.json();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImages images={product.images} name={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Actions (Client Component) */}
            <ProductActions />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
