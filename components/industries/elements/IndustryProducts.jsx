import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ErrorBoundary } from "../../Ui";

const IndustryProducts = ({ data, currentPage }) => {
  //const productUrl = `/industry-details/details/${data?.id}`;

  return (
    <ErrorBoundary>
      <motion.div key={data?.id} className="my-4 px-2 mx-auto bg-white ">
        <h1 className=" font-bold text-primary text-[20px] pl-6 mb-6 capitalize">
          {data.product_tmpl_id[1]}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {data?.products.map((product) => {
            let productUrl = `/industry-details/details/${product?.id}`;
            return (
              <Link href={productUrl}>
                <div className="z-auto h-[350px] w-[350px] shadow-lg  overflow-hidden  rounded-xl  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 hover:shadow-2xl  duration-200">
                  <div className="flex  mx-auto  items-center justify-center">
                    <img
                      className="z-0 h-[300px] w-[400px]"
                      src={
                        data && data?.image_1920 && data?.image_1920
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                              data?.image_1920
                                ? data?.image_1920
                                : data?.image_url
                            }`
                          : "/assets/images/products/image 39.png"
                      }
                      alt="product image"
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="px-4 py-2 bg-white flex justify-center items-center text-primary2 rounded-b-xl">
                    <div className="text-xl font-semibold tracking-tight ">
                      <p className=" line-clamp-1">
                        {product?.name ||
                          product?.product_name ||
                          product?.display_name}
                      </p>

                      <p className="text-sm text-gray-400">
                        {product?.price ? product?.price : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default IndustryProducts;
