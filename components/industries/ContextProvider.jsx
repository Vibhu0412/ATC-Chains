import { useQuery } from "@tanstack/react-query";
import { Accordion, Carousel, Tabs } from "flowbite-react";
import React, { useRef, useState } from "react";
import { getIndustryList } from "../../fetchers/universalFetch";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProductCard } from "../Ui";
import ReactHtmlParser from "react-html-parser";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const solutions = [
  {
    name: "Blog",
    description:
      "Mollit eu laboris ullamco eiusmod sit ad aliquip quis. Duis mollit irure sint dolor adipisicing. Ullamco do eiusmod duis eu nulla sint. Proident amet excepteur laborum deserunt sunt Lorem ex elit ut ut qui qui laboris velit minim. Ex amet do anim do in consequat aliquip elit aute proident. Anim culpa veniam eu consectetur dolor velit nostrud laboris. Exercitation non ad excepteur et deserunt reprehenderit exercitation quis labore veniam labore non velit. Est proident exercitation ex non laborum cillum commodo non dolore eu ad. Occaecat enim elit non exercitation fugiat ipsum officia proident officia ex minim consectetur. Pariatur in aute irure consectetur sit culpa eiusmod dolore Lorem.Learn about tips, product updates and company culture.",
    href: "#",
  },
  {
    name: "Help Center",
    description:
      "Mollit eu laboris ullamco eiusmod sit ad aliquip quis. Duis mollit irure sint dolor adipisicing. Ullamco do eiusmod duis eu nulla sint. Proident amet excepteur laborum deserunt sunt Lorem ex elit ut ut qui qui laboris velit minim. Ex amet do anim do in consequat aliquip elit aute proident. Anim culpa veniam eu consectetur dolor velit nostrud laboris. Exercitation non ad excepteur et deserunt reprehenderit exercitation quis labore veniam labore non velit. Est proident exercitation ex non laborum cillum commodo non dolore eu ad. Occaecat enim elit non exercitation fugiat ipsum officia proident officia ex minim consectetur. Pariatur in aute irure consectetur sit culpa eiusmod dolore Lorem.Get all of your questions answered in our forums of contact support.",
    href: "#",
  },
  {
    name: "Guides",
    description:
      "Mollit eu laboris ullamco eiusmod sit ad aliquip quis. Duis mollit irure sint dolor adipisicing. Ullamco do eiusmod duis eu nulla sint. Proident amet excepteur laborum deserunt sunt Lorem ex elit ut ut qui qui laboris velit minim. Ex amet do anim do in consequat aliquip elit aute proident. Anim culpa veniam eu consectetur dolor velit nostrud laboris. Exercitation non ad excepteur et deserunt reprehenderit exercitation quis labore veniam labore non velit. Est proident exercitation ex non laborum cillum commodo non dolore eu ad. Occaecat enim elit non exercitation fugiat ipsum officia proident officia ex minim consectetur. Pariatur in aute irure consectetur sit culpa eiusmod dolore Lorem.Learn how to maximize our platform to get the most out of it.",
    href: "#",
  },
  {
    name: "Events",
    description:
      "Check out webinars with experts and learn about our annual conference.",
    href: "#",
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
  },
];

const ContextProvider = ({ title, content }) => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [open, setOpen] = useState(1);
  const AccordionRefs = useRef([]); // store accordion buttons as Refs
  const [currentAccordion, setCurrentAccordion] = useState(0); // set the current
  function closeCurrent(e) {
    const button = e.target.closest("button"); // get the button
    const buttonParent = button?.parentElement.parentElement; // get the buttons parent (<dt> tag here)
    const parent = buttonParent?.parentElement; // get the buttons parent parent (Disclosure as div here)
    const index = Array.prototype?.indexOf?.call(
      parent?.children,
      buttonParent
    ); // find the index of the button in container
    console.log("index", index);
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
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleClick = (id) => {
    const SubIndustry = Industry?.filter((ind) => ind?.id == id);
    setSubCategory(SubIndustry);
    setSubCategoryList(SubIndustry[0]?.industry_subcategory_name);
    setClickedItem(id);
    setShowcontainer(!showcontainer);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industry"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });

  const Industry = data?.data?.Industry;

  return (
    <>
      <div className="bg-bg-gray">
        <div className="p-4 mx-auto  sm:px-6 lg:px-8">
          <div className="divide-y-2 divide-gray-200 ">
            <dl className="mt-6 space-y-2 divide-y divide-gray-200 ">
              {Industry?.map((industry, index) => {
                return (
                  <Disclosure
                    as="div"
                    className="pt-2"
                    defaultOpen={index === 0}
                  >
                    {({ open }) => (
                      <>
                        <dt
                          className="py-6 px-10 industry w-80"
                          onClick={closeCurrent}
                          ref={(el) => (AccordionRefs.current[index] = el)}
                        >
                          <Disclosure.Button className="flex  justify-between items-center px-2 w-full text-gray-400 focus:outline-none">
                            <span className="w-full font-medium  text-gray-900">
                              {industry.industry_category_name}
                            </span>
                            <span className="flex mt-4 ml-6 menuItems-center h-7">
                              <ChevronDownIcon className="h-6 w-6 transform" />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2">
                          <div className="w-full text-base text-gray-500">
                            <div className="w-full block  lg:flex gap-5  sm:px-0">
                              <Tab.Group>
                                <Tab.List className=" w-80 rounded-xl">
                                  {industry?.industry_subcategory_name?.map(
                                    (category) => (
                                      <Tab
                                        id={category?.name}
                                        key={category}
                                        className={({ selected }) =>
                                          classNames(
                                            "w-64  rounded-lg py-8 text-sm font-medium leading-5 ",
                                            "ring-white ring-opacity-60 px-4 ring-none  focus:outline-none focus:ring-none",
                                            selected
                                              ? "industryActive "
                                              : "text-black industry "
                                          )
                                        }
                                      >
                                        {category?.name}
                                      </Tab>
                                    )
                                  )}
                                </Tab.List>
                                <Tab.Panels className="mt-2 w-full">
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
                                          <div className="h-72 max-w-6xl mx-auto sm:h-64 xl:h-96 2xl:h-96">
                                            <Carousel>
                                              {subCategory?.multi_images?.map(
                                                (image) => (
                                                  <img
                                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image?.image_url}`}
                                                    alt={image?.name}
                                                  />
                                                )
                                              )}
                                            </Carousel>
                                          </div>
                                        )}
                                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
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
                    )}
                  </Disclosure>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContextProvider;
