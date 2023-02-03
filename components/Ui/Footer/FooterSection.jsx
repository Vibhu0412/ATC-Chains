import Link from "next/link";
import React, { useState } from "react";
import {
  FacebookIcon,
  FooterDownloadSectionIcon,
  FooterSettingIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../../public/assets/icons/icons";
import ClientCardSection from "../Card/ClientCardSection";
import DownloadAttachments from "../common/DownloadAttachments";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Modal from "../modal/Modal";

const FooterSection = () => {
  const [showModal, setShowModal] = useState({ isShow: false, name: "" });
  const downloadableAttachments = [
    {
      name: "testing.txt",
      attachements:
        "http://192.168.0.61:8069/web/content/ir.attachment/7235/datas?download=true",
    },
    {
      name: "testing.pdf",
      attachements:
        "http://192.168.0.61:8069/web/content/ir.attachment/7235/datas?download=true",
    },
  ];
  const downloadAttachments = () => {
    setShowModal({
      isShow: true,
      name: "Download Attachments",
    });
  };

  const modalhide = () => {
    setShowModal((prev) => ({ ...prev, isShow: false }));
  };
  const quickLink = [
    {
      name: "Industries",
      link: "/industries",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    {
      name: "News",
      link: "/news",
    },
    {
      name: "Video",
      link: "/youtube",
    },
  ];
  return (
    <ErrorBoundary>
      {showModal.isShow ? (
        <Modal
          title={
            showModal.name == "Download Attachments"
              ? " Download Attachments"
              : ""
          }
          handleClose={modalhide}
        >
          {showModal.name === "Download Attachments" ? (
            <DownloadAttachments
              setShowModal={setShowModal}
              handleClose={modalhide}
              data={downloadableAttachments}
            />
          ) : (
            ""
          )}
        </Modal>
      ) : (
        ""
      )}
      <div className="footer-bg z-0 mt-20 pt-28 lg:pt-0 border-none relative">
        <span className="absolute bottom-0 right-0 hidden 2xl:block">
          <FooterSettingIcon />
        </span>
        <div className="w-full flex items-center justify-center">
          <div className="lg:max-w-6xl md:max-w-3xl sm:max-w-2xl  max-w-lg w-full rounded-3xl pb-5  mb-6 lg:p-12 p-3 bg-primary">
            <div className="flex flex-col items-center justify-center text-white mb-6">
              <p>Wall of fame</p>
              <h1 className="font-bold text-4xl sm:text-3xl">Our Clients</h1>
            </div>
            <div className=" overflow-hidden">
              <ClientCardSection />
            </div>
          </div>
        </div>
        <div className=" text-white items-center flex justify-center">
          <footer className="p-4 sm:p-6 max-w-[1500px] w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 my-4 md:grid-cols-4 ">
              <div className=" mb-[0.5rem]">
                <h2 className="font-bold text-3xl lg:text-5xl md:text-xl text-white mb-4 ">
                  ATC Chains
                </h2>
                <p className="text-lg w-full lg:w-2/3 text-gray-300 mb-4">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
                <p className=" text-gray-300 mb-4">(689) 555-0102</p>
                <p className=" text-gray-300 mb-4">(603) 555-0123</p>
              </div>

              <div className="">
                <h2 className="linksHeading font-bold text-3xl  text-white ">
                  Quick Links
                </h2>
                <div className="links">
                  <ul className="flex-col flex-wrap text-xl items-center my-6 font-bold space-y-2">
                    {quickLink.map((links, i) => (
                      <li key={i} className="py-1">
                        <Link href={links?.link} className=" hover:underline">
                          {links?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 ">
                <div className="-mt-16 hidden lg:block">
                  <FooterDownloadSectionIcon />
                </div>
                <h1 className="  text-2xl  text-white">Download</h1>
                <div className="bg-white/30 w-full rounded-xl h-36 p-6">
                  <h4 className=" text-white text-sm mb-6">
                    Product Detail & Specification
                  </h4>
                  <button
                    type="submit"
                    onClick={() => downloadAttachments()}
                    className="bg-btn-secondary h-[2.1rem] w-[11rem] md:w-[8rem] rounded-full text-white"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-600 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm sm:text-center ">
                © 2022{" "}
                <a href="#" className="hover:underline">
                  Traunship
                </a>
                . All right reserved.
              </span>
              <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <a href="#" className="text-gray-500 hover:text-white">
                  <FacebookIcon />
                </a>
                <a href="#" className="text-gray-500 hover:text-white ">
                  <InstagramIcon />
                </a>
                <a href="#" className="text-gray-500 hover:text-white ">
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FooterSection;
