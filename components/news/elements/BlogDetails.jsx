import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { getBlogDetails } from "../../../fetchers/universalFetch";
import { ClockIcon } from "../../../public/assets/icons/icons";

const BlogDetails = () => {
  const router = useRouter();
  const { blogId } = router.query;
  const BId = parseInt(blogId);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["blogDetails", BId],
    queryFn: () => getBlogDetails(BId),
    enabled: !!BId,
  });
  const blogData = data?.data?.blog;

  return (
    <main class="my-28 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
      <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article class="mx-auto w-full max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div className=" block gap-8 lg:flex">
            <div className="">
              <header class="mb-4 lg:mb-6 not-format">
                <h1 class="mb-4 text-3xl font-extrabold leading-tight text-primary lg:mb-6 lg:text-4xl dark:text-white">
                  {blogData?.name}
                </h1>
              </header>
              <h2>{blogData?.subtitle}</h2>
              <h5>{blogData?.website_meta_title}</h5>
              <p>{blogData?.website_meta_description}</p>

              <div className=" my-2 flex items-center gap-3">
                <ClockIcon /> {moment(blogData?.create_date).format("h:mm")}
                {" | "}
                {moment(blogData?.create_date).format("MMM Do YYYY")}
              </div>
              {blogData?.type === "event" ? (
                <span className="font-semibold ">
                  Event Date:{" "}
                  {moment(blogData?.start_date).format("MMM Do YYYY")} {" | "}{" "}
                  {moment(blogData?.end_date).format("MMM Do YYYY")}
                </span>
              ) : (
                ""
              )}
            </div>

            <figure className="py-4 w-full ">
              <img
                className="lg:max-w-lg max-w-md mx-auto "
                src={
                  blogData?.image_url
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${blogData?.image_url}`
                    : "/assets/images/blogs/blog-1.png"
                }
                alt={blogData?.name}
              />
            </figure>
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogDetails;
