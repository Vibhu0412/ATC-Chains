import { Popover, Transition } from "@headlessui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
// Import Swiper styles
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef } from "react";
import { getAllMainCategory } from "../../../fetchers/universalFetch";

const PartsPopOver = ({ imageUrl, title }) => {
  const buttonRef = useRef(null);
  const timeoutDuration = 200;
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

  //mapping the data in the slider
  const images = imageUrl?.map((images, index) => {
    return (
      <SplideSlide key={`${index}_pro`}>
        <div key={index} className="flex">
          <motion.div className="transition-all  max-w-md duration-100 ease-in-out delay-150 py-10 px-2">
            <Link href={`/products/${"445"}`}>
              <div className="border border-primary rounded-xl">
                <div className="flex flex-col space-y-4 md:space-y-8  md:mt-0  ">
                  <div className="relative  group flex justify-center items-center rounded-t-xl w-full h-full ">
                    <div class="mb-4">
                      <Image
                        src={`${images.image}`}
                        class="max-w-full h-32 w-32 mx-auto  px-2"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </SplideSlide>
    );
  });
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
                  text-white group relative rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-opacity-75`}
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <a className="text-white  bg-btn-secondary/50 w-4 h-4 lg:w-6 lg:h-6 hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm "></a>
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
                <Popover.Panel className="px-4 transform overflow-auto -translate-x-1/3 left-1/3  sm:px-0 ">
                  <div
                    className="  rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className="w-full z-100 bg-white rounded-xl overflow-hidden p-7 ">
                      <div>
                        <h1 className="font-bold min-w-[10rem] max-w-xl text-center w-full mb-4 text-xl text-text-orange">
                          {title}
                        </h1>
                      </div>
                      <Splide
                        options={{
                          rewind: true,
                          autoWidth: true,
                          perPage: 5,
                          perMove: 5,
                          pagination: false,
                          gap: "1em",
                          focus: "center",
                          type: "slide",
                          easing: "ease",
                          arrows: true,
                        }}
                      >
                        {images}
                      </Splide>
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

export default dynamic(() => Promise.resolve(PartsPopOver), { ssr: false });
