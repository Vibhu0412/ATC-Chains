import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import _ from "lodash";

//internal imports
import {
  getAllMainCategory,
  getAllSubCategory,
  getAllVariants,
  searchProduct,
} from "../../../fetchers/universalFetch";
import {
  ProductPageIcon,
  ProductPageIconTwo,
  RightArrowIcon,
  SearchIcon,
} from "../../../public/assets/icons/icons";
import {
  BreadCrumbs,
  ErrorBoundary,
  Loader,
  ProductDetailCard,
  ProductNotFound,
  SearchProductDetailProductCard,
  Toaster,
} from "../../Ui";
import VariantView from "./VariantView";

const MainProductPage = ({ currentPage }) => {
  const {
    register,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [searchData, setSearchData] = useState();
  const router = useRouter();
  const { category, variantId } = router.query;
  const ProductId = parseInt(category) !== NaN ? parseInt(category) : "";
  const Id = parseInt(variantId) !== NaN ? parseInt(variantId) : "";

  //getting Maincategory product deatils
  const MainCategory = useQuery({
    queryKey: ["MainCategory"],
    queryFn: getAllMainCategory,
    refetchOnWindowFocus: false,
  });

  //getting Subcategory product deatils and depend on ProductId
  const SubCategory = useQuery({
    queryKey: ["SubCategory", ProductId],
    queryFn: () => getAllSubCategory(ProductId),
    enabled: !!ProductId,
  });

  //getting variants product deatils and depend on ProductId and Id
  const variants = useQuery({
    queryKey: ["Variants", Id],
    queryFn: () => getAllVariants({ ProductId, Id }),
    enabled: !!Id,
  });

  let product = [];

  //all product data in the array list
  if (currentPage === "MainCategory") {
    product =
      MainCategory?.data?.data?.response?.primary_products &&
      MainCategory?.data?.data?.response?.primary_products;
  }
  if (currentPage === "SubCategory") {
    product =
      SubCategory?.data?.data?.response?.sub_category &&
      SubCategory?.data?.data?.response?.sub_category;
  }
  if (currentPage === "VariantsId") {
    product = variants?.data?.data?.variants && variants?.data?.data?.variants;
  }
  //search form data calling the in post method using uesquery and passing the search data
  const { mutate, isLoading, isError, isSuccess, status, data } = useMutation({
    mutationFn: (searchData) => {
      return searchProduct(searchData);
    },
  });
  //search result data store in the product vatiable in the array list
  const isSearchDataAvailable = data?.data?.result?.products?.search_products;
  if (isSearchDataAvailable) {
    product =
      data?.data?.result?.products?.search_products &&
      data?.data?.result?.products?.search_products;
  } else {
  }

  const debounced = useDebouncedCallback((value) => {
    search(value);
  }, 800);
  //if
  useEffect(() => {
    if (status === 200) {
      Toaster.fire({
        icon: "success",
        title: data?.message || data?.data?.result,
      });
    }
  }, [isSuccess]);
  //setting the search data in useState variable
  const search = (data_list) => {
    mutate(data_list);
    setSearchData(data_list);
  };
  //API calling state is define
  const loading =
    status || MainCategory?.status || SubCategory?.status || variants?.status;
  const error =
    MainCategory?.isError || SubCategory?.isError || variants?.isError;
  // if (isLoading) return "loading.............";
  //if (error) return <ProductNotFound />;

  return (
    <ErrorBoundary>
      <div className="flex gap-4 items-center lg:px-10 px-1 my-16 justify-between">
        <div className="w-full">
          <div className="mb-2">
            <BreadCrumbs
              currentPage={currentPage}
              child={ProductId}
              subChild={Id}
            />
          </div>

          <h2 className="text-text-orange text-2xl lg:text-3xl font-bold capitalize">
            Showing all <span className="text-text-primary">the Products</span>
          </h2>
        </div>
        <div className="max-w-lg w-full lg:block hidden">
          <form onSubmit={handleSubmit(search)}>
            {" "}
            <div className="bg-white shadow-lg p-2 py-3 rounded-xl border px-5 gap-3 flex items-center justify-center">
              <SearchIcon />
              <input
                type="search"
                className="border-none w-full bg-text-gray/210 rounded-xl focus:ring-none"
                placeholder="Search Product"
                // value={getValues("name")}
                onInput={(e) => {
                  debounced(e.target.value);
                }}
                {...register("name")}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-btn-secondary transition-all ease-in-out duration-200 p-3 rounded-xl"
              >
                <RightArrowIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative ">
        <span className="absolute -z-10 -top-32 -left-10">
          <ProductPageIcon />
        </span>
        <span className="absolute -bottom-28 -z-10 -right-10 flex flex-wrap-reverse">
          <ProductPageIconTwo />
        </span>
        {currentPage === "VariantsId" ? (
          loading == "loading" ? (
            <Loader />
          ) : isSearchDataAvailable ? (
            <div className="grid z-0 grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
              {product &&
                product?.map((product, index) => (
                  <SearchProductDetailProductCard
                    currentPage={currentPage}
                    key={index}
                    index={index}
                    data={product}
                  />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 px-2 lg:grid-cols-2 gap-6">
              {product &&
                product?.map((product, index) => (
                  <VariantView
                    currentPage={currentPage}
                    key={index}
                    index={index}
                    data={product}
                  />
                ))}
            </div>
          )
        ) : (
          <div className="grid z-10 grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-6">
            {loading == "loading" ? (
              <Loader />
            ) : isSearchDataAvailable ? (
              product &&
              product?.map((product, index) => (
                <SearchProductDetailProductCard
                  currentPage={currentPage}
                  key={index}
                  index={index}
                  data={product}
                />
              ))
            ) : (
              product &&
              product?.map((product, index) => (
                <ProductDetailCard
                  currentPage={currentPage}
                  key={index}
                  index={index}
                  data={product}
                />
              ))
            )}
          </div>
        )}
        {product?.length != 0 ? (
          ""
        ) : (
          <ProductNotFound
            text={
              searchData ? `No result found ${searchData?.name}` : `No Products`
            }
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default dynamic(() => Promise.resolve(MainProductPage), { ssr: false });
