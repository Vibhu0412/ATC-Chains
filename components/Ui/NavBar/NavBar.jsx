import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { navItems } from "../staticItems/navItems";
import { NavBarStarIcon } from "../../../public/assets/icons/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import CommonBtn from "../Button/CommonBtn";
import MegaMenu from "./MegaMenu";
import NotificationNavbar from "../notifications/NotificationNavbar";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();

  return (
    <Navbar
      fluid={false}
      className="dark:bg-gray-200  fixed top-0 text-transparent w-full z-20 shadow-md rounded-b-[30px] rounded-t-none "
    >
      <Navbar className="">
        <Link href={"/"}>
          <Image
            src="/assets/images/logo/Logo-dark.png"
            className="mr-3 h-12 lg:h-14 sm:h-14"
            alt="ATC Chain India"
            width={200}
            height={200}
          />
        </Link>
      </Navbar>
      <div className="flex gap-0 lg:gap-4 md:order-2 items-center">
        <NotificationNavbar />

        <Link href="/contact">
          <CommonBtn
            name={"Contact Us"}
            customClasses={
              "text-white py-2 px-4 bg-btn-primary rounded-lg border"
            }
          />
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar>
          <Link href="/" as="/">
            <h1
              className={` bg-transparent hover:text-text-primary  font-semibold ${
                router.pathname == "/"
                  ? "font-bold text-primary"
                  : "text-text-gray "
              } `}
            >
              Home
            </h1>
          </Link>
        </Navbar>
        <Navbar>
          <Link href="/products" as="/products">
            <h1
              className={` bg-transparent hover:text-text-primary  font-semibold ${
                router.pathname == "/products" ||
                router.pathname == "/products/[category]" ||
                router.pathname ==
                  "/products/[category]/[variants]/[variantId]" ||
                router.pathname ==
                  "/products/[category]/[variants]/[variantId]/product/[productId]"
                  ? "font-bold text-primary"
                  : "text-text-gray "
              } `}
            >
              Products
            </h1>
          </Link>
        </Navbar>
        <Navbar>
          <Link href="/industries" as="/industries">
            <h1
              className={` bg-transparent hover:text-text-primary   font-semibold ${
                router.pathname == "/industries"
                  ? "font-bold text-primary"
                  : "text-text-gray "
              } `}
            >
              <MegaMenu />
            </h1>
          </Link>
        </Navbar>

        {navItems.map((item, i) => (
          <Navbar key={i}>
            <Link href={item?.href} as={item?.href}>
              <h1
                className={` bg-transparent hover:text-text-primary  font-semibold ${
                  router.pathname == item?.href
                    ? "font-bold text-primary"
                    : "text-text-gray "
                } `}
              >
                {item?.name}
              </h1>
            </Link>
          </Navbar>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
