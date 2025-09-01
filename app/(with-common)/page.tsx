import React from "react";
import HeroSplit from "../components/HeroSplit";
import CategoryFilter from "../components/molecule/CategoryFilter";
import PromoCarousel from "../components/molecule/PromoCarousel";
import { Cat } from "../types/type";
import ProductGridInfinite from "../components/molecule/ProductGridInfinite";

const page = () => {
  return (
    <>
      <PromoCarousel
        items={[
          {
            id: "tips",
            title: "Give The Best Care\nFor Your Plants",
            tag: "Plant Tips",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/tips",
          },
          {
            id: "bouquet",
            title: "New Spring Bouquets",
            tag: "Seasonal",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/products?cat=bouquet",
          },
          {
            id: "custom",
            title: "Custom Flower Box",
            tag: "Custom Order",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/custom",
          },
        ]}
      />
      <CategoryFilter />

      {/* <HeroSplit /> */}

      <div className="px-4">
        <ProductGridInfinite />
      </div>
      {/* <div className="mt-8">
        <ValueBar />
      </div> */}
      {/* <div className="mt-10">
        <CategoryGrid />
      </div>
      <div className="mt-12">
        <FeaturedProducts />
      </div> */}
    </>
  );
};

export default page;
