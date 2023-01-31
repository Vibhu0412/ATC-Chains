import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllClients } from "../../../fetchers/universalFetch";
import { Loader, ProductNotFound } from "../../Ui";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const PopOverProductSlider = () => {
  const { isLoading, isError, data, error, isIdle, onSuccess } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
  });
  const clients = data?.data?.clients;

  if (isLoading) return <Loader />;
  if (isError) return <ProductNotFound text="Product Not Found" />;

  const clientsList = clients?.map((client, index) => {
    return (
      <SplideSlide>
        <Image
          key={index}
          width={200}
          height={200}
          src={
            client?.image_url
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}${client?.image_url}`
              : ""
          }
          alt={client?.name}
          className="mx-2 rounded-lg  max-h-32"
        />
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
      {clientsList}
    </Splide>
  );
};

export default PopOverProductSlider;
