"use client";

import { useState } from "react";
import { createJournal } from "@/services/journalService";
import { optimizeJournal } from "@/services/aiService";
import toast from "react-hot-toast";

type JournalEditorProps = {
  setAiOutput: (output: string) => void;
  refreshStats: () => void;
};

export default function JournalEditor({
  setAiOutput,
  refreshStats,
}: JournalEditorProps) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const wordCount =
    content.trim() === ""
      ? 0
      : content.trim().split(/\s+/).length;

  const saveJournal = async () => {
    try {
      await createJournal({
        title,
        content,
      });

      toast.success("Journal Saved");
      refreshStats();

      setTitle("");
      setContent("");

    } catch {
      toast.error("Failed To Save");
    }
  };

  const handleOptimize = async () => {
    try {

      const result = await optimizeJournal(
        content
      );

      

      setAiOutput(
        result.optimized
      );
      refreshStats();

      toast.success("Journal Optimized");

    } catch(error: any) {
      console.log(error);

      toast.error(
        "AI Optimization Failed"
      );
    }
  };

  return (
    <div className="h-full flex flex-col">

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Journal Title"
        className="border p-3 mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write today's journal..."
        className="flex-1 border p-3"
      />

      <p className="mt-2 text-gray-500">
        Words: {wordCount}
      </p>

      <button
        onClick={saveJournal}
        className="mt-4 bg-black text-white p-3 rounded"
      >
        Save Journal
      </button>

      <button
        className="mt-2 border p-3 rounded w-full"
        onClick={handleOptimize}
      >
        Optimize Journal
      </button>

    </div>
  );
}