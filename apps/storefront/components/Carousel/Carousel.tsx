import React, { useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";

import { ProductCardFragment } from "@/saleor/api";
import { ProductCard } from "../ProductCard";

interface ICarouselProps {
  products: ProductCardFragment[];
}

const Carousel = ({ products }: ICarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialSlides = isMobile ? [products[currentIndex]] : products.slice(0, 3);
  const [filteredSlides, setFilteredSlides] = useState(initialSlides);

  const prevSlide = () => {
    if (isBrowser) {
      if (currentIndex === 0) {
        setCurrentIndex(() => products.length - 1);
        setFilteredSlides(() => products.slice(7, products.length));
      } else {
        setCurrentIndex(currentIndex - 1);
        if (currentIndex <= 3) {
          setFilteredSlides(() => products.slice(currentIndex + 4, currentIndex + 7));
        } else {
          setFilteredSlides(() => products.slice(currentIndex - 4, currentIndex - 1));
        }
      }
    }
    if (isMobile) {
      if (currentIndex === 0) {
        setCurrentIndex(products.length - 1);
        setFilteredSlides(() => products.filter((_, i) => currentIndex === i));
      } else {
        setCurrentIndex(currentIndex - 1);
        setFilteredSlides(() => products.filter((_, i) => currentIndex === i));
      }
    }
  };

  const nextSlide = () => {
    if (isBrowser) {
      if (currentIndex >= 7) {
        setCurrentIndex(0);
        setFilteredSlides(() => products.slice(0, 3));
      } else {
        setCurrentIndex(() => currentIndex + 1);
        setFilteredSlides(() => products.slice(currentIndex + 1, currentIndex + 4));
      }
    }
    if (isMobile) {
      if (currentIndex === products.length - 1) {
        setCurrentIndex(0);
        setFilteredSlides(() => products.filter((_, i) => currentIndex === i));
      } else {
        setCurrentIndex(currentIndex + 1);
        setFilteredSlides(() => products.filter((_, i) => currentIndex === i));
      }
    }
  };

  return (
    <div className="max-w-[1400px] w-full m-auto py-16 px-4 relative group">
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 "
        data-testid="productsList"
      >
        {filteredSlides.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 cursor-pointer">
        <button
          onClick={prevSlide}
          type="button"
          className="absolute -top-8 -left-10 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-yellow-500">
            <svg
              aria-hidden="true"
              className="w-6 h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
      </div>
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] bg-transparent right-5 text-2xl rounded-full p-2 text-black cursor-pointer">
        <button
          onClick={nextSlide}
          type="button"
          className="absolute -top-8 -right-10 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent border border-yellow-500">
            <svg
              aria-hidden="true"
              className="w-6 h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
