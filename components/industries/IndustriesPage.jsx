import { useQuery } from "@tanstack/react-query";
import { Carousel } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { getIndustryList } from "../../fetchers/universalFetch";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import ReactHtmlParser from "react-html-parser";
import { useRouter } from "next/router";
import Image from "next/image";
import { Loader, ProductNotFound } from "../Ui";
import ContextProvider from "./ContextProvider";
import { useStateContext } from "../../context/StateManagement";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const IndustriesPage = ({ title, content, setRouter }) => {
  const router = useRouter();
  const [open, setOpen] = useState(1);
  const [activeIndustries, setActiveIndustries] = useState("");
  const AccordionRefs = useRef([]); // store accordion buttons as Refs
  const [currentAccordion, setCurrentAccordion] = useState(0); // set the current
  const [activeDisclousre, setActiveDisclousre] = useState(0);
  const [industry, setIndustry] = useState([]);
  const [activeTabPanel, setActiveTabPanel] = useState(0);
  const [parentCatId, setParentCatId] = useState(0);
  const { selectIndustry, setSelectIndustry } = useStateContext();
  function closeCurrent(e) {
    const button = e.target.closest("button"); // get the button
    const buttonParent = button?.parentElement.parentElement; // get the buttons parent (<dt> tag here)
    const parent = buttonParent?.parentElement; // get the buttons parent parent (Disclosure as div here)
    const index =
      Array?.prototype?.indexOf != "undefined" ||
      (Array?.prototype?.indexOf != null &&
        Array?.prototype?.indexOf?.call(parent?.children, buttonParent)); // find the index of the button in container
    for (let i = 0; i < AccordionRefs.current.length; i++) {
      // loop throug
      if (
        AccordionRefs?.current[i]?.querySelector("button") &&
        AccordionRefs?.current[i]
          ?.querySelector("button")
          ?.getAttribute("aria-expanded") === "true" &&
        currentAccordion !== index // if it is opened and not the current
      ) {
        AccordionRefs.current[i].querySelector("button").click(); // then trigger a click to close it.
      }
    }
    setCurrentAccordion(index); // and set the current
  }
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industry"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let actIndus = router.asPath.split("#")[1];
    setActiveIndustries(actIndus);

    const selectedIndsutrys = industry?.filter((el) => {
      for (let i = 0; i < el?.industry_subcategory_name?.length; i++) {
        if (
          el.industry_subcategory_name[i].name.split(" ").join("_") === actIndus
        ) {
          return el;
        }
      }
    });
    industry?.filter(
      (el) =>
        el?.industry_category_name ===
        selectedIndsutrys[0]?.industry_category_name
    );

    const indexOfIndustry =
      industry &&
      industry
        ?.map((e) => e.industry_category_name)
        .indexOf(selectedIndsutrys[0]?.industry_category_name);
    setActiveDisclousre(indexOfIndustry);
    setIndustry((prev) => [...prev]);
  }, [router]);

  useEffect(() => {
    if (data?.data?.Industry) {
      setIndustry(data?.data?.Industry);
      let actIndus = router.asPath.split("#")[1];
      let cat_name = "";

      data?.data?.Industry.length &&
        data?.data?.Industry.forEach((el) => {
          el.industry_subcategory_name.filter((subCat) => {
            if (subCat.name.split(" ").join("_") === actIndus) {
              cat_name = el.industry_category_name;
            }
          });
        });

      const parentIndex = data?.data?.Industry.findIndex(
        (parentName) => parentName.industry_category_name === cat_name
      );

      setActiveDisclousre(parentIndex === -1 ? 0 : parentIndex);
    }
  }, [data]);

  const activeDeactiveTab = (selected, catName, parentCatName) => {
    const filterdIndustrys = industry.filter(
      (el) => el.industry_category_name === parentCatName
    )[0];

    let index = filterdIndustrys?.industry_subcategory_name?.findIndex(
      (cat) => cat.name === catName
    );

    if (activeIndustries === catName?.split(" ").join("_")) {
      setActiveTabPanel(index);
      //setParentCatId(index)
    }

    return classNames(
      "w-64  rounded-lg py-8 text-sm font-medium leading-5 ",
      "ring-white ring-opacity-60 px-4 ring-none focus:outline-none focus:ring-none",
      activeIndustries === catName?.split(" ").join("_") || selected
        ? "industryActive "
        : "text-black industry "
    );
  };

  // console.log("data", data);
  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound />;
  return (
    <>
      {/* <div className="bg-bg-gray">
        <div className="p-4 mx-auto  sm:px-6 lg:px-8">
          <div className="divide-y-2 divide-gray-200 ">
            <dl className="mt-6 space-y-2 divide-y divide-gray-200 ">
              {industry &&
                industry?.map((industry, idx) => {
                  return (
                    <Disclosure
                      as="div"
                      key={idx}
                      defaultOpen={idx === activeDisclousre || open}
                      className="pt-2"
                    >
                      {({ open }) => {
                        return (
                          <>
                            <dt
                              className={`${
                                activeDisclousre === idx || open
                                  ? "industryActive text-white"
                                  : "industry text-primary"
                              } py-6 px-10 w-80`}
                              onClick={closeCurrent}
                              ref={(el) => (AccordionRefs.current[idx] = el)}
                            >
                              <Disclosure.Button
                                // open={activeDisclousre === idx || open}
                                className="flex my-4 justify-between items-center px-3 w-full  focus:outline-none"
                              >
                                <span className="w-full font-medium  ">
                                  {industry.industry_category_name}
                                </span>
                                <span className="flex ml-6 menuItems-center h-7">
                                  <ChevronUpIcon
                                    className={`${
                                      activeDisclousre === idx || open
                                        ? "rotate-180 transform"
                                        : ""
                                    } h-6 w-6 text-gray-500`}
                                  />
                                </span>
                              </Disclosure.Button>
                            </dt>
                            <Disclosure.Panel
                              as="dd"
                              static={activeDisclousre === idx}
                              className="mt-2"
                            >
                              <div className="w-full text-base text-gray-500">
                                <div className="w-full block lg:flex gap-5  sm:px-0">
                                  <Tab.Group>
                                    <Tab.List
                                      className="w-56"
                                      selectedIndex={activeTabPanel}
                                      // selectedIndex={setActiveTabPanel}
                                    >
                                      {industry?.industry_subcategory_name?.map(
                                        (category) => (
                                          <Tab
                                            id={`#${
                                              category?.name &&
                                              category?.name
                                                .split(" ")
                                                .join("_")
                                            }`}
                                            selectedIndex={activeTabPanel}
                                            key={category.id}
                                            className={({ selected }) =>
                                              activeDeactiveTab(
                                                selected,
                                                category?.name,
                                                industry?.industry_category_name
                                              )
                                            }
                                            onClick={
                                              setRouter === "homePage"
                                                ? () => {
                                                    router.push(
                                                      `#${category?.name
                                                        .split(" ")
                                                        .join("_")}`
                                                    );
                                                  }
                                                : () => {
                                                    router.push(
                                                      `/industries#${category?.name
                                                        .split(" ")
                                                        .join("_")}`
                                                    );
                                                  }
                                            }
                                          >
                                            {category?.name}
                                          </Tab>
                                        )
                                      )}
                                    </Tab.List>

                                    <Tab.Panels selectedIndex={activeTabPanel}>
                                      {industry?.industry_subcategory_name?.map(
                                        (subCategory, idx) => (
                                          <Tab.Panel
                                            key={idx}
                                            className={classNames(
                                              "rounded-xl p-3",
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
                                              {ReactHtmlParser(
                                                subCategory?.description
                                              )}
                                            </p>
                                            <div>
                                              {subCategory?.Products?.map(
                                                (product) => (
                                                  <ProductDetailCard />
                                                )
                                              )}
                                            </div>
                                          </Tab.Panel>
                                        )
                                      )}
                                    </Tab.Panels>
                                  </Tab.Group>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        );
                      }}
                    </Disclosure>
                  );
                })}
            </dl>
          </div>
        </div>
      </div> */}
      <ContextProvider />
    </>
  );
};

export default IndustriesPage;
