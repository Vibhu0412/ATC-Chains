import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const CustomSlider = ({ data, image }) => {
  // Ensure data is an array, if not, use an empty array
  const safeData = Array.isArray(data) ? data : [];
  const images = image ? [{ image_url: image }, ...safeData] : safeData;

  const maxCustomPaging = 10;
  const settings = {
    customPaging: function (i) {
      if (i >= maxCustomPaging) return <></>;
      return (
        <a className="w-full">
          <img
            className=""
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${images[i]?.image_url || ''}`}
            alt={`Thumbnail ${i + 1}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots space-y-4",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div
          key={index}
          className="flex mt-2 mb-32 md:mb-12 overflow-hidden items-center justify-center"
        >
          <Zoom>
            {!image?.image_url ? (
              <Image
                className="mx-auto cursor-pointer max-h-[500px] max-w-[300px] md:max-w-[400px] mb-20 pb-20 sm:mt-20 my-6 hover:scale-110 transition-all ease-in-out duration-100"
                src="/assets/images/products/image 39.png"
                width={400}
                height={500}
                alt="Product"
              />
            ) : (
              <Image
                className="mx-auto cursor-pointer max-h-[500px] max-w-[300px] md:max-w-[400px] mb-32 md:mb-24 my-6 hover:scale-110 transition-all ease-in-out duration-100"
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${image.image_url}`}
                width={400}
                height={500}
                alt="Product"
              />
            )}
          </Zoom>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;

