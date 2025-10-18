"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages = ({ images, name }: ProductImagesProps) => {
  console.log(images);
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
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
    </div>
  );
};

export default ProductImages;
