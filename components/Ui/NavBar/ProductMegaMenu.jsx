import { Popover, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { getProductMegaMenuList } from "../../../fetchers/universalFetch";

const ProductMegaMenu = () => {
  const { isLoading, isError, data, error, onSuccess } = useQuery({
    queryKey: ["productMegaMenuList"],
    queryFn: getProductMegaMenuList,
  });
  const router = useRouter();
  const categoriesList = data?.data?.response?.main_category;
  const buttonRef = useRef(null);
  const timeoutDuration = "";
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
  //   console.log("menulist ----------", data?.data);
  //if (isLoading) return "loading----------";

  const { category, variantId } = router.query;
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
                  text-white group relative rounded-md inline-flex items-center hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={onMouseEnter.bind(null, open)}
                // onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <Link
                  href="/products"
                  className={`${
                    router.pathname == "/products" ||
                    router.pathname == "/products/[category]" ||
                    router.pathname ==
                      "/products/[category]/[variants]/[variantId]" ||
                    router.pathname ==
                      "/products/[category]/[variants]/[variantId]/product/[productId]"
                      ? "font-bold text-primary"
                      : "text-text-gray"
                  }  font-semibold hover:text-primary focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-full  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Products
                </Link>
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
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen   lg:px-10 -translate-x-1/2 transform sm:px-0">
                  <div
                    className=" relative rounded-lg  px-10 ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    // onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className=" w-full bg-white  border h-[60vh] mt-4 shadow-lg overflow-scroll  rounded-xl p-7 ">
                      <div className="flex flex-wrap gap-5 ">
                        {isLoading
                          ? "loading..."
                          : categoriesList?.map((categories, index) => (
                              <div key={`category_${index}`} className="">
                                <Link
                                  href={`/products/${categories.id}`}
                                  className={`${
                                    category == categories?.id
                                      ? "font-bold text-primary"
                                      : "text-text-gray"
                                  }  font-semibold hover:underline`}
                                >
                                  <h1 className="font-bold border-b-2 border-black pb-4 w-full text-md ">
                                    {categories?.name}
                                  </h1>
                                </Link>

                                <ul className="text-text-gray">
                                  {categories?.sub_category &&
                                    categories?.sub_category?.map(
                                      (sub, index) => (
                                        <Link
                                          key={index}
                                          className={`${
                                            variantId == sub?.id
                                              ? "font-bold text-primary"
                                              : "text-text-gray"
                                          }  font-semibold `}
                                          href={`/products/${categories.id}/variants/${sub?.id}`}
                                        >
                                          <li key={index} className="py-2">
                                            {sub?.display_name}
                                          </li>
                                        </Link>
                                      )
                                    )}
                                </ul>
                              </div>
                            ))}
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
export default dynamic(() => Promise.resolve(ProductMegaMenu), { ssr: false });
