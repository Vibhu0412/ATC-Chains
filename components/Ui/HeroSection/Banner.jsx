import React from "react";

const Banner = ({ image }) => {
  return (
    <div className="bg">
      <section className={`-mt-20 dark:bg-gray-900 ${image}`}>
        <div className="bg-white/20">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 h-[50vh] lg:h-[60vh] md:h-[50vh] "></div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
