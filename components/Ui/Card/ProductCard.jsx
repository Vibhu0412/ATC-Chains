import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getAllMainCategory } from "../../../fetchers/universalFetch";
import { Loader, PopOver, ProductNotFound } from "../../Ui";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";

const ProductCard = () => {
  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["SliderProducts"],
    queryFn: getAllMainCategory,
  });
  const productData = data?.data?.response?.primary_products;
  const router = useRouter();

  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;

  const challengeSplide = productData?.map((product, index) => {
    return (
      <SplideSlide key={index}>
        <div className="flex">
          <motion.div
            variants={fadeIn("right", "spring", index * 0.2, 0.75)}
            className="m-4"
          >
            {" "}
            <div className="w-full  bg-white rounded-3xl border border-gra-400 dark:bg-gray-800 dark:border-gray-700">
              <Link href={`/products/${product.id}`}>
                <div className=" p-4 overflow-hidden mx-auto ">
                  <Image
                    className="rounded-3xl object-cover h-[300px] max-w-[400px]  mx-auto"
                    width={400}
                    height={300}
                    src={
                      product?.image_1920 && product?.image_1920
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${
                            product?.image_1920
                              ? product?.image_1920
                              : product?.image_url
                          }`
                        : "/assets/images/products/aluminium-kettenfoerdersystem-4-modular-automation-1380x640_01 3.png"
                    }
                    alt={product?.name}
                  />
                </div>
              </Link>
              <div className="px-5 pb-5">
                <div className="flex gap-2 items-center justify-between text-text-secondary hover:text-text-orange">
                  <h2 className="text-xl  font-bold mb-3 text-text-secondary dark:text-white line-clamp-1">
                    {product?.name}
                  </h2>
                </div>

                <div className="flex items-center justify-between w-96">
                  <span className="text-md font-normal text-text-gray opacity-75 dark:text-white line-clamp-2">
                    {product?.description}
                  </span>
                </div>
              </div>
            </div>
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
      {challengeSplide}
    </Splide>
  );
};

export default ProductCard;
