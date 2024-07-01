"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const home = useRef<any>(null);
  const supply = useRef<any>(null);
  const verify = useRef<any>(null);
  const scrollToElement = (key: number) => {
    if (key === 1) {
      if (home.current) {
        home.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (key === 2) {
      if (supply.current) {
        supply.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (key === 3) {
      if (verify.current) {
        verify.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const [search, setSearch] = useState("");
  const [responseData, setResponseData] = useState<any>(null);

  const getDetails = async () => {
    // const response = await fetch(`http://localhost:3000/api/searchProduct`, {
    const response = await fetch(
      `https://mr-energy-two.vercel.app/api/searchProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: search }),
      }
    );

    const resData = await response.json();
    setResponseData(resData);
  };

  return (
    <>
    <div className="sticky top-0">
      <nav className="font-sans sticky flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-20 bg-black shadow sm:items-baseline w-full">
        <div
          className="mb-2 sm:mb-0 flex flex-row
  "
        >
          <div className="h-10 w-32 self-center mr-2">
            <img className="h-10 w-32 self-center" src="/logo.png" />
          </div>
          
        </div>

        <div className="sm:mb-0 self-center flex">
          <p
            onClick={() => scrollToElement(1)}
            className="text-md no-underline text-white hover:text-blue-dark ml-2 cursor-pointer px-1"
          >
            Home
          </p>
          <p
            onClick={() => scrollToElement(2)}
            className="text-md no-underline text-white hover:text-blue-dark ml-2 px-1 cursor-pointer"
          >
            Supplement
          </p>
          <p className="text-md no-underline text-white hover:text-blue-dark ml-2 px-1 cursor-pointer">
            SARMS
          </p>
          <p
            onClick={() => scrollToElement(3)}
            className="text-md no-underline text-white hover:text-blue-dark ml-2 px-1 cursor-pointer"
          >
            Verify
          </p>
        </div>
      </nav>
    </div>
      <div
        ref={home}
        className="w-full h-[90vh] flex justify-center items-center"
      >
        <Image
          src={`/protein.jpeg`}
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
      <div
        ref={supply}
        className="w-full h-[90vh] flex justify-center items-center"
      >
        <Image
          src={`/nutrition1.png`}
          alt="Picture of the author"
          width="0"
          height="0"
          sizes="50vw"
          className="w-[50vw] h-[50vw] mt-10"
        />
      </div>
      <div
        ref={verify}
        className="w-full h-[100vh] flex justify-center items-center"
      >
        {!responseData && (
          <div>
            <p className="text-white text-center text-2xl">
              Verify Your Products!
            </p>
            <div className="flex justify-center mt-2">
              <input
                onChange={($) => setSearch($?.target?.value)}
                type="text"
                placeholder="Enter product key..."
                className="w-2/3 px-2 py-2 rounded-md rounded-r-none text-black"
              />
              <button
                onClick={() => getDetails()}
                className="text-white bg-gray-500 px-2 rounded-r-md"
              >
                Search
              </button>
            </div>
          </div>
        )}
        {responseData && (
          <div>
            <Player
              autoplay={true}
              loop={true}
              src={
                responseData?.status
                  ? responseData?.data?.isUsed == 0
                    ? "/animations/success-1.json"
                    : "/animations/warning.json"
                  : "/animations/failure.json"
              }
              style={{ height: "200px", width: "200px" }}
            ></Player>
            <p
              className="text-center text-lg"
              style={{
                color: responseData?.status
                  ? responseData?.data?.isUsed == 0
                    ? "green"
                    : "yellow"
                  : "red",
              }}
            >
              {responseData?.status
                ? responseData?.data?.isUsed == 0
                  ? "Successfully Verified"
                  : "Already Registered"
                : "Invalid Key"}
            </p>
            <div className="flex justify-center w-full">
              <button
                onClick={() => setResponseData(null)}
                className="text-black bg-white mt-5 px-2 rounded-md "
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
