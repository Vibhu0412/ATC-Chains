import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getIndustryListFurniture } from "../../../fetchers/universalFetch";
import { PlayIcon } from "../../../public/assets/icons/icons";

const IndustrySolutionHome = () => {
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industryListFurniture"],
    queryFn: getIndustryListFurniture,
    refetchOnWindowFocus: false,
  });
  const Industry = data?.data?.Industry;
  const selectedIndusrty = (e) => {
    const indList = e?.target?.value || e;

    const SubIndustry = Industry?.filter((ind) => ind?.id == indList);
    setSubCategory(SubIndustry[0]?.industry_subcategory_name);

    const id = SubIndustry[0]?.industry_subcategory_name;
  };
  const subCategories = (e) => {
    setSelectedSubCategory(e.target.value);
  };
  const disabled = subCategory?.length === 0;
  return (
    <div className=" industry-solution-bg">
      <div className="bg-black/75 h-[90vh] grid grid-cols-1 lg:grid-cols-2 lg:px-32">
        <div className=" grid gap-6 items-center py-10 px-4 lg:px-20">
          <div className=" w-full mx-auto  max-w-md home-industry-solution-bg pl-2 pr-14 py-6 lg:py-14 lg:px-20">
            <select
              className="block bg-transparent w-full -mb-2 px-16 lg:px-0 py-4  text-lg lg:text-xl text-primary2 border-none rounded-3xl focus:ring-0 focus:outline-none focus:border-none "
              onChange={(e) => selectedIndusrty(e)}
            >
              <option slected>Conver type</option>
              {Industry?.map((industry, index) => (
                <option key={index} value={industry.id}>
                  {industry?.industry_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-full max-w-md flex rotate-180 mx-auto pr-2 pl-10  flex-wrap-reverse home-industry-solution-bg  py-6 lg:py-14 xl:px-20">
            <select
              disabled={disabled}
              className="block w-full bg-transparent rotate-180 -mb-2 px-16 lg:px-0 py-4  text-lg lg:text-xl text-primary2 border-none rounded-3xl focus:ring-0 focus:outline-none focus:border-none "
              onChange={(e) => subCategories(e)}
            >
              <option slected>I need a solution for</option>
              {subCategory?.map((sub, index) => (
                <option key={index} value={sub?.id}>
                  {sub?.name}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-full mx-auto max-w-md home-industry-solution-bg px-16 py-6 lg:py-14 lg:px-20">
            <button
              className={`${
                selectedSubCategory === null
                  ? " cursor-not-allowed  border-gray-300/60"
                  : " border-gray-300"
              } -mb-2 text-lg lg:text-xl w-full font-bold py-4 text-primary2 border-none rounded-3xl focus:ring-none focus:outline-none focus:border-none `}
            >
              {selectedSubCategory === null ? (
                <div className="flex items-center justify-between">
                  Find My Solution <PlayIcon />
                </div>
              ) : (
                <Link
                  href={`/industry-details/${selectedSubCategory}`}
                  className="flex items-center justify-between"
                >
                  Find My Solution <PlayIcon />
                </Link>
              )}
            </button>
          </div>
        </div>
        <div className=" w-full bottom-8 right-5 text-white">
          <div className="flex items-center justify-start h-full px-4 lg:mt-20">
            <div className=" lg:pl-52">
              <p className="capitalize font-bold">
                SOLUTION MAKE YOUR OWN CONVER
              </p>
              <h2 className="text-4xl font-semibold py-4">
                Belting solutions set to fix your tailor-made needs.
              </h2>
              <p>
                WE believe in delivering value to your business. Invest in our
                robust & durable unique belts and witness the difference
                yourself!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutionHome;
