import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllNotification } from "../../../fetchers/universalFetch";
import { Dropdown } from "flowbite-react";
import { NavBarStarIcon } from "../../../public/assets/icons/icons";
import ReactHtmlParser from "react-html-parser";
import ModalImage from "react-modal-image";

import dynamic from "next/dynamic";
const NotificationNavbar = () => {
  const { isLoading, isError, data, error, onSuccess } = useQuery({
    queryKey: ["notificationList"],
    queryFn: getAllNotification,
    refetchOnWindowFocus: false,
  });

  const notification = data?.data?.notification;
  if (isLoading) return "laoding...";
  // if (isError) return "No Notification data";
  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      dismissOnClick={false}
      label={
        <>
          <span className="text-primary p-3 rounded-full hover:bg-btn-secondary bg-btn-primary hidden xl:block lg:hidden">
            <NavBarStarIcon color={`#fff`} />
          </span>
          <span className="text-white xl:block lg:hidden hidden px-2 border border-white -ml-2 -mt-6 relative rounded-full bg-primary">
            {notification?.length}
          </span>
        </>
      }
    >
      {isError ? (
        <div className="px-2">No Notification data</div>
      ) : (
        notification?.map((notification) => (
          <Dropdown.Item key={notification?.id} className="m-2 rounded-md">
            <div className=" max-w-lg flex gap-2 border bg-white shadow-md rounded-lg p-6  ">
              <div className="w-1/3">
                <ModalImage
                  small={
                    notification?.image_url
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${notification?.image_url}`
                      : "/assets/images/products/productImageNotFound.jpg"
                  }
                  large={
                    notification?.image_url
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${notification?.image_url}`
                      : "/assets/images/products/productImageNotFound.jpg"
                  }
                  alt={notification?.name}
                />

                {/* <img
                  className="w-32 h-32"
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${notification?.image_url}`}
                  //src="/assets/images/products/product-1.png"
                /> */}
              </div>
              <div className="w-2/3">
                <h2 className="font-semibold text-xl capitalize text-primary line-clamp-1">
                  {notification?.name}
                </h2>
                <p className="text-text-gray line-clamp-5 w-56">
                  {ReactHtmlParser(notification?.description)}
                </p>
              </div>
            </div>
          </Dropdown.Item>
        ))
      )}
    </Dropdown>
  );
};

export default dynamic(() => Promise.resolve(NotificationNavbar), {
  ssr: false,
});
