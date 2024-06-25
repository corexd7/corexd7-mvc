"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [responseData, setResponseData] = useState<any>(null);

  const getDetails = async () => {
    // const response = await fetch(`http://localhost:3000/api/searchProduct`, {
      const response = await fetch(`https://mr-energy-two.vercel.app/api/searchProduct`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: search }),
    });

    const resData = await response.json();
    setResponseData(resData);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {!responseData && (
        <div>
          <p className="text-white text-center text-2xl">
            Search Your Products!
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
          src={responseData?.status ?(responseData?.data?.isUsed==0?"/animations/success-1.json":"/animations/warning.json"):"/animations/failure.json"}
          style={{ height: "200px", width: "200px" }}
        ></Player>
        <p className="text-center text-lg" style={{color:responseData?.status?(responseData?.data?.isUsed==0?'green':'yellow'):'red'}}>{responseData?.status?(responseData?.data?.isUsed==0?'Successfully Verified':'Already Registered'):'Invalid Key'}</p>
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
  );
}
