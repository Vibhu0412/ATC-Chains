import Image from "next/image";
import React from "react";
import PartsPopOver from "../../Ui/PopOver/PartsPopOver";

const parts = [
  {
    top: "67%",
    left: "25%",
    title: "Conveyor Support Base Components",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    imageUrl: [
      {
        image:
          "https://images.pexels.com/photos/8525198/pexels-photo-8525198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        image:
          "https://images.pexels.com/photos/8525198/pexels-photo-8525198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        image:
          "https://images.pexels.com/photos/8525198/pexels-photo-8525198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    top: "54%",
    left: "39%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Flexible Chain & Assembly",
  },
  {
    top: "76%",
    left: "68%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "SS & Plastic Chains",
  },
  {
    top: "83%",
    left: "65%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Conveyor Bearings",
  },
  {
    top: "67%",
    left: "68%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Side Brackets & Connecting Joints Strips",
  },
  {
    top: "54%",
    left: "63%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Straigh & Inclined Modular Belt & Sprocket",
  },
  {
    top: "43%",
    left: "69%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Conveyor Rollers",
  },
  {
    top: "67%",
    left: "29%",
    opacity: 1,
    bgColor: "skyBlue",
    activeBgColor: "blue",
    title: "Bucket Elevator & Assembly",
  },
];

const ProductHoverOverView = () => {
  return (
    <div className="relative flex flex-wrap-reverse">
      <Image
        className="w-full h-full   "
        src="/assets/icons/svg/Main-Poster.svg"
        width={500}
        height={500}
      />
      {parts?.map((part, i) => (
        <div
          key={i}
          style={{
            top: part.top,
            left: part.left,

            opacity: part.opacity,
          }}
          className=" rounded-full absolute"
        >
          <PartsPopOver title={part.title} imageUrl={part.imageUrl} />
        </div>
      ))}
    </div>
  );
};

export default ProductHoverOverView;
