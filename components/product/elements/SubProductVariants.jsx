import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//internal imports
import { getAllSubCategory } from "../../../fetchers/universalFetch";
import { Loader, PopOver, ProductNotFound } from "../../Ui";
import ProductSubCategroy from "../../Ui/PopOver/ProductSubCategroy";

const SubProductVariants = (isVisible) => {
  const router = useRouter();
  const { category } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";
  //getting Maincategory product deatils

  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["SubCategorySlider", ProductId],
    queryFn: () => getAllSubCategory(ProductId),
    enabled: !!ProductId,
  });
  //setting the slider products
  const productData = data?.data?.response?.sub_category;

  //defining the API calling state
  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;

  //mapping the data in the slider
  const challengeSplide = productData?.map((product, index) => {
    return (
      <SplideSlide key={`${index}_pro`}>
        <div key={index} className="flex  mb-10 lg:mb-16 relative z-[5]">
          <motion.div className="transition-all max-w-[300px] max-h-[300px] duration-100 ease-in-out hover:scale-105 delay-150 py-4">
            <Link href={`/products/${ProductId}/variants/${product?.id}`}>
              <div className=" shadow-xl rounded-xl">
                <div className="flex flex-col bg-white rounded-t-2xl">
                  <div className=" group flex justify-center items-center rounded-t-xl w-full h-full ">
                    <ProductSubCategroy
                      name={product?.name}
                      id={product?.id}
                      parent="tesing"
                      image={
                        product?.image_1920 && product?.image_1920[0]
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                              product?.image_1920
                                ? product?.image_1920[0]
                                : product?.image_url
                            }`
                          : "/assets/images/products/product2.jpeg"
                      }
                      type="variants"
                    />
                    {/* <div className=" px-2 focus:outline-none mb-3 line-clamp-1 text-center focus:ring-2 rounded-t-xl top-0 h-16 z-10 absolute text-xl font-bold leading-none  text-gray-100 py-4 w-full bg-primary">
                      {product?.display_name}
                    </div> */}
                  </div>
                </div>
                <div className="p-2 py-1 backdrop-blur-md	bg-white text-primary2 rounded-b-lg flex justify-between items-center px-6">
                  <div>
                    <h3 className="text-lg  font-bold hover:underline line-clamp-1 min-h-10 ">
                      {product?.display_name}
                    </h3>
                  </div>
                  <div className="relative z-[2]">
                    <PopOver type="variants" id={product?.id} />
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
        perPage: 10,
        perMove: 5,
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

export default dynamic(() => Promise.resolve(SubProductVariants), {
  ssr: false,
});
