/* eslint-disable @typescript-eslint/no-unsafe-call */
import { isBrowser, isMobile } from "react-device-detect";

let currIndex = 0;

export let filteredProducts = [] as any;
export const getProducts = (products: any) => {
  filteredProducts = isMobile ? [products[currIndex]] : products.slice(0, 3);
};

export const prevSlide = (products: any) => {
  filteredProducts = [...products];
  if (isBrowser) {
    if (currIndex === 0) {
      currIndex = filteredProducts.length - 1;
      filteredProducts = products.slice(7, products.length);
    } else {
      currIndex = currIndex - 1;
      if (currIndex <= 3) {
        filteredProducts = products.slice(currIndex + 4, currIndex + 7);
      } else {
        filteredProducts = products.slice(currIndex - 4, currIndex - 1);
      }
    }
  }
  if (isMobile) {
    if (currIndex === 0) {
      currIndex = products.length - 1;
      filteredProducts = products.filter((_: any, index: number) => currIndex === index);
    } else {
      currIndex -= 1;
      filteredProducts = products.filter((_: any, index: number) => currIndex === index);
    }
  }
  return filteredProducts;
};

export const nextSlide = (products: any) => {
  filteredProducts = [...products];
  if (isBrowser) {
    if (currIndex >= 6) {
      currIndex = 0;
      filteredProducts = products.slice(0, 3);
    } else {
      currIndex += 1;
      filteredProducts = filteredProducts.slice(currIndex + 1, currIndex + 4);
    }
  }
  if (isMobile) {
    if (currIndex === products.length - 1) {
      currIndex = 0;
      filteredProducts = products.filter((_: any, index: number) => currIndex === index);
    } else {
      currIndex += 1;
      filteredProducts = products.filter((_: any, index: number) => currIndex === index);
    }
  }
  return filteredProducts;
};
