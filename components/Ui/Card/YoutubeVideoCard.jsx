import Image from "next/image";
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Loader from "../common/loader/Loader";
import ProductNotFound from "../common/error/ProductNotFound";
import { getAllVideos } from "../../../fetchers/universalFetch";
import { useQuery } from "@tanstack/react-query";
const YoutubeVideoCard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["videos"],
    queryFn: getAllVideos,
  });
  const youtubeData = data?.data?.video;
  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="No Videos Found" />;
  return (
    <>
      {youtubeData?.map((video, index) => (
        <ErrorBoundary>
          <div
            key={index}
            className=" rounded-lg bg-white border-[#bebebe7a]  w-full border-2 p-3"
          >
            <Image
              src="/assets/images/background/YouTube.png"
              width={90}
              height={20}
              alt="Youtube"
            />
            <section className="relative rounded-lg mx-auto mt-2 flex flex-col items-start h-64 max-w-[550px] min-w-full  justify-evenly text-start text-white">
              <iframe
                className="w-full h-full"
                src={video?.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </section>
            <h2 className="text-primary font-bold   my-2">{video?.title}</h2>
          </div>
        </ErrorBoundary>
      ))}
    </>
  );
};

export default YoutubeVideoCard;
