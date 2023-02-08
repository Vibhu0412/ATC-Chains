import { Popover, Transition } from "@headlessui/react";
// Import Swiper styles
import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment, useRef } from "react";

const PartsPopOver = ({ imageUrl, title }) => {
  console.log("imageUrl", imageUrl, title);
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
                <a className="text-white bg-btn-secondary/50 w-4 h-4 lg:w-6 lg:h-6 hover:bg-btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm "></a>
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
                <Popover.Panel className="px-4 w-96 mt-0 transform overflow-hidden  sm:px-0 ">
                  <div
                    className="  rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className="w-full bg-white rounded-xl overflow-hidden p-7 ">
                      <div>
                        <h1 className="font-bold w-full text-xl text-text-orange">
                          {title}
                        </h1>
                      </div>

                      <div className="flex mx-auto  items-center mt-3 justify-center">
                        {imageUrl &&
                          imageUrl.map((images) => (
                            <div class="mb-4">
                              <img
                                src={`${images.image}`}
                                class="max-w-full h-auto  px-2"
                                alt=""
                              />
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

export default dynamic(() => Promise.resolve(PartsPopOver), { ssr: false });
