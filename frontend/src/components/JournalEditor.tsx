"use client";

import { useState } from "react";
import { createJournal } from "@/services/journalService";
import toast from "react-hot-toast";

type JournalEditorProps = {
  refreshStats?: () => void;
};

export default function JournalEditor({
  refreshStats,
}: JournalEditorProps) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const wordCount =
    content.trim() === ""
      ? 0
      : content.trim().split(/\s+/).length;

  const saveJournal = async () => {

    if (!title.trim() || !content.trim()) {

      toast.error(
        "Please enter a title and journal content."
      );

      return;

    }

    try {

      setSaving(true);

      await createJournal({
        title,
        content,
      });

      toast.success("Journal Saved!");

      refreshStats?.();

      setTitle("");
      setContent("");

    }

    catch {

      toast.error(
        "Failed To Save"
      );

    }

    finally {

      setSaving(false);

    }

  };

  return (

    <div className="flex flex-col h-full justify-between">

      <div>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Journal Title"
          className="
          w-full
          rounded-xl
          border
          border-gray-300
          p-4
          text-lg
          text-black
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          mb-5
          "
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="Write today's journal..."
          className="
          w-full
          h-40
          rounded-xl
          border
          border-gray-300
          p-4
          text-black
          placeholder-gray-400
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          "
        />

      </div>

      <div className="mt-5">

        <div className="flex justify-between items-center">

          <p className="text-gray-500">

            {wordCount} words

          </p>

          <button

            onClick={saveJournal}

            disabled={saving}

            className="
            bg-green-600
            hover:bg-green-700
            active:scale-95
            active:shadow-inner
            transition-all
            duration-150
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            shadow-md
            "

          >

            {

              saving

                ?

                "Saving..."

                :

                "Save Journal"

            }

          </button>

        </div>

      </div>

    </div>

  );

}