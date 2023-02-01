import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const CustomSlider = ({ data, image }) => {
  const images = [{ image_url: image }, ...data];
  const settings = {
    customPaging: function (i) {
      return (
        <a className="w-full ">
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${images[i].image_url}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images != 0 &&
        images?.map((image, index) => (
          <div
            key={index}
            className="flex overflow-hidden items-center justify-center"
          >
            <Image
              className="mx-auto cursor-pointer mb-14 max-w-lg my-6 hover:scale-150 transition-all ease-in-out duration-100"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image?.image_url}`}
              width={500}
              height={500}
              alt="Product"
            />
          </div>
        ))}
    </Slider>
  );
};

export default CustomSlider;
