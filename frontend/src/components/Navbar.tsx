"use client";

import { useEffect, useState } from "react";

export default function Navbar() {

  const [greeting, setGreeting] =
    useState("");

  useEffect(() => {

    const hour = new Date().getHours();

    if (hour < 12) {

      setGreeting("Good Morning");

    }

    else if (hour < 17) {

      setGreeting("Good Afternoon");

    }

    else {

      setGreeting("Good Evening");

    }

  }, []);

  return (

    <div
      className="
      h-16
      bg-white
      flex
      items-center
      justify-center
      px-8
      "
    >

      <div
        className="
        flex
        items-center
        gap-4
        "
      >

        <h1
          className="
          text-2xl
          font-extrabold
          text-[#89023E]
          "
        >

          DevLog AI

        </h1>

        <span className="text-gray-300">

          |

        </span>

        <p
          className="
          text-gray-600
          text-lg
          "
        >

          {greeting} 👋

        </p>

      </div>

    </div>

  );

}