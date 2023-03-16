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
import { Fragment, useEffect, useRef, useState } from "react";
import {
  getAllSubCategory,
  getAllVariants,
} from "../../../fetchers/universalFetch";
import { RightArrowIcon } from "../../../public/assets/icons/icons";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const PopOver = ({ id, type }) => {
  const [productMainId, setProductMainId] = useState(id);
  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = category === undefined ? "" : parseInt(category);

  const subCategory = useQuery({
    queryKey: ["popoverItem", id],
    queryFn: () => getAllSubCategory(id),
    refetchOnWindowFocus: false,
  });
  const variants = useQuery({
    queryKey: ["popoverVariants", productMainId],
    queryFn: () => getAllVariants({ ProductId: ProductId, Id: id }),
    enabled: !!ProductId,
  });

  let popOverSubCategoryDataList = [];
  let MainId = "";
  ///const MainId = subCategory?.data?.data?.primary_product;
  //products/450/variants/216/product/1401
  if (type === "subCategory") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList =
      subCategory?.data?.data?.response?.sub_category;
  }
  if (type === "variants") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList = variants?.data?.data?.variants;
  }

  const buttonRef = useRef(null);
  const timeoutDuration = 4000;
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

  useEffect(() => {}, [productMainId]);
  const onMouseLeave = (open) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };
  const apiCAll = () => {
    setProductMainId(id);
  };
  return (
    <div className=" relative z-10 rounded-xl">
      <Popover className="  ">
        {({ open }) => (
          <>
            <div onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                ref={buttonRef}
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group relative py-2 rounded-md inline-flex justify-end items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={() => apiCAll()}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <div className="text-white bg-[#2E437C] hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  px-2 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {/* <ChevronRightIcon
                    className={`${
                      open ? "rotate-90 transform" : ""
                    } h-8 w-8 text-white`}
                  /> */}
                  <svg
                    width="27"
                    height="19"
                    viewBox="0 0 27 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8163 7.80667L1.5102 3.93571L1 14.5809L16.8163 10.226L16.5 10.5L17.5 17.5L26 9.25829L17.5 1.5V7.00022L16.8163 7.80667Z"
                      fill="white"
                      stroke="white"
                    />
                  </svg>
                </div>
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
                <Popover.Panel className="absolute left-1/2 z-10  w-screen max-w-sm lg:-translate-x-1/2 -translate-x-2/3  px-4 sm:px-0 lg:max-w-3xl ">
                  <div
                    className="  rounded-xl  ring-1 ring-black ring-opacity-5"
                    // onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className=" relative z-10 w-full max-w-md bg-white border rounded-xl overflow-hidden p-2 lg:p-7 ">
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
                        loopFillGroupWithBlank={false}
                        navigation
                        scrollbar={{ draggable: true }}
                        className="mySwiper"
                      >
                        {popOverSubCategoryDataList?.map((product, index) => (
                          <SwiperSlide>
                            <Link
                              href={
                                type === "subCategory"
                                  ? `/products/${MainId}/variants/${product.id}`
                                  : `/products/${ProductId}/variants/${id}/product/${product.id}`
                              }
                            >
                              <div
                                key={`${index}`}
                                className=" mx-2 my-2 w-full shadow-xl  rounded-xl "
                              >
                                <div className=" overflow-hidden w-[10rem] pt-5 mx-auto ">
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

                                <div className="px-4 py-1 bg-white flex justify-center items-center text-primary2 rounded-b-xl">
                                  <div className="text-lg font-semibold tracking-tight ">
                                    <p className=" line-clamp-1">
                                      {product?.display_name
                                        ? product?.display_name
                                        : product?.product_name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="flex items-center mt-3 justify-center w-full overflow-hidden">
                        <Link
                          href={
                            type === "subCategory"
                              ? `/products/${MainId}`
                              : `/products/${ProductId}/variants/${id}`
                          }
                        >
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
