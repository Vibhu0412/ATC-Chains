import { Fragment, useRef, useState, useEffect } from "react";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getIndustryList } from "../../fetchers/universalFetch";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContextProvider = () => {
  let tabIndex = null;
  const router = useRouter();
  // make accordions close when one is opened.
  const AccordionRefs = useRef([]); // store accordion buttons as Refs
  const [currentAccordion, setCurrentAccordion] = useState(0); // set the current
  function closeCurrent(e) {
    // alert();
    console.log("AccordionRefs.current ---> ", AccordionRefs.current);
    const button = e?.target?.closest("button"); // get the button
    const buttonParent = button?.parentElement?.parentElement; // get the buttons parent (<dt> tag here)
    const parent = buttonParent?.parentElement; // get the buttons parent parent (Disclosure as div here)
    const index = parent?.children
      ? Array.prototype.indexOf.call(parent?.children, buttonParent)
      : null; // find the index of the button in container
    console.log("index", index);
    for (let i = 0; i < AccordionRefs.current.length; i++) {
      // loop throug
      if (
        AccordionRefs?.current[i].querySelector("button") &&
        AccordionRefs?.current[i]
          .querySelector("button")
          .getAttribute("aria-expanded") === "true" &&
        currentAccordion !== index // if it is opened and not the current
      ) {
        //  alert("if");
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

  const test = () => {
    console.log("test -------------- call......");
  };

  const [industryList, setIndustryList] = useState([]);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const [activeDisclousre, setActiveDisclousre] = useState(false);
  const [isActiveDisclousreIndex, setIsActiveDisclousreIndex] = useState(0);
  const [isTabActiveIndex, setIsTabActiveIndex] = useState(0);
  const [oldActiveDisclousreIndex, setOldActiveDisclousreIndex] = useState(0);

  const openDaynamicAccordion = () => {
    if (data?.data?.Industry) {
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

      console.log("parentIndex", parentIndex);
      console.log("data arr ===>", data.data.Industry);

      AccordionRefs.current[ind]?.querySelector("button").click();
      // alert(11);
      setIsActiveDisclousreIndex(ind);
      // setIsTabActiveIndex()
      // isTabActiveIndex
    }
  };

  const findChildTabIndex = () => {
    let actIndus = router.asPath.split("#")[1];
    console.log("isActiveDisclousreIndex ===> ", isActiveDisclousreIndex);
    console.log("actIndus ---> ", actIndus);
    console.log(
      "industry --->",
      data?.data?.Industry[isActiveDisclousreIndex].industry_subcategory_name
    );

    data?.data?.Industry[
      isActiveDisclousreIndex
    ].industry_subcategory_name.forEach((el, i) => {
      console.log("***********", el.name.split(" ").join("_"), actIndus);

      if (el.name.split(" ").join("_") === actIndus) {
        console.log("index --->", i);
        tabIndex = i;
        setIsTabActiveIndex(i);
        return i;
      }
    });

    if (oldActiveDisclousreIndex !== isActiveDisclousreIndex) {
      AccordionRefs.current[ind]?.querySelector("button").click();
    }

    console.log("tabIndex ---->", tabIndex);
  };

  useEffect(() => {
    let parent_ind = findChildTabIndex();
    console.log(
      "isActiveDisclousreIndex isActiveDisclousreIndex ---> ",
      isActiveDisclousreIndex
    );
    console.log("isTabActiveIndex in useEffect ---> ", isTabActiveIndex);

    let result = data?.data?.Industry.map((el, i) => {
      return {
        ...el,
        isParentIndex:
          isActiveDisclousreIndex === i ? isActiveDisclousreIndex : 0,
        isChildIndex: isTabActiveIndex,
      };
    });

    console.log("aaaaaaaaaaaaaaaaaaa result", result);
    result && setIndustryList([...result]);

    console.log("AccordionRefs.current --->", AccordionRefs.current);
    if (isActiveDisclousreIndex) {
      AccordionRefs.current[isActiveDisclousreIndex]
        ?.querySelector("button")
        .click();
    }
    // }
  }, [isActiveDisclousreIndex, isTabActiveIndex, router]);

  useEffect(() => {
    if (data?.data?.Industry.length) {
      setIndustryList(data?.data?.Industry ?? []);
      openDaynamicAccordion();
    }
  }, [data?.data?.Industry.length]);

  useEffect(() => {
    findChildTabIndex();
  }, [data?.data?.Industry.length, router]);

  useEffect(() => {
    console.log("industryList -------->", industryList);
  }, [industryList]);

  const industries = data?.data?.Industry ?? [];

  return (
    <div className="">
      <div className="p-4 mx-auto  sm:px-6 lg:px-8">
        <div className="divide-y-2 divide-gray-200 ">
          {`disclosure index : ${isActiveDisclousreIndex}`}
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 ">
            {industryList &&
              industryList?.map((industry, index) => {
                return (
                  <Disclosure
                    as="div"
                    className="pt-6"
                    //  defaultOpen={index === 0}
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
                          } py-6 px-10 w-80`}
                        >
                          <Disclosure.Button
                            // onClick={() => test()}
                            className="flex justify-between w-full text-left text-gray-400 focus:outline-none"
                          >
                            <span className="w-full font-medium text-gray-900">
                              {`${industry.industry_category_name} ${industry?.isParentIndex}`}
                            </span>
                            <span className="flex mt-4 ml-6 menuItems-center h-7">
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
                            {/* {industry.industry_category_desc} */}

                            <div className="w-full text-base text-gray-500">
                              {`isTabActiveIndex : ${isTabActiveIndex}`}
                              <div className="w-full block lg:flex gap-5  sm:px-0">
                                <Tab.Group
                                  selectedIndex={
                                    isTabActiveIndex ===
                                      industry?.isChildIndex &&
                                    industry?.isParentIndex === index
                                      ? isTabActiveIndex
                                      : 0
                                  }
                                  //  selectedIndex={isTabActiveIndex === industry?.isActive }
                                  onChange={(num) => {
                                    console.log("tab group on change", num);
                                    setIsTabActiveIndex(num);
                                  }}
                                >
                                  <Tab.List
                                    className="w-56"

                                    // selectedIndex={setActiveTabPanel}
                                  >
                                    {industry?.industry_subcategory_name?.map(
                                      (category) => (
                                        <Tab
                                          id={`#${
                                            category?.name &&
                                            category?.name.split(" ").join("_")
                                          }`}
                                          key={category.id}
                                          // className="bg-gray-500 text-white my-3"
                                          className={({ selected }) => (
                                            "w-64  rounded-lg py-8 text-sm font-medium leading-5 ",
                                            "ring-white ring-opacity-60 px-4 ring-none focus:outline-none focus:ring-none",
                                            selected
                                              ? "industryActive "
                                              : "text-black industry "
                                          )}
                                        >
                                          {category?.name}
                                          {`${category?.name} ${industry?.isChildIndex}`}
                                        </Tab>
                                      )
                                    )}
                                  </Tab.List>

                                  <Tab.Panels>
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
                                            {subCategory?.description}
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

export default ContextProvider;
