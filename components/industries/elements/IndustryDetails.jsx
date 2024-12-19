import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getIndustryDetails } from "../../../fetchers/universalFetch";
import { useRouter } from "next/router";
import { Loader, ProductNotFound } from "../../Ui";
import IndustryProducts from "./IndustryProducts";

const IndustryDetails = () => {
  const router = useRouter();
  const { industryId } = router.query;
  const indId = parseInt(industryId);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industry", industryId],
    queryFn: () => getIndustryDetails(indId),
  });

  const Industry = data?.data?.Industry?.industry_subcategory_name;

  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;
  return (
    <>
      <div className="w-full ">
        <div className=" w-full rounded-2xl my-10 px-2 mx-auto">
          {Industry?.map((industries, index) => (
            <>
              <h1
                className="font-bold text-primary text-2xl pl-6 mb-6 capitalize"
                key={index}
              >
                {industries?.name}
              </h1>

              {/* <h1
                className="font-bold text-primary text-2xl pl-6 mb-6 capitalize"
                key={index}
              >
                {industries.get_sub_category_data[index].product_tmpl_id[1]}
              </h1> */}
              {/* {industries[0]?.product_tmpl_id[1]} */}

              {/* <h1
                className="font-bold text-primary text-2xl pl-6 mb-6 capitalize"
                key={index}
              >
                {industries?.product_tmpl_id && industries?.product_tmpl_id[1]}
              </h1> */}
              <div>
                {industries?.get_sub_category_data &&
                  industries?.get_sub_category_data.map((product, index) => (
                    <IndustryProducts
                      key={index}
                      index={index}
                      data={product}
                    />
                  ))}
              </div>

              {/* <div className="grid grid-cols-1 lg:grid-cols-3">
                {industries?.products &&
                  industries.products.map((product, index) => (
                    <IndustryProducts
                      key={index}
                      index={index}
                      data={product}
                    />
                  ))}
              </div> */}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndustryDetails;
