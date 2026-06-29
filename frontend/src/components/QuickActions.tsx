"use client";

type QuickActionsProps = {

  setMessage: (
    message: string
  ) => void;

};

const actions = [

  {

    title: "Professional Summary",

    prompt:
      "Generate a professional summary of today's journal."

  },

  {

    title: "Resume Bullets",

    prompt:
      "Generate ATS-friendly resume bullet points from today's journal."

  },

  {

    title: "LinkedIn Post",

    prompt:
      "Generate a professional LinkedIn post from today's journal."

  },

  {

    title: "Developer Insights",

    prompt:
      "Analyze today's journal and provide developer insights."

  },

  {

    title: "Explain Concepts",

    prompt:
      "Explain the technical concepts used in today's journal."

  },

  {

    title: "Next Steps",

    prompt:
      "Suggest the next learning steps based on today's journal."

  }

];

export default function QuickActions({

  setMessage

}: QuickActionsProps) {

  return (

    <div className="grid grid-cols-2 gap-3">

      {

        actions.map(

          (

            action,

            index

          ) => (

            <button

              key={index}

              onClick={() =>
                setMessage(
                  action.prompt
                )
              }

              className="
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              hover:bg-[#F5CEE1]
              hover:border-[#EA638C]
              transition-all
              duration-200
              px-4
              py-3
              text-sm
              font-medium
              text-gray-800
              "

            >

              {action.title}

            </button>

          )

        )

      }

    </div>

  );

}