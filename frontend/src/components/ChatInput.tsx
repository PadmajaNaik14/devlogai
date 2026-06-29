type ChatInputProps = {

  message: string;

  setMessage: (
    value: string
  ) => void;

  onSend: () => void;

};

export default function ChatInput({

  message,

  setMessage,

  onSend

}: ChatInputProps) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-5
      mt-5
      "
    >

      <div className="flex gap-4 items-end">

        <textarea

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          onKeyDown={(e) => {

            if (
              e.key === "Enter"
              &&
              !e.shiftKey
            ) {

              e.preventDefault();

              onSend();

            }

          }}

          placeholder="Ask anything about your journals..."

          rows={2}

          className="
          flex-1
          resize-none
          border
          border-gray-300
          rounded-xl
          px-5
          py-3
          text-black
          placeholder:text-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          "

        />

        <button

          onClick={onSend}

          disabled={!message.trim()}

          className={`
          px-6
          py-3
          rounded-xl
          text-white
          transition

          ${
            message.trim()

            ?

            "bg-green-600 hover:bg-green-700"

            :

            "bg-gray-300 cursor-not-allowed"

          }

          `}
        >

          Send

        </button>

      </div>

    </div>

  );

}