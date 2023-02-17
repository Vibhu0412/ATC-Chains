import React from "react";
import { motion } from "framer-motion";
import { Banner, ErrorBoundary, MainProductPage, SubProducts } from "../Ui";
import { staggerContainer } from "../../utils/motion";
import SubProductVariants from "./elements/SubProductVariants";

const ProductsPage = ({ currentPage }) => {
  return (
    <ErrorBoundary>
      <div>
        <Banner image={"product-page-banner"} />
        <div className=" 2xl:px-8 relative">
          {currentPage === "MainCategory" ? (
            <div className="-mt-72 pb-10 px-4">
              <SubProducts />
            </div>
          ) : currentPage === "SubCategory" ? (
            <div className="-mt-72 pb-10 px-4">
              <SubProductVariants />
            </div>
          ) : (
            ""
          )}

          <div>
            <MainProductPage currentPage={currentPage} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductsPage;
