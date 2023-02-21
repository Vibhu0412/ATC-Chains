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
        <div key={index} className="flex">
          <motion.div className="transition-all  max-w-md duration-100 ease-in-out delay-150 py-4 ">
            <Link href={`/products/${product?.id}`}>
              <div className="border border-primary rounded-xl">
                <div className="flex flex-col bg-primary/40 rounded-t-xl ">
                  <div className="group flex justify-center items-center rounded-t-xl w-full h-full ">
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
                    <div className=" px-2 focus:outline-none line-clamp-3 focus:ring-2 rounded-t-xl top-0 z-10 absolute text-xl font-bold leading-none  text-gray-100 py-4 w-full bg-primary">
                      {product?.name}
                    </div>
                  </div>
                </div>
                <div className="p-2 py-1 bg-primary/40 text-white rounded-b-lg flex justify-between items-center px-6">
                  <h3 className="text-lg  font-bold hover:underline line-clamp-2 min-h-10 ">
                    Click Here For more Detail
                  </h3>

                  <div className=" relative z-10">
                    <PopOver type="SubCategory" id={product?.id} />
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
