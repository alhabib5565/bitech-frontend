"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages = ({ images, name }: ProductImagesProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  console.log(images);
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg border border-gray-200"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image}
                alt={`${name} ${idx + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white shadow-md"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white shadow-md"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductImages;
