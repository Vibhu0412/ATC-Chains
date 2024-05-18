import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import dynamic from "next/dynamic";
//internal imports
import { getAllMainCategory } from "../../../fetchers/universalFetch";
import { Loader, PopOver, ProductNotFound } from "../../Ui";
import ProductSubCategroy from "../../Ui/PopOver/ProductSubCategroy";

const SubProducts = (isVisible) => {
  //getting Maincategory product deatils
  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["SliderProducts"],
    queryFn: getAllMainCategory,
  });
  //setting the slider products
  const productData = data?.data?.response?.primary_products;
  //defining the API calling state
  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;

  //mapping the data in the slider
  const challengeSplide = productData?.map((product, index) => {
    return (
      <SplideSlide key={`${index}_pro`}>
        <div key={index} className="flex mb-10 lg:mb-16">
          <motion.div className="transition-all max-w-[300px] max-h-[300px] duration-100 ease-in-out hover:scale-[1.02] delay-150 py-4 ">
            <Link href={`/products/${product?.id}`}>
              <div className=" shadow-xl rounded-xl">
                <div className="flex   flex-col rounded-t-[16px] ">
                  <div className="group flex justify-center items-center rounded-t-xl w-[300px] h-full ">
                    <ProductSubCategroy
                      name={product?.name}
                      id={product?.id}
                      image={
                        product?.image_1920 && product?.image_1920
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                              product?.image_1920
                                ? product?.image_1920
                                : product?.image_url
                            }`
                          : "/assets/images/products/product2.jpeg"
                      }
                      type="subCategory"
                    />
                    {/* <div className=" text-center px-2 focus:outline-none line-clamp-1 h-16 focus:ring-2 rounded-t-xl top-0 z-10 absolute text-xl font-bold leading-none  text-gray-100 py-4 w-full bg-primary">
                      {product?.name}
                    </div> */}
                  </div>
                </div>
                <div className=" py-1 bg-white backdrop-blur-md text-primary2 rounded-b-lg flex justify-between items-center px-6">
                  <h3 className="text-lg max-w-sm text-ellipsis overflow-hidden font-bold hover:underline line-clamp-2  ">
                    {product?.name}
                  </h3>

                  <div className=" relative z-10">
                    <PopOver type="subCategory" id={product?.id} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </SplideSlide>
    );
  });
  return (
    <Splide
      options={{
        rewind: false,
        autoWidth: true,
        perPage: 20,
        perMove: 2,
        pagination: false,
        gap: "1em",
        focus: "center",
        type: "slide",
        easing: "ease",
        arrows: true,
      }}
    >
      {challengeSplide}
    </Splide>
  );
};

export default dynamic(() => Promise.resolve(SubProducts), { ssr: false });
