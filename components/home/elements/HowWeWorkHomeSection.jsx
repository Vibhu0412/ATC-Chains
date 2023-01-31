import React from "react";

const HowWeWorkHomeSection = () => {
  const dummyText = [
    {
      id: 1,
      name: "Explore our Diverse range of products",
      desc: "We have a diverse range of Products which include Modular conveyor belts,slat chains,  UHMW wearstrips, sprockets for conveyor belts & the list is endless.Convey your requirements to us and we deliver the best fit exclusively for YOU!",
    },
    {
      id: 2,
      name: "Rapid Response",
      desc: "Choose our services & we offer 24*7 assistance, exclusively for you! Get an instant solution to your Query from our sales team.",
    },
    {
      id: 3,
      name: "Quick Dispatch",
      desc: "We at Atcchains facilitate the on-time delivery to cater to perfect customized solutions",
    },
    {
      id: 4,
      name: "Committed on-time Delivery",
      desc: "Our work ethics speak of delivering premium on-time services adding the value to your business. We commit to on-time delivery of Products. ",
    },
    {
      id: 5,
      name: "Best Offer",
      desc: "The best deal adds more value ATC offers the best deal to meet your personalized needs! ",
    },
    {
      id: 6,
      name: "Order confirmation",
      desc: "Get your order placed within minutes! Get access to early",
    },
  ];

  return (
    <>
      <div className="w-full gap-10 block lg:flex justify-center items-start p-6 lg:mb-16 lg:px-20">
        <div className="w-full">
          <div>
            <p className="text-primary font-medium py-3">WORK</p>
            <h1 className="text-primary text-5xl font-bold py-3">
              How <span className="text-primary2">we Work</span>
            </h1>
            <p className="text-text-gray text-[16px]">
              Whether you want to edit your Google Docs, resolve Jira issues, or
              collaborate over Zoom, Delta has 100+ integrations with tools you
              already use and love.
            </p>
          </div>
          <div className="py-10">
            <img src="/assets/icons/svg/howWeWork.svg" alt="How We Work" />
          </div>
        </div>
        <div className="w-full">
          {dummyText &&
            dummyText.map((text, index) => (
              <div key={index} className="p-2 my-8 text-primary">
                <div className="flex gap-6 items-center my-3 text-2xl">
                  <p className="border-2 border-primary rounded-full w-12 h-12 p-2 text-center">
                    {text?.id}
                  </p>
                  <p className="text-primary font-semibold">{text?.name}</p>
                </div>
                <p className="text-text-gray text-[20px]">{text?.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HowWeWorkHomeSection;
