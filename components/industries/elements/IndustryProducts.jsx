import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ErrorBoundary } from "../../Ui";

const IndustryProducts = ({ data, currentPage }) => {
  const productUrl = `/industry-details/details/${data?.id}`;
  return (
    <ErrorBoundary>
      <motion.div className="my-4 px-2 mx-auto  bg-transparent">
        <div className="z-auto h-[350px] w-[350px] shadow-lg  overflow-hidden bg-[url('/assets/icons/svg/product-bg.svg')]  bg-cover bg-no-repeat rounded-xl  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 hover:shadow-2xl  duration-200">
          <div className="flex  mx-auto  items-center justify-center  ">
            <img
              className="z-0  mt-14"
              src={
                data && data?.image_1920 && data?.image_1920
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                      data?.image_1920 ? data?.image_1920 : data?.image_url
                    }`
                  : "/assets/images/products/image 39.png"
              }
              alt="product image"
              width={300}
              height={300}
            />
          </div>
          <Link href={productUrl}>
            <div className="px-4 py-5 bg-btn-primary flex justify-center items-center text-white rounded-b-xl">
              <div className="text-xl font-semibold tracking-tight ">
                <p className=" line-clamp-1">
                  {data?.name || data?.product_name || data?.display_name}
                </p>
                <p className="text-sm text-gray-400">
                  {data?.price ? data?.price : ""}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default IndustryProducts;
