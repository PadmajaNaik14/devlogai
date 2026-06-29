import {

  BookOpen,

  Bot,

  FileText,

  BarChart3,

  Calendar,

  Database

} from "lucide-react";

const features = [

  {

    icon: BookOpen,

    title: "AI Journal",

    description:

      "Write daily development journals with AI assistance."

  },

  {

    icon: Bot,

    title: "AI Chat",

    description:

      "Ask questions using context from your previous journals."

  },

  {

    icon: FileText,

    title: "Resume Builder",

    description:

      "Generate resume bullet points and LinkedIn-ready content."

  },

  {

    icon: BarChart3,

    title: "Analytics",

    description:

      "Track writing streaks and journal activity."

  },

  {

    icon: Calendar,

    title: "Calendar",

    description:

      "Browse all journal entries through an interactive calendar."

  },

  {

    icon: Database,

    title: "RAG Search",

    description:

      "Retrieve relevant journal context using ChromaDB."

  }

];

export default function FeaturesSection() {

  return (

    <section

      id="features"

      className="py-28 bg-white"

    >

      <div className="max-w-7xl mx-auto px-8">

        <p className="text-center text-[#89023E] font-semibold">

          Core Features

        </p>

        <h2

          className="

          text-5xl

          font-bold

          text-center

          mt-3

          "

        >

          Everything You Need

        </h2>

        <p

          className="

          text-center

          text-gray-500

          mt-5

          max-w-2xl

          mx-auto

          "

        >

          DevLog AI combines AI-powered journaling,

          context-aware conversations, semantic search,

          analytics and productivity tools into a single platform.

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

            features.map(

              (

                feature,

                index

              ) => {

                const Icon = feature.icon;

                return (

                  <div
  key={index}
  className="
  overflow-hidden
  rounded-3xl
  shadow-lg
  border
  border-gray-100
  bg-white
  hover:-translate-y-2
  hover:shadow-2xl
  transition-all
  duration-300
  "
>

  {/* TOP HALF */}

  <div
    className="
    h-25
    bg-[#ABE2BD]
    flex
    items-start
    p-6
    gap-4
    "
  >

    <div
      className="
      w-16
      h-14
      rounded-2xl
      bg-white
      flex
      items-center
      justify-center
      shadow-md
      flex-shrink-0
      "
    >

      <Icon

        size={32}

        className="text-emerald-600"

      />

    </div>
    <h3
      className="
      text-2xl
      font-bold
      leading-none
      p-3
      "
    >

      {feature.title}

    </h3>

  </div>

  {/* BOTTOM HALF */}

  <div
    className="
    bg-white
    p-8
    "
  >

    

    <p
      className="
      mt-3
      text-gray-500
      leading-7
      "
    >

      {feature.description}

    </p>

  </div>

</div>

                );

              }

            )

          }

        </div>

      </div>

    </section>

  );

}