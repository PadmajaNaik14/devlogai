"use client";

import Link from "next/link";

export default function LandingNavbar() {

  return (

    <nav
      className="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-md
      shadow-sm
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        h-20
        flex
        items-center
        justify-between
        "
      >

        {/* Logo */}

        <h1
          className="
          text-4xl
          font-extrabold
          text-[#89023E]
          "
        >

          DevLog AI

        </h1>

        {/* Navigation */}

        <div
          className="
          hidden
          md:flex
          gap-10
          text-gray-600
          "
        >

          <a href="#home">

            Home

          </a>

          <a href="#features">

            Features

          </a>

          <a href="#tech">

            Tech Stack

          </a>

          <a href="#contact">

            Contact

          </a>

        </div>

        {/* Buttons */}

        <div
          className="
          flex
          gap-3
          "
        >

          <Link
            href="/login"
          >

            <button
              className="
              px-5
              py-2
              rounded-xl
              border
              hover:bg-gray-100
              transition
              "
            >

              Login

            </button>

          </Link>

          <Link
            href="/register"
          >

            <button
              className="
              px-5
              py-2
              rounded-xl
              bg-[#89023E]
              hover:bg-[#EA638C]
              text-white
              transition
              "
            >

              Sign Up

            </button>

          </Link>

        </div>

      </div>

    </nav>

  );

}