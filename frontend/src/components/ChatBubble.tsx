type ChatBubbleProps = {

  sender: "user" | "ai";

  text: string;

};

export default function ChatBubble({

  sender,

  text

}: ChatBubbleProps) {

  const isUser = sender === "user";

  return (

    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      } mb-4`}
    >

      <div
        className={`max-w-[70%] rounded-2xl px-5 py-3 shadow

        ${
          isUser
            ? "bg-[#89023E] text-white"
            : "bg-white text-black"
        }`}
      >

        <p className="font-semibold mb-1">

          {isUser ? "You" : "DevLog AI"}

        </p>

        <p>{text}</p>

      </div>

    </div>

  );

}