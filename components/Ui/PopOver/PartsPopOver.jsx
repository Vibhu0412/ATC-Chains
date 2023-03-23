import { Popover, Transition } from "@headlessui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
// Import Swiper styles
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { getAllSubCategory } from "../../../fetchers/universalFetch";

const PartsPopOver = ({ title, id, type }) => {
  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";
  const [productId, setProductId] = useState();
  const buttonRef = useRef(null);
  const timeoutDuration = 500;
  let timeout;
  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const onMouseEnter = (open) => {
    clearTimeout(timeout);
    if (open) return;
    return buttonRef.current?.click();
  };
  const onMouseLeave = (open) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["SubCategoryOverview", productId],
    queryFn: () => getAllSubCategory(productId),
    //enabled: !!productId,
  });
  const MainId = data?.data?.primary_product;
  const apiCAll = (e) => {
    setProductId(id);
  };
  //mapping the data in the slider

  const products = data?.data?.response?.sub_category?.map((product, index) => {
    return (
      <SplideSlide key={`${index}`} className="">
        <div
          key={`${index}`}
          className=" mx-2 my-2 w-[200px] h-[150px] max-w-xl min-w-xl shadow-xl hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-2xl drop-shadow-sm border-1 rounded-t-xl "
        >
          <Link href={`/products/${MainId}/variants/${product.id}`}>
            <div className=" overflow-hidden w-[195px] h-[150px] pt-1.5  mx-auto ">
              {product?.image_1920.map((img) => (
                <Image
                  className="  mx-auto my-4"
                  width={400}
                  height={400}
                  src={
                    img
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${img}`
                      : "/assets/images/products/product2.jpeg"
                  }
                  alt={`product image`}
                />
              ))}

              {/*               
              <Image
                className="  mx-auto my-4"
                width={400}
                height={400}
                src={
                  product?.image_1920
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                        product?.image_1920
                          ? product?.image_1920[0]
                          : product?.image_1920[1]
                      }`
                    : "/assets/images/products/product2.jpeg"
                }
                alt={`product image`}
              /> */}
            </div>

            <div className="px-4 py-1 bg-white  shadow-xl hover:shadow-2xl flex justify-center items-center text-primary2 rounded-b-xl">
              <div className="text-lg font-semibold tracking-tight ">
                <p className=" line-clamp-1">
                  {product?.display_name
                    ? product?.display_name
                    : product?.product_name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </SplideSlide>
    );
  });

  return (
    <div className="w-full rounded-xl">
      <Popover onMouseEnter={onMouseEnter.bind(null, open)} className="  ">
        {({ open }) => (
          <>
            <div>
              <Popover.Button
                ref={buttonRef}
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group relative rounded-md -z-1 inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={(e) => apiCAll(e)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <div className="text-white relative -z-1 bg-btn-secondary/50 w-4 h-4 lg:w-6 lg:h-6 hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm "></div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="px-4  overflow-hidden absolute  z-10 mt-3 lg:px-6 -translate-x-1/2 transform rounded-xl bg-white pb-10 border sm:px-0 ">
                  <div
                    className=" px-4 rounded-xl   "
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className="w-full rounded-xl  p-7 ">
                      <div>
                        <h1 className="font-bold text-center w-full mb-4 text-xl text-text-orange">
                          {data?.data?.primary_product_name
                            ? data?.data?.primary_product_name
                            : title}
                        </h1>
                      </div>

                      <div className=" w-full ">
                        {isLoading ? (
                          "Loading..."
                        ) : (
                          <Splide
                            options={{
                              width: 500,
                              pagination: false,
                              gap: "1em",
                              //type: "loop",
                              drag: "free",
                              focus: "center",
                              perPage: 2,
                            }}
                          >
                            {products}
                          </Splide>
                        )}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PartsPopOver), { ssr: false });
