import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const SearchProductDetailProductCard = ({ data, currentPage }) => {
  return (
    <ErrorBoundary>
      <motion.div className=" mx-auto bg-white">
        <div className=" -z-1 h-[350px] w-[400px] shadow-lg  overflow-hidden rounded-xl  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl  duration-200">
          <Link href={`/search/${data?.id}`}>
            <div className="flex h-[300px] w-[400px] mx-auto overflow-hidden items-center justify-center  ">
              <Image
                className=""
                src={
                  data?.image_1920 && data?.image_1920
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                        data?.image_1920 ? data?.image_1920 : data?.image_url
                      }`
                    : "/assets/images/products/image 39.png"
                }
                alt="product image"
                width={400}
                height={300}
              />
            </div>

            <div className="px-4 py-1  bg-white flex justify-center items-center text-primary2 rounded-b-xl">
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

export default SearchProductDetailProductCard;
