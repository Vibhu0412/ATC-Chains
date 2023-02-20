import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Fragment, useRef } from "react";
import {
  getAllSubCategory,
  getAllVariants,
} from "../../../fetchers/universalFetch";
import { RightArrowIcon } from "../../../public/assets/icons/icons";
import { useRouter } from "next/router";

const PopOver = ({ id, type }) => {
  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";

  const subCategory = useQuery({
    queryKey: ["popoverItem", id],
    queryFn: () => getAllSubCategory(id),
    refetchOnWindowFocus: false,
  });
  const variants = useQuery({
    queryKey: ["Variants", ProductId],
    queryFn: () => getAllVariants({ ProductId: ProductId, Id: id }),
    enabled: !!ProductId,
  });

  let popOverSubCategoryDataList = [];
  let MainId = "";
  ///const MainId = subCategory?.data?.data?.primary_product;
  //products/450/variants/216/product/1401
  if (type === "SubCategory") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList =
      subCategory?.data?.data?.response?.sub_category;
  }
  if (type === "variants") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList = variants?.data?.data?.variants;
  }

  // const MainId = data?.data?.primary_product;
  // const popOverSubCategoryDataList = data?.data?.response?.sub_category;
  const buttonRef = useRef(null);
  const timeoutDuration = 100000;
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

  // const onMouseEnter = (open) => {
  //   clearTimeout(timeout);
  //   if (open) return;
  //   return buttonRef.current?.click();
  // };

  const onMouseLeave = (open) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  return (
    <div className="w-full relative z-10  rounded-xl">
      <Popover className="  ">
        {({ open }) => (
          <>
            <div onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                ref={buttonRef}
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group relative  py-2 rounded-md inline-flex justify-end items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                // onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <a className="text-white bg-text-secondary hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <RightArrowIcon />
                </a>
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
                <Popover.Panel className="absolute mb-50 z-50   px-4 mt-0 transform overflow-hidden -translate-x-2/3 left-1/3 sm:px-0 ">
                  <div
                    className="  rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
                    // onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className=" relative z-10 w-full max-w-md bg-white rounded-xl overflow-hidden p-7 ">
                      <div>
                        <h1 className="font-bold w-full text-xl text-text-orange">
                          Showing Sub{" "}
                          <span className="text-primary">categories</span>
                        </h1>
                      </div>
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={2}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation
                        scrollbar={{ draggable: true }}
                        className="mySwiper"
                      >
                        {popOverSubCategoryDataList?.length}
                        {popOverSubCategoryDataList?.map((product, index) => (
                          <SwiperSlide>
                            <div
                              key={`${index}`}
                              className=" mx-2 my-2  w-full shadow-lg bg-[url('/assets/icons/svg/product-bg.svg')]  bg-cover bg-no-repeat rounded-xl "
                            >
                              <div className=" overflow-hidden w-[10rem]  pt-5  mx-auto ">
                                <Image
                                  className=" h-28 w-28 mx-auto mt-4"
                                  width={28}
                                  height={28}
                                  src={`${
                                    process.env.NEXT_PUBLIC_API_BASE_URL_DEV
                                  }${
                                    product?.image_1920
                                      ? product?.image_1920[0]
                                      : product?.image_url
                                  }`}
                                  alt="product image"
                                />
                              </div>

                              <Link
                                href={
                                  type === "subCategory"
                                    ? `/products/${MainId}/variants/${product.id}`
                                    : `/products/${ProductId}/variants/${id}/product/${product.id}`
                                }
                              >
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
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="flex items-center mt-3 justify-center w-full overflow-hidden">
                        <Link href={`/products/${MainId}`}>
                          <p className="text-primary underline text-center">
                            Show all the products
                          </p>
                        </Link>
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

export default dynamic(() => Promise.resolve(PopOver), { ssr: false });
