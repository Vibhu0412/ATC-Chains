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
import { Fragment, useEffect, useRef, useState } from "react";
import {
  getAllMainCategory,
  getAllSubCategory,
} from "../../../fetchers/universalFetch";

const PartsPopOver = ({ title, id, type }) => {
  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";

  const [productId, setProductId] = useState();
  const buttonRef = useRef(null);
  const timeoutDuration = 200;
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
      <SplideSlide key={`${index}`}>
        <div
          key={`${index}`}
          className=" mx-2 my-2 w-[200px] h-[150px]   bg-[url('/assets/icons/svg/product-bg.svg')]  bg-cover bg-no-repeat rounded-xl "
        >
          <Link href={`/products/${MainId}/variants/${product.id}`}>
            <div className=" overflow-hidden w-[195px] h-[150px] pt-5  mx-auto ">
              <Image
                className="  mx-auto my-4"
                width={400}
                height={400}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                  product?.image_1920
                    ? product?.image_1920[0]
                    : product?.image_url
                }`}
                alt="product image"
              />
            </div>

            <div className="px-4 py-1 bg-btn-primary flex justify-center items-center text-white rounded-b-xl">
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
      <Popover className="  ">
        {({ open }) => (
          <>
            <div onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                ref={buttonRef}
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group relative rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={(e) => apiCAll(e)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <a className="text-white  bg-btn-secondary/50 w-4 h-4 lg:w-6 lg:h-6 hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm "></a>
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
                <Popover.Panel className="px-4 transform overflow-auto rounded-xl bg-white pb-10 border -translate-x-1/3 left-1/3  sm:px-0 ">
                  <div
                    className=" px-4 rounded-xl   "
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className="w-full flex flex-wrap z-100 lg:max-w-2xl   rounded-xl overflow-hidden p-7 ">
                      <div>
                        <h1 className="font-bold min-w-[10rem]  text-center w-full mb-4 text-xl text-text-orange">
                          {data?.data?.primary_product_name
                            ? data?.data?.primary_product_name
                            : title}
                        </h1>
                      </div>
                      {isLoading ? (
                        "Loading..."
                      ) : (
                        <Splide
                          options={{
                            rewind: false,
                            autoWidth: true,
                            perPage: 20,
                            perMove: 2,
                            pagination: false,
                            gap: "1em",
                            focus: "center",
                            type: "slide",
                            easing: "ease",
                            arrows: true,
                          }}
                        >
                          {products}
                        </Splide>
                      )}
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
