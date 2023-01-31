import { useQuery } from "@tanstack/react-query";
import { getIndustryList } from "../../../fetchers/universalFetch";
import { Loader, ProductNotFound } from "../../Ui";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ReactHtmlParser from "react-html-parser";

const HomeIndustries = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industryList"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });
  const Industry = data?.data?.Industry;

  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;

  const industryList = Industry?.map((industries, index) => {
    return (
      <SplideSlide>
        <div key={index} className="relative mx-2">
          <div className="">
            <div
              className="w-[400px] lg:w-[600px]"
              key={industries.industry_category_name}
            >
              <img
                className="rounded-[30px] w-full max-h-64 "
                src={
                  industries?.image_url && industries?.image_url != 0
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                        industries?.image_url && industries?.image_url[0]
                      }`
                    : `/assets/images/industry/industry-1.png`
                }
                alt={industries.industry_category_name}
              />
              <div className="opacity-95 w-[350px] lg:w-[500px] mx-auto -mt-24 border bg-white rounded-3xl py-5 px-10  m-8">
                <p className="text-primary font-semibold text-xl sm:text-2xl line-clamp-1 capitalize ">
                  {industries.industry_category_name}
                </p>
                <p className="h-full b-5 font-thin text-gray-500 mt-2  line-clamp-6">
                  {ReactHtmlParser(industries.industry_category_desc)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SplideSlide>
    );
  });
  return (
    <Splide
      options={{
        rewind: false,
        autoWidth: true,
        perPage: 6,
        perMove: 2,
        pagination: false,
        gap: "1em",
        focus: "center",
        type: "slide",
        easing: "ease",
        arrows: true,
      }}
    >
      {industryList}
    </Splide>
  );
};

export default HomeIndustries;
