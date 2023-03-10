import { useMutation } from "@tanstack/react-query";
import { Alert, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { conactForm } from "../../../fetchers/universalFetch";
import { CallingIcon, HomeIcon } from "../../../public/assets/icons/icons";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Toaster from "../Toast/Toaster";

const ContactForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [formdata, setFormData] = useState();
  //submitting the form data and getting data results
  const { mutate, isLoading, isError, isSuccess, status, data } = useMutation({
    mutationFn: (formdata) => {
      return conactForm(formdata);
    },
  });
  //contact from data
  const contactFormDataHandle = (data) => {
    setFormData(data);
    mutate(data);
  };
  //after form submit response
  useEffect(() => {
    if (data?.status === 200) {
      Toaster.fire({
        icon: "success",
        title: data?.data?.result || data?.data?.error?.message,
      });
    }
    reset();
  }, [isSuccess]);

  return (
    <ErrorBoundary>
      <div className=" lg:-mt-36 md:mt-20 mt-0 mb-20 contact-section-bg  block pt-32 lg:pt-80 md:block lg:flex gap-5 items-center justify-center ">
        <div className="w-full  items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <div className="absolute p-6 m-[140px] hidden lg:block  lg:mt-[550px] 2xl:mt-[620px]  bg-white rounded-[30px] flex labelChips">
              <div className="flex gap-4 items-center  justify-center">
                <span className="bg-purple-700/20 p-2 rounded-xl ring-purple-500 ring-2">
                  <p className="bg-[#583FBC] p-2 text-white rounded-xl">
                    <HomeIcon />
                  </p>
                </span>
                <p className="font-bold text-text-primary  h-[34px] md:h-[60px] w-[250px] md:w-[250px]">
                  22, Kalyannagar Society, O/s Shahpur Gate, Shahpur, Ahmedabad
                  - 380004
                </p>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7343.257677229065!2d72.57585897692887!3d23.03739633978203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1675669203787!5m2!1sen!2sin"
              className=" rounded-3xl w-full lg:w-[70vh] h-full lg:h-[75vh] hidden lg:block "
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className=" w-full px-6">
          <div className="">
            <p className="text-sm font-bold text-secondary">
              BOOK THE PRODUCTS
            </p>
            <div className="flex lg:flex sm pt-4 text-3xl lg:text-5xl">
              <p className=" text-secondary  font-bold">ATC Chain </p>
              <p className="pl-2  text-[#1B1C57] font-bold">Products</p>
            </div>

            <p className="text-md pt-5 text-text-gray">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual{" "}
            </p>
          </div>

          <div>
            <form
              className="mt-16 lg:mr-20  mx-0"
              onSubmit={handleSubmit(contactFormDataHandle)}
            >
              <div className="grid gap-4 mb-8 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
                <div>
                  <p className="">NAME</p>
                  <input
                    {...register("name", {
                      required: "Please enter your name",
                      maxLength: 100,
                    })}
                    type="text"
                    placeholder="Enter your name.."
                    className="rounded-xl h-14 w-full focus:ring-primary flex mt-3 border-gray-200   "
                  ></input>
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div>
                  <p>EMAIL ADDRESS</p>
                  <input
                    {...register("email_from", {
                      required: "Please enter your email",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email",
                      },
                    })}
                    type="text"
                    placeholder="Enter your email"
                    className="rounded-xl h-14 mt-3 focus:ring-primary  border-gray-200 w-full"
                  ></input>
                  {errors.email_from && (
                    <span className="text-red-500">
                      {errors.email_from.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-4 mb-8 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
                <div>
                  <p>PHONE NO.</p>
                  <input
                    {...register("phone", {
                      required: "Please enter your phone no.",
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: "Enter a valid phone no.",
                      },
                      valueAsNumber: true,
                    })}
                    maxLength="10"
                    type="number"
                    placeholder="Enter your phone no."
                    className="rounded-xl h-14 mt-3 focus:ring-primary  border-gray-200 w-full"
                  ></input>
                  {errors.phone && (
                    <span className="text-red-500">{errors.phone.message}</span>
                  )}
                </div>
                <div>
                  <p className="">COMPANY NAME</p>
                  <input
                    {...register("partner_name", {
                      required: "Please enter your company name",
                      maxLength: 100,
                    })}
                    type="text"
                    placeholder="Enter your company name."
                    className="rounded-xl h-14 w-full focus:ring-primary flex mt-3 border-gray-200   "
                  ></input>
                  {errors.partner_name && (
                    <span className="text-red-500">
                      {errors.partner_name.message}
                    </span>
                  )}
                </div>
              </div>
              <p className="">MESSAGES</p>
              <textarea
                {...register("description", {
                  required: "Write something",
                  maxLength: 5000,
                })}
                type="text"
                rows={6}
                placeholder="Enter your messages.."
                className="rounded-lg w-full  focus:ring-primary border-gray-200"
              ></textarea>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
              <div className="flex items-center my-8">
                <div className="w-full hidden lg:block">
                  <div className="py-4 mt-lg w-full  rounded-[30px] flex labelChips">
                    <span className="self-center  p-2 bg-purple-600/20 rounded-xl border-2 border-purple-300">
                      <p className="p-2 bg-purple-700 rounded-xl">
                        <CallingIcon />
                      </p>
                    </span>
                    <div>
                      <p className="pt-2 ml-2 text-purple-800 font-bold">
                        Mobile Number
                      </p>
                      <a className="ml-2" href="tel:+919023725674">
                        +91 90237-25674
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-orange-500 w-full  text-white rounded-lg p-[13.5px]"
                  >
                    {isLoading ? "loading..." : "send Inquiry"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ContactForm;
