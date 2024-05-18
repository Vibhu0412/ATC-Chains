import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { fadeIn } from "../../../utils/motion";
import Image from "next/image";

const ProductDetailCard = ({ data, currentPage, index }) => {
  const router = useRouter();
  const { category, variantId } = router.query;

  const mainCategory = parseInt(category);
  const subCategoryId = parseInt(variantId);

  const productUrl =
    currentPage === "MainCategory"
      ? `/products/${data?.id}`
      : currentPage === "SubCategory"
      ? `/products/${mainCategory}/variants/${data?.id}`
      : currentPage === "VariantsId"
      ? `/products/${mainCategory}/variants/${subCategoryId}/product/${data?.id}`
      : "";

  return (
    <ErrorBoundary>
      <div className="my-4 mx-auto mb-14 ring-0 rounded-t-xl hover:shadow-2xl transition ease-in-out delay-150  border-none  hover:-translate-y-1 hover:scale-105 shadow-xl duration-200">
        <div className=" h-[300px] w-[300px] bg-white">
          <Link href={productUrl}>
            {currentPage === "MainCategory" || currentPage === "VariantsId" ? (
              <Image
                className=" mx-auto h-[300px] w-[400px] overflow-hidden rounded-t-xl"
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
            ) : (
              <div className="h-[300px] w-[300px]  mx-auto ">
                <Carousel indicators={false} slideInterval={3000}>
                  {data &&
                    data?.image_1920 &&
                    data?.image_1920?.map((image, index) => (
                      <img
                        className=""
                        src={
                          data?.image_1920 && data?.image_1920
                            ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image}`
                            : "/assets/images/products/image 39.png"
                        }
                        alt="product image"
                        key={index}
                        width={300}
                        height={300}
                      />
                    ))}
                </Carousel>
              </div>
            )}

            <div className="px-4 py-5 bg-white shadow-xl flex justify-center items-center text-primary rounded-b-xl">
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
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetailCard;
