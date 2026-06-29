"use client";

import Sidebar from "@/components/Sidebar";
import JournalCalendar from "@/components/JournalCalendar";

export default function CalendarPage() {

  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}

      <div className="w-60 border-r bg-white">

        <Sidebar />

      </div>

      {/* Main Content */}

      <div className="flex-1 bg-green-50 p-10 overflow-auto">

        <h1
          className="
          text-5xl
          font-bold
          text-black
          mb-8
          "
        >
          CALENDAR
        </h1>

        <JournalCalendar />

      </div>

    </div>

  );
}