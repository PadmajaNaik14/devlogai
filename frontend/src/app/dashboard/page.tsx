"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import JournalEditor from "@/components/JournalEditor";

import AIChat from "@/components/AIChat";
import ChatInput from "@/components/ChatInput";
import QuickActions from "@/components/QuickActions";

import {
  askAI,
  getChatHistory,
  clearChat
} from "@/services/aiStudioService";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function Dashboard() {

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      window.location.href =
        "/login";

      return;

    }

    setLoading(false);

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      const history =
        await getChatHistory();

      const formatted =
        history.map((m: any) => ({

          sender: m.sender,

          text: m.message

        }));

      if (formatted.length === 0) {

        setMessages([
          {
            sender: "ai",
            text:
              "Hello! I'm DevLog AI. Ask me anything about your journals."
          }
        ]);

      }

      else {

        setMessages(formatted);

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  const sendMessage = async () => {

    if (!message.trim()) {

      return;

    }

    const question = message;

    setMessages(previous => [

      ...previous,

      {

        sender: "user",

        text: question

      },

      {

        sender: "ai",

        text: "Thinking..."

      }

    ]);

    setMessage("");

    try {

      const data =
        await askAI(question);

      setMessages(previous => {

        const updated = [...previous];

        updated[
          updated.length - 1
        ] = {

          sender: "ai",

          text: data.answer

        };

        return updated;

      });

    }

    catch {

      setMessages(previous => {

        const updated = [...previous];

        updated[
          updated.length - 1
        ] = {

          sender: "ai",

          text:
            "Something went wrong."

        };

        return updated;

      });

    }

  };

  const handleClear = async () => {

    await clearChat();

    setMessages([

      {

        sender: "ai",

        text:
          "Hello! I'm DevLog AI. Ask me anything about your journals."

      }

    ]);

  };

  if (loading) {

    return null;

  }

  return (

  <div className="min-h-screen flex flex-col">

    <Navbar />

    <div
      className="
      flex
      flex-1
      bg-gradient-to-br
      from-emerald-50
      via-white
      to-green-100
      overflow-hidden
      "
    >

      {/* Sidebar */}

      <div className="w-60 border-r bg-white shadow-sm">

        <Sidebar />

      </div>

      {/* Main Content */}

      <div className="flex-1 flex overflow-auto">

        {/* LEFT PANEL */}

        <div className="w-[45%] p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Journal Card */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-gray-100
            flex
            flex-col
            flex-[3]
            p-6
            "
          >

            <h2 className="text-3xl text-[#89023E] font-bold mb-6">

              ✍️ Journal Editor

            </h2>

            <div className="flex-1 overflow-hidden">

              <JournalEditor />

            </div>

          </div>

          {/* Quick Actions */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-gray-100
            flex-[2]
            p-6
            "
          >

            <h2 className="text-2xl font-bold mb-5 text-[#89023E]">

              ⚡ Quick AI Actions

            </h2>

            <QuickActions
              setMessage={setMessage}
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="w-[55%] p-6 flex">

          <div
  className="
  bg-white
  rounded-3xl
  shadow-xl
  border
  border-gray-100
  flex
  flex-col
  h-[calc(100vh-110px)]
  w-full
  "
>

            {/* Header */}

            <div className="flex justify-between items-center border-b px-6 py-4 flex-shrink-0">

              <div>

                <h2 className="text-3xl text-[#89023E] font-bold">

                  AI Assist

                </h2>

                <p className="text-gray-500 mt-1">

                  Ask anything about your journals.

                </p>

              </div>

              <button

                onClick={handleClear}

                className="
                bg-[#BD0404]
                hover:bg-red-600
                active:scale-95
                transition-all
                duration-150
                text-white
                px-5
                py-2
                rounded-xl
                "

              >

                Clear Chat

              </button>

            </div>

            {/* Chat */}

            <div className="flex-1 min-h-0">

  <AIChat
    messages={messages}
  />

</div>

            {/* Input */}

            <div className="border-t p-5 flex-shrink-0">

              <ChatInput

                message={message}

                setMessage={setMessage}

                onSend={sendMessage}

              />

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

);

}