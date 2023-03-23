import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSearchProductDetailById } from "../../fetchers/universalFetch";
import { CubeIcon, ProductBgIcon } from "../../public/assets/icons/icons";
import { CustomSlider, ErrorBoundary, Modal } from "../Ui";
import DownloadAttachments from "../Ui/common/DownloadAttachments";
import RaiseInquiryForm from "../Ui/ContactForm/RaiseInquiryForm";

const SearchDetails = () => {
  const [showModal, setShowModal] = useState({ isShow: false, name: "" });
  const router = useRouter();
  const { id } = router.query;
  //getting the search result from the API
  const { isLoading, isError, data, error, isIdle } = useQuery({
    queryKey: ["searchResult", id],
    queryFn: () => getSearchProductDetailById(id),
    enabled: !!id,
  });

  //setting the search result
  const searchResult = data?.data?.result?.products;

  const raiseInquiry = () => {
    setShowModal({
      isShow: true,
      name: "Inquiry Form",
    });
  };
  const downloadAttachments = () => {
    setShowModal({
      isShow: true,
      name: "Download Attchments",
    });
  };
  const modalhide = () => {
    setShowModal((prev) => ({ ...prev, isShow: false }));
  };

  // if (isLoading) return <Loader />;
  return (
    <div>
      <ErrorBoundary>
        {showModal.isShow ? (
          <Modal
            title={
              showModal.name == "Inquiry Form"
                ? " Inquiry Form"
                : showModal.name == "Download Attchments"
                ? " Download Attchments"
                : ""
            }
            handleClose={modalhide}
          >
            {showModal.name === "Inquiry Form" ? (
              <RaiseInquiryForm
                setShowModal={setShowModal}
                handleClose={modalhide}
              />
            ) : showModal.name === "Download Attchments" ? (
              <DownloadAttachments
                setShowModal={setShowModal}
                handleClose={modalhide}
                data={searchResult}
              />
            ) : (
              ""
            )}
          </Modal>
        ) : (
          ""
        )}
        <div className="">
          <div className="pt-6">
            <div className="mx-auto px-3 pt-20 pb-16 sm:px-4 lg:grid lg:gap-x-8 lg:px-4 lg:pt-32 lg:pb-24">
              <div className="lg:flex  block gap-4 bg-white border rounded-xl pb-14 shadow-lg">
                <div className="bg-[#C6D5FC] w-full -mb-6  rounded-xl mt-10 pr-4 h-full">
                  <div className="bg-primary relative -mt-10 rounded-lg w-full  p-16 text-white py-12 pb-20">
                    <span className="absolute top-0 -right-0">
                      <ProductBgIcon />
                    </span>

                    <div className="py-4">
                      <h1 className="font-bold text-2xl w-64">
                        {searchResult?.products &&
                          searchResult?.products?.product_name}
                      </h1>
                    </div>
                    <div className="py-4 mb-2 lg:mb-4">
                      <p className="text-text-gray">
                        {searchResult?.products &&
                          searchResult?.products?.description}
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        {searchResult?.product_specification.map(
                          (specification, i) => (
                            <div
                              key={i}
                              className="flex gap-4 items-center w-full"
                            >
                              <div className="bg-white p-3 rounded-lg">
                                <CubeIcon />
                              </div>
                              <div>
                                <h5>
                                  {specification?.name &&
                                    specification?.name?.split(":")[0]}
                                </h5>
                                <p>
                                  {" "}
                                  {specification?.name &&
                                    specification?.name?.split(":")[1]}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-4">
                  <div className="py-8 px-4">
                    <div className="text-white flex items-center justify-center gap-4">
                      <button
                        onClick={() => raiseInquiry()}
                        className="bg-primary rounded-md px-6 py-2"
                      >
                        Raise Inquiry
                      </button>
                      <button
                        onClick={() => downloadAttachments()}
                        className="bg-bg-blue rounded-md px-6 py-2"
                      >
                        Attachments
                      </button>
                    </div>
                    <div className=" max-w-2xl min-w-3xl mx-auto w-full">
                      {/*  <img
                      className="overflow-hidden mt-14 mx-auto w-[80%] "
                      src={
                        product?.image_url
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${product?.image_url}`
                          : "/assets/images/products/image 39.png"
                      }
                      alt="product image"
                    />*/}
                      <CustomSlider
                        image={
                          searchResult?.products?.image_url
                            ? searchResult?.products?.image_url
                            : ""
                          //: "/assets/images/products/image 39.png"

                          //: "/assets/images/products/product2.jpeg"
                          //: "/assets/images/products/product2.jpeg"
                        }
                        data={
                          searchResult?.multi_image
                            ? searchResult?.multi_image
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default SearchDetails;
