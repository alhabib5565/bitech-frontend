"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

const ProductActions = () => {
  return (
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
  );
};

export default ProductActions;
