import React from "react";
import { TitleIcon } from "../../../public/assets/icons/icons";

const TitleSection = ({ name }) => {
  return (
    <div className="flex -ml-14 min-h-14 mr-8 items-center justify-between rounded-full border-primary border-4 px-10 max-w-[90] min-w-[85]">
      <h1 className="text-3xl font-bold text-primary pl-10 uppercase">
        {name}
      </h1>
      <span className="hidden lg:block my-4">
        <TitleIcon />
      </span>
    </div>
  );
};

export default TitleSection;
