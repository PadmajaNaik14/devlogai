import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

type Message = {
  sender: "user" | "ai";
  text: string;
};

type AIChatProps = {
  messages: Message[];
};

export default function AIChat({
  messages
}: AIChatProps) {

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  return (

    <div
      className="
      h-full
      overflow-y-auto
      px-6
      py-4
      "
    >

      {

        messages.length === 0 ? (

          <div
            className="
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-center
            "
          >

            <div className="text-6xl mb-5">

              🤖

            </div>

            <h2 className="text-3xl font-bold">

              DevLog AI

            </h2>

            <p className="text-gray-500 mt-3 max-w-sm">

              Ask anything about your journals,
              software development,
              interview preparation,
              resume building
              or career growth.

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {

              messages.map(

                (message, index) => (

                  <ChatBubble

                    key={index}

                    sender={message.sender}

                    text={message.text}

                  />

                )

              )

            }

            <div ref={bottomRef} />

          </div>

        )

      }

    </div>

  );

}