import React from "react";
import { motion } from "framer-motion";
import { Banner, ErrorBoundary, MainProductPage, SubProducts } from "../Ui";
import { staggerContainer } from "../../utils/motion";
import SubProductVariants from "./elements/SubProductVariants";

const ProductsPage = ({ currentPage }) => {
  return (
    <ErrorBoundary>
      <div>
        <Banner
          image={`${
            currentPage === "MainCategory"
              ? "product-page-banner"
              : currentPage === "SubCategory"
              ? "product-page-bannerTwo"
              : "product-page-bannerThree"
          }`}
        />
        <div className=" 2xl:px-8 relative">
          {currentPage === "MainCategory" ? (
            <div className=" -mt-[13rem] 2xl:-mt-[20rem] relative z-[2] pb-2 px-4">
              <SubProducts />
            </div>
          ) : currentPage === "SubCategory" ? (
            <div className="-mt-[13rem] 2xl:-mt-[20rem] relative z-[2] pb-2 px-4">
              <SubProductVariants />
            </div>
          ) : (
            ""
          )}
          <div className="">
            <MainProductPage currentPage={currentPage} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductsPage;
