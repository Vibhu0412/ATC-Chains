import { Popover, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { getIndustryList } from "../../../fetchers/universalFetch";

const MegaMenu = () => {
  const { isLoading, isError, data, error, onSuccess } = useQuery({
    queryKey: ["megaMenuList"],
    queryFn: getIndustryList,
  });
  const router = useRouter();
  const categoriesList = data?.data?.Industry;
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
  // if (isLoading) return "loading----------";
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
                  text-white group relative rounded-md inline-flex items-center  hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <Link
                  href="/industries"
                  className={`${
                    router.pathname === "/industries"
                      ? "font-bold text-primary"
                      : "text-text-gray"
                  }  font-semibold hover:text-primary focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-full  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Industries
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
                <Popover.Panel className="absolute mx-auto z-50  px-4 mt-5 transform   sm:px-0 ">
                  <div
                    className=" relative z-10 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className=" w-full bg-white rounded-xl overflow-hidden p-7 ">
                      <div className="flex gap-5">
                        {isLoading
                          ? "loading..."
                          : categoriesList?.map((category, index) => (
                              <div key={`category_${index}`} className=" ">
                                <h1 className="font-bold border-b-2 border-black pb-4 w-full text-md text-primary">
                                  {category?.industry_category_name}
                                </h1>

                                <ul className="text-text-gray">
                                  {category?.industry_subcategory_name &&
                                    category?.industry_subcategory_name?.map(
                                      (sub, index) => (
                                        <Link
                                          key={index}
                                          href={`/industries#${
                                            sub?.name &&
                                            sub?.name.split(" ").join("_")
                                          }`}
                                        >
                                          <li key={index} className="py-2">
                                            {sub?.name}
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
export default dynamic(() => Promise.resolve(MegaMenu), { ssr: false });
