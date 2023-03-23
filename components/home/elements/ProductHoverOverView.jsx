import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllMainCategory } from "../../../fetchers/universalFetch";
import { parts } from "../../../utils/data";
import PartsPopOver from "../../Ui/PopOver/PartsPopOver";

const ProductHoverOverView = () => {
  //getting Maincategory product deatils
  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["productOverview"],
    queryFn: getAllMainCategory,
  });
  //setting the slider products
  const productData = data?.data?.response?.primary_products;
  const [pro, setPro] = useState([]);
  const filterProductOverview = () => {
    productData &&
      productData.filter((product) => {
        console.log("testing ---> ", productData);
        console.log("parts ---> ", parts);
        return parts.some(({ title, top, left }) => {
          console.log("product in loop --> ", product);
          if (title === product.static_label) {
            setPro((prev) => [...prev, { top, left, ...product }]);
          }

          // if (product.pro.match(title)) {
          //   setPro((prev) => [...prev, { top, left, ...product }]);
          // }
        });
      });
  };

  useEffect(() => {
    filterProductOverview();
  }, [productData]);

  useEffect(() => {
    console.log("pro ---> ", pro);
  }, [pro]);

  return (
    <div className="relative -z-[0] flex flex-wrap-reverse">
      <Image
        className="w-full h-full"
        src="/assets/icons/svg/Main-Poster.svg"
        width={500}
        height={500}
      />
      {pro?.map((part, i) => (
        <div
          key={i}
          style={{
            top: part.top,
            left: part.left,

            opacity: part.opacity,
          }}
          className=" rounded-full absolute"
        >
          <PartsPopOver title={part.name} id={part.id} />
        </div>
      ))}
    </div>
  );
};

export default ProductHoverOverView;
