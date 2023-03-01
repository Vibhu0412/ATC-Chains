import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
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
import { useRouter } from "next/router";

const ProductSubCategroy = ({ parent, id, image, name, type }) => {
  const [productMainId, setProductMainId] = useState(id);

  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";

  const subCategory = useQuery({
    queryKey: ["popoverItem", id],
    queryFn: () => getAllSubCategory(id),
    refetchOnWindowFocus: false,
  });

  const variants = useQuery({
    queryKey: ["Variants", productMainId],
    queryFn: () => getAllVariants({ ProductId, Id: id }),
    enabled: !!ProductId,
  });

  let popOverSubCategoryDataList = [];
  let MainId = "";
  ///const MainId = subCategory?.data?.data?.primary_product;

  if (type === "subCategory") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList =
      subCategory?.data?.data?.response?.sub_category;
  }
  if (type === "variants") {
    MainId = subCategory?.data?.data?.primary_product;
    popOverSubCategoryDataList = variants?.data?.data?.variants;
  }
  useEffect(() => {}, [productMainId]);

  const buttonRef = useRef(null);
  const timeoutDuration = 1000;
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

  const apiCAll = () => {
    setProductMainId(id);
  };
  return (
    <div className="w-full top-16  rounded-xl">
      <Popover className="relative">
        {({ open }) => (
          <>
            <div onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                ref={buttonRef}
                // onMouseEnter={(e) => apiCAll(e)}
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group relative rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={onMouseEnter.bind(null, open, apiCAll())}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <Image
                  className="object-center object-cover h-[300px] max-w-[400px]  rounded-t-xl"
                  src={image}
                  width={400}
                  height={300}
                  alt={"product"}
                />
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
                <Popover.Panel className="absolute mb-50 bg-white shadow-xl border  rounded-xl mt-0 transform overflow-hidden z-10 -translate-x-1/3 left-1/3 sm:px-0 ">
                  <div
                    className=" relative z-10 rounded-xl  ring-1 ring-black ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className=" overflow-hidden p-7 ">
                      <div>
                        <h1 className="font-bold w-full text-lg text-primary">
                          {name}
                        </h1>
                      </div>
                      <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        //slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={false}
                        scrollbar={{ draggable: true }}
                        className="mySwiper"
                      >
                        <ul>
                          {popOverSubCategoryDataList?.map((product, index) => (
                            <li
                              key={`${index}`}
                              className=" mx-2 my-2 max-w-2xl w-full rounded-xl "
                            >
                              <Link
                                href={
                                  type === "subCategory"
                                    ? `/products/${MainId}/variants/${product.id}`
                                    : `/products/${ProductId}/variants/${id}/product/${product.id}`
                                }
                              >
                                <div className="px-2 py-1  flex justify-start items-center text-black rounded-b-xl">
                                  <div className="text-lg font-semibold tracking-tight ">
                                    <p className=" line-clamp-2 hover:underline hover:scale-105 transition duration-200">
                                      {">"}{" "}
                                      {product?.display_name
                                        ? product?.display_name
                                        : product?.product_name}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Swiper>
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

export default dynamic(() => Promise.resolve(ProductSubCategroy), {
  ssr: false,
});
