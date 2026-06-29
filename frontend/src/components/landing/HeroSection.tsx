"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
const router = useRouter();
  return (

    <section

      id="home"

      className="
      min-h-[90vh]
      bg-gradient-to-br
      from-white
      via-emerald-50
      to-blue-50
      flex
      items-center
      "

    >

      <div
        className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        gap-16
        px-8
        items-center
        "
      >

        {/* Left */}

        <div>

          <h1
            className="
            text-6xl
            font-extrabold
            leading-tight
            "
          >

            <span className="italic text-4x1 text-emerald-600">

              Your Very Own

            </span>

            <br />

            AI-Powered

            <br />

            Developer Journal

          </h1>

          <p
            className="
            mt-8
            text-xl
            text-gray-600
            leading-8
            "
          >

            A full-stack AI-powered journaling platform

            that helps software developers document

            daily work, retrieve previous knowledge

            using RAG, and generate professional

            insights.

          </p>

          <div
            className="
            mt-10
            flex
            gap-5
            "
          >

            <button
  onClick={() => router.push("/login")}
  className="
  bg-[#EB878C]
  hover:bg-[#EB878C]
  text-[#1B2021]
  px-8
  py-4
  rounded-xl
  shadow-lg
  hover:scale-105
  transition-all
  duration-300
  "
>
  Start Your Journal
</button>

            <button
  onClick={() => {

    document
      .getElementById("features")
      ?.scrollIntoView({

        behavior: "smooth"

      });

  }}
  className="
  border
  border-gray-300
  px-8
  py-4
  rounded-xl
  hover:bg-white
  hover:scale-105
  transition-all
  duration-300
  "
>
  Learn More
</button>

          </div>

        </div>

        {/* Right */}

        <div>

          <Image

            src="/hero.png"

            alt="Hero"

            width={700}

            height={700}

            className="
            rounded-3xl
            shadow-2xl
            "

          />

        </div>

      </div>

    </section>

  );

}