import { Fragment, useRef, useState, useEffect } from "react";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getIndustryList } from "../../fetchers/universalFetch";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { htmlToText } from "html-to-text";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const IndustriesPage = () => {
  let tabIndex = null;
  const router = useRouter();
  // make accordions close when one is opened.
  const AccordionRefs = useRef([]); // store accordion buttons as Refs
  const [currentAccordion, setCurrentAccordion] = useState(0); // set the current
  function closeCurrent(e) {
    const button = e?.target?.closest("button"); // get the button
    const buttonParent = button?.parentElement?.parentElement; // get the buttons parent (<dt> tag here)
    const parent = buttonParent?.parentElement; // get the buttons parent parent (Disclosure as div here)
    const index = parent?.children
      ? Array.prototype.indexOf.call(parent?.children, buttonParent)
      : null; // find the index of the button in container

    for (let i = 0; i < AccordionRefs.current.length; i++) {
      // loop throug
      if (
        AccordionRefs?.current[i].querySelector("button") &&
        AccordionRefs?.current[i]
          .querySelector("button")
          .getAttribute("aria-expanded") === "true" &&
        currentAccordion !== index // if it is opened and not the current
      ) {
        AccordionRefs.current[i].querySelector("button").click(); // then trigger a click to close it.
      }
    }
    setCurrentAccordion(index); // and set the current
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industryCtx"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });

  const [industryList, setIndustryList] = useState([]);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const [activeDisclousre, setActiveDisclousre] = useState(false);
  const [isActiveDisclousreIndex, setIsActiveDisclousreIndex] = useState(0);
  const [isTabActiveIndex, setIsTabActiveIndex] = useState(0);
  const [oldActiveDisclousreIndex, setOldActiveDisclousreIndex] = useState(0);

  const openDaynamicAccordion = () => {
    if (data?.data?.Industry && industryList.length > 0) {
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

      const parentIndex = data?.data?.Industry.map(
        (el) => el.industry_category_name
      ).indexOf(cat_name);
      setActiveDisclousre(parentIndex === -1 ? 0 : parentIndex);
      setOldActiveDisclousreIndex(parentIndex === -1 ? 0 : parentIndex);
      let ind = parentIndex === -1 ? 0 : parentIndex;

      if (activeDisclousre !== parentIndex) {
        AccordionRefs.current[ind]?.querySelector("button").click();
      }

      setIsActiveDisclousreIndex(ind);
    }
  };

  const findChildTabIndex = () => {
    let actIndus = router.asPath.split("#")[1];

    data?.data?.Industry[
      isActiveDisclousreIndex
    ]?.industry_subcategory_name.forEach((el, i) => {
      if (el.name.split(" ").join("_") === actIndus) {
        tabIndex = i;
        setIsTabActiveIndex(i);
        return i;
      }
    });

    if (oldActiveDisclousreIndex !== isActiveDisclousreIndex) {
      AccordionRefs.current[ind]?.querySelector("button").click();
    }
  };

  useEffect(() => {
    let parent_ind = findChildTabIndex();

    let result = data?.data?.Industry.map((el, i) => {
      return {
        ...el,
        isParentIndex:
          isActiveDisclousreIndex === i ? isActiveDisclousreIndex : 0,
        isChildIndex: isTabActiveIndex,
      };
    });

    result && setIndustryList([...result]);

    // if (isActiveDisclousreIndex) {

    //   AccordionRefs.current[isActiveDisclousreIndex]
    //     ?.querySelector("button")
    //     .click();
    // }
  }, [isActiveDisclousreIndex, router]);

  useEffect(() => {
    if (data?.data?.Industry.length) {
      setIndustryList(data?.data?.Industry ?? []);
      openDaynamicAccordion();
    }
  }, [data?.data?.Industry.length, router, industryList, activeDisclousre]);

  useEffect(() => {
    findChildTabIndex();
  }, [data?.data?.Industry.length, router]);

  const industries = data?.data?.Industry ?? [];

  return (
    <div className="">
      <div className="py-4 px-0 mx-auto   lg:px-8">
        <div className="divide-y-2 divide-gray-200 ">
          <dl className="mt-6 space-y-6 divide-y  ">
            {industryList.length >= 0 &&
              industryList?.map((industry, index) => {
                return (
                  <Disclosure
                    as="div"
                    className="pt-6"
                    defaultIndex={index === 0}
                    //selectedIndex={activeDisclousre ? activeDisclousre : 0}
                  >
                    {({ open }) => (
                      <>
                        <dt
                          onClick={closeCurrent}
                          ref={(el) => (AccordionRefs.current[index] = el)}
                          className={`${
                            open
                              ? "industryActive text-white"
                              : "industry text-primary"
                          } py-10 pl-16 px-10 w-80`}
                        >
                          <Disclosure.Button
                            className={` ${
                              open ? " text-white" : " text-primary"
                            } flex justify-between w-full text-left  focus:outline-none`}
                          >
                            <span className="w-full font-medium ">
                              {`${industry.industry_category_name}`}
                            </span>
                            <span className=" ml-6 menuItems-center h-7">
                              <ChevronUpIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-6 w-6 text-gray-500`}
                              />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2">
                          <div className="w-full text-base text-gray-500">
                            <div className="w-full text-base text-gray-500">
                              <div className="w-full block lg:flex gap-5  sm:px-0">
                                <Tab.Group
                                  vertical
                                  selectedIndex={
                                    isTabActiveIndex ? isTabActiveIndex : ""
                                  }
                                  onChange={(num) => {
                                    setIsTabActiveIndex(num);
                                  }}
                                >
                                  <Tab.List className="">
                                    {industry?.industry_subcategory_name?.map(
                                      (category) => (
                                        <Tab
                                          id={`#${
                                            category?.name &&
                                            category?.name.split(" ").join("_")
                                          }`}
                                          key={category.name}
                                          className={({ selected }) =>
                                            classNames(
                                              "w-[17rem] rounded-lg py-7 text-sm font-medium leading-5 text-primary",
                                              "ring-white ring-opacity-60 ring-none ring-offset-blue-400 focus:outline-none focus:ring-2",
                                              selected
                                                ? "  industryActive "
                                                : "text-primary industry  "
                                            )
                                          }
                                        >
                                          {category?.name}
                                        </Tab>
                                      )
                                    )}
                                  </Tab.List>

                                  <Tab.Panels className="w-full">
                                    {industry?.industry_subcategory_name?.map(
                                      (subCategory, idx) => (
                                        <Tab.Panel
                                          key={idx}
                                          className={classNames(
                                            "rounded-xl p-3 px-4 w-full",
                                            "ring-white ring-opacity-60 ring-offset-2 ring-none focus:outline-none focus:ring-none"
                                          )}
                                        >
                                          {subCategory?.multi_images != 0 && (
                                            <div
                                              key={subCategory}
                                              className="h-[40vh] lg:h-[60vh] min-w-[100%] max-w-[100%]  mx-auto "
                                            >
                                              <Carousel>
                                                {subCategory?.get_sub_category_data[0]?.multi_images.map(
                                                  (image) => (
                                                    <>
                                                      <Image
                                                        key={image?.name}
                                                        className="w-full h-full"
                                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image?.image_url}`}
                                                        alt={image?.name}
                                                        width={800}
                                                        height={800}
                                                      />
                                                    </>
                                                  )
                                                )}
                                              </Carousel>
                                            </div>
                                          )}
                                          <h2 className="font-bold text-2xl text-primary2 my-8 ">
                                            {subCategory?.name}
                                          </h2>
                                          <p className="my-4  text-base font-normal text-gray-500 dark:text-gray-400">
                                            {htmlToText(
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
                          </div>
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

export default IndustriesPage;
