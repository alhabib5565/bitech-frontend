import { TProduct } from "@/types/product.type";
import Image from "next/image";
import ProductCardActionsButton from "./ProductCardActionsButton";
import { Image as ImageIcon } from "lucide-react";
import { isValidUrl } from "@/utils/checkIsUrl";

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.images?.[0] || "";

  return (
    <div className="group relative overflow-hidden rounded-md border transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square flex items-center justify-center overflow-hidden bg-[#f4f4f5]">
        {imageUrl && isValidUrl(imageUrl) ? (
          <Image
            src={imageUrl}
            alt={product.name}
            height={300}
            width={300}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <ImageIcon className="h-12 w-12" />
          </div>
        )}

        {/* Action buttons */}
        <ProductCardActionsButton product={product} />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold line-clamp-2 flex-1">
            {product.name}
          </h3>
          <span className="text-xs rounded-full bg-amber-500 px-2 py-0.5 font-medium  whitespace-nowrap">
            {product.category.name}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${(product.price / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
