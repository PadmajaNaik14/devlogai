import Image from "next/image";

const showcases = [

  {

    title: "Dashboard",

    description:
      "Write journals and interact with DevLog AI from a unified workspace.",

    image: "/dashboard.png"

  },

  {

    title: "AI Assistant",

    description:
      "Chat with an AI assistant that uses Retrieval-Augmented Generation (RAG).",

    image: "/chat.png"

  },

  {

    title: "Calendar View",

    description:
      "Browse journal history and monitor your writing activity over time.",

    image: "/calendar.png"

  }

];

export default function ShowcaseSection() {

  return (

    <section
      className="
      py-28
      bg-emerald-50
      "
    >

      <div className="max-w-7xl mx-auto px-8">

        <p
          className="
          text-center
          text-[#89023E]
          font-semibold
          "
        >

          Platform Showcase

        </p>

        <h2
          className="
          text-5xl
          font-bold
          text-center
          mt-3
          "
        >

          Explore DevLog AI

        </h2>

        <p
          className="
          text-center
          text-gray-500
          mt-5
          max-w-3xl
          mx-auto
          "
        >

          Everything you need to manage journals,
          chat with AI, and track your development
          journey in one modern dashboard.

        </p>

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          mt-16
          "
        >

          {

            showcases.map(

              (

                item,

                index

              ) => (

                <div

                  key={index}

                  className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  overflow-hidden
                  border
                  border-gray-100
                  hover:-translate-y-3
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  "

                >

                  <Image

                    src={item.image}

                    alt={item.title}

                    width={700}

                    height={500}

                    className="
                    w-full
                    h-64
                    object-cover
                    "

                  />

                  <div className="p-6">

                    <h3
                      className="
                      text-2xl
                      font-bold
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                      text-gray-500
                      mt-3
                      leading-7
                      "
                    >

                      {item.description}

                    </p>

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </section>

  );

}