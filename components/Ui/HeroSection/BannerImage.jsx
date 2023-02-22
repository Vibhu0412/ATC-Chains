import React from "react";

const BannerImage = ({ image, text, description, classes }) => {
  return (
    <div>
      <section className="relative lg:h-[60vh] xs:h-[70vh] h-[40vh] sm:h-[40vh] md:h-[50vh] flex flex-col items-start  justify-evenly text-start text-white py-0 lg:px-20 sm:px-2 px-8">
        <div className="video-docker rounded-b-3xl absolute bottom-0 top-0 left-0 w-full h-full overflow-hidden">
          <img
            src={`${image ? image : "/assets/icons/svg/aboutPageBanner.svg"}`}
            className="min-w-full min-h-full absolute object-cover  bg-center"
            alt="Banner"
          />
          <div
            className={`min-w-full min-h-full  opacity-70 absolute object-cover ${classes}`}
          ></div>
        </div>
        <div className="video-content z-0 w-full pt-32 md:w-full sm:full lg:w-[100vh]">
          <h1 className="font-semibold capitalize tracking-widest lg:font-bold  2xl:text-6xl  text-white text-xl lg:text-3xl sm:text-2xl md:text-2xl">
            {text ? text : ""}
          </h1>
          <div className=" lg:w-5/6 w-full py-6 md:w-full">
            <h3 className=" leading-[30px] text-lg lg:text-2xl text-white opacity-75">
              {description ? description : ""}
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerImage;
