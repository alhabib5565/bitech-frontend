import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TProduct } from "@/types/product.type";
import Image from "next/image";
const sampleProduct: TProduct = {
  category: {
    createdAt: "2025-09-30T11:07:09.824206+00:00",
    description:
      "Premium quality product with exceptional design and craftsmanship. Perfect for everyday use and special occasions. Made with sustainable materials and ethical production practices.",
    id: "9c1129eb-cb7f-4c34-a94e-193a40f37a87",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    name: "Clothes",
    updatedAt: "2025-09-30T11:07:09.824206+00:00",
  },
  createdAt: "2025-09-29T11:09:16.110463+00:00",
  description:
    "Premium quality product with exceptional design and craftsmanship. Perfect for everyday use and special occasions. Made with sustainable materials and ethical production practices.",
  id: "0133b509-e436-4a14-b5c4-91b2a19aadc4",
  images: [
    "https://laravelpoint.com/files/p_img.jpg",
    "https://laravelpoint.com/files/p_img.jpg",
    "https://laravelpoint.com/files/p_img.jpg",
  ],
  name: "Premium Designer Collection",
  price: 1000,
  slug: "test-product-1133",
  updatedAt: "2025-09-30T11:09:16.110463+00:00",
};

const ProductDetails = () => {
  // In real app, fetch product by id
  const product = sampleProduct;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className=" max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 border border-gray-200">
              <Image
                src={product.images[0]}
                alt={product.name}
                height={500}
                width={500}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-4 ">
              {product.images.slice(0, 3).map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-md bg-gray-100 border border-gray-200 cursor-pointer transition-all hover:border-blue-500"
                >
                  <Image
                    height={50}
                    width={50}
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {/* <Badge className="mb-3">{product.category.name}</Badge> */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-blue-600">
                  ${(product.price / 100).toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="secondary" size="lg" className="w-full">
                Buy Now
              </Button>
            </div>

            <Separator />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
