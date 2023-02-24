import { Fragment, useRef, useState, useEffect } from "react";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getIndustryList } from "../../fetchers/universalFetch";
import { Carousel } from "flowbite-react";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContextProvider = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industrysec"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });
  const industriesList = data?.data?.Industry;
  console.log("data------------>", data?.data?.Industry);

  return (
    <div className="bg-bg-gray">
      <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="divide-y-2 divide-gray-200 ">
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 ">
            {industriesList &&
              industriesList.map((industry, idx) => {
                return (
                  <Disclosure as="div" className="pt-6">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${
                            open
                              ? "industryActive text-white"
                              : "industry text-primary"
                          } flex justify-between w-80 items-center  py-6 px-10  focus:outline-none`}
                        >
                          <span className="w-full font-medium ">
                            {industry.industry_category_name}
                          </span>
                          <span className=" mt-4 ml-6 menuItems-center h-7">
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-6 w-6 text-gray-500`}
                            />
                          </span>
                        </Disclosure.Button>

                        <Disclosure.Panel as="dd" className="mt-2">
                          <div className="w-full text-base text-gray-500">
                            {/* {industry.industry_category_desc} */}
                          </div>
                          <Tab.Group
                            as="div"
                            className={`flex space-x-1 rounded-x`}
                          >
                            <Tab.List className={`w-56 `}>
                              {industry?.industry_subcategory_name?.map(
                                (category) => (
                                  <Tab
                                    className={({ selected }) =>
                                      classNames(
                                        " rounded-lg w-64 py-8 text-sm font-medium leading-5 focus:ring-none px-4 ring-none ring-white ring-opacity-10 ",
                                        "  focus:outline-none focus:ring-2",
                                        selected
                                          ? "industryActive text-white"
                                          : "industry text-primary"
                                      )
                                    }
                                    id={`#${
                                      category?.name &&
                                      category?.name.split(" ").join("_")
                                    }`}
                                  >
                                    {" "}
                                    {category?.name}
                                  </Tab>
                                )
                              )}
                            </Tab.List>
                            <Tab.Panels
                              className={({ selected, selectedIndex }) =>
                                classNames(
                                  "mt-2 lg:px-10 px-2 w-full",
                                  selected
                                    ? "bg-blue-500 text-white"
                                    : `text-blue-700 ${selectedIndex}`
                                )
                              }
                            >
                              {industry?.industry_subcategory_name?.map(
                                (subCategory, idx) => (
                                  <Tab.Panel
                                    key={idx}
                                    className={classNames(
                                      "rounded-xl  p-3",
                                      "ring-white ring-opacity-60 ring-offset-2 ring-none focus:outline-none focus:ring-none"
                                    )}
                                  >
                                    {subCategory?.multi_images != 0 && (
                                      <div
                                        key={subCategory}
                                        className="h-[60vh] max-w-7xl mx-auto "
                                      >
                                        <Carousel>
                                          {subCategory?.multi_images?.map(
                                            (image) => (
                                              <Image
                                                key={image?.name}
                                                className="w-full h-full"
                                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image?.image_url}`}
                                                alt={image?.name}
                                                width={500}
                                                height={500}
                                              />
                                            )
                                          )}
                                        </Carousel>
                                      </div>
                                    )}
                                    <h2 className="font-bold text-2xl text-primary2 my-8 ">
                                      {subCategory?.name}
                                    </h2>
                                    <p className="my-4  text-base font-normal text-gray-500 dark:text-gray-400">
                                      {subCategory?.description}
                                    </p>
                                    <div>
                                      {subCategory?.Products?.map((product) => (
                                        <ProductDetailCard />
                                      ))}
                                    </div>
                                  </Tab.Panel>
                                )
                              )}
                            </Tab.Panels>
                          </Tab.Group>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ContextProvider;
