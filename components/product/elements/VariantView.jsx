import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
//internal imports
import { CubeIcon2 } from "../../../public/assets/icons/icons";

const VariantView = ({ data, currentPage, index }) => {
  const router = useRouter();
  const { category, variantId } = router.query;

  const mainCategory = parseInt(category);
  const subCategoryId = parseInt(variantId);

  //setting the product router url
  const productUrl =
    currentPage === "MainCategory"
      ? `/products/${data?.id}`
      : currentPage === "SubCategory"
      ? `/products/${mainCategory}/variants/${data?.id}`
      : currentPage === "VariantsId"
      ? `/products/${mainCategory}/variants/${subCategoryId}/product/${data?.id}`
      : "";

  return (
    <>
      {/* {index % 2 === 0 ? ( */}
      <Link href={productUrl}>
        <div className="lg:flex gap-4 block p-4 bg-[#EAEAEA] rounded-[20px] items-center">
          <div className="w-full rounded-l-lg  ">
            <Image
              className="mx-auto shadow-md w-[300px] max-h-[300px] min-h-[300px] rounded-[30px] "
              src={
                data?.image_url
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${data?.image_url}`
                  : "/assets/images/products/productImageNotFound.jpg"
              }
              width={400}
              height={300}
              alt="product image"
            />
          </div>
          <div className="cusros-pointer rounded-lg overflow-hidden mx-auto w-full py-4 px-4 pr-16 text-primary2">
            <div className="pb-4">
              <h1 className="font-bold text-lg  line-clamp-2">
                {data?.product_name}
              </h1>
            </div>

            <div className="grid grid-cols-2 w-full  gap-3">
              {data?.product_specification &&
                data?.product_specification.slice(0, 4).map((item, index) => (
                  <div className="flex gap-4 items-center w-full" key={index}>
                    <div className="bg-primary2 p-3 hidden lg:block rounded-lg">
                      <CubeIcon2 />
                    </div>
                    <div>
                      <h5>{item.name && item?.name?.split(":")[0]}</h5>
                      <p className="text-[#666666]">
                        {item?.name && item?.name
                          ? item?.name?.split(":")[1]
                          : "No data"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Link>
      {/* // ) : (
      //   <Link href={productUrl}>
      //     <div className="flex rounded-lg ">
      //       <div className="cursor-pointer variant-bg-right rounded-lg overflow-hidden mx-auto w-full py-4 px-4 pl-16 text-white">
      //         <div className="pb-4 ">
      //           <h1 className="font-bold pl-3 text-lg line-clamp-2">
      //             {data?.product_name}
      //           </h1>
      //         </div>

      //         <div className="grid grid-cols-2 w-full  gap-3">
      //           {data?.weight && (
      //             <div className="flex gap-4 items-center w-full">
      //               <div className="bg-white p-3 hidden lg:block rounded-lg">
      //                 <CubeIcon />
      //               </div>
      //               <div>
      //                 <h5>Height</h5>
      //                 <p>{data?.height}</p>
      //                 <p></p>
      //               </div>
      //             </div>
      //           )}
      //           {data?.weight && (
      //             <div className="flex gap-4 items-center w-full">
      //               <div className="bg-white hidden lg:block p-3 rounded-lg">
      //                 <CubeIcon />
      //               </div>
      //               <div>
      //                 <h5>Weight</h5>
      //                 <p>{data?.weight}</p>
      //                 <p></p>
      //               </div>
      //             </div>
      //           )}
      //           {data?.color_custom && (
      //             <div className="flex gap-4">
      //               <div className="flex gap-4 items-center w-full">
      //                 <div className="bg-white hidden lg:block p-3 rounded-lg">
      //                   <CubeIcon />
      //                 </div>
      //                 <div>
      //                   <h5>Colour</h5>
      //                   <p>{data?.color_custom}</p>
      //                   <p></p>
      //                 </div>
      //               </div>
      //             </div>
      //           )}
      //         </div>
      //       </div>

      //       <div className=" bg-white w-full rounded-r-lg mx-auto ">
      //         <Image
      //           className="mx-auto p-2 w-[300px] h-[300px] "
      //           src={
      //             data?.image_url
      //               ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${data?.image_url}`
      //               : "/assets/images/products/productImageNotFound.jpg"
      //           }
      //           width={400}
      //           height={300}
      //           alt="product image"
      //         />
      //       </div>
      //     </div>
      //   </Link>
      // )} */}
    </>
  );
};

export default VariantView;
