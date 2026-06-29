"use client";

import { useEffect, useState } from "react";

import {
  getActivityCalendar
} from "@/services/analyticsService";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

export default function JournalCalendar() {

  const [journalDays, setJournalDays] =
    useState<string[]>([]);

  const [loginDays, setLoginDays] =
    useState<string[]>([]);

  useEffect(() => {

    loadActivity();

  }, []);

  const loadActivity = async () => {

    const data =
      await getActivityCalendar();

    setJournalDays(
      data.journal_days
    );

    setLoginDays(
      data.login_days
    );

  };

  return (

    <div
  className="
  bg-white
  rounded-2xl
  shadow-lg
  p-8
  w-full
  "
>

      <h4
  className="
  text-3xl
  font-bold
  text-[#89023E]
  mb-8
  "
>
  Activity Calendar
</h4>

      <div className="w-full">

  <Calendar

        tileContent={({ date }) => {

          const formatted =
  `${date.getFullYear()}-${
    String(date.getMonth() + 1).padStart(2, "0")
  }-${
    String(date.getDate()).padStart(2, "0")
  }`;

          const hasJournal =
            journalDays.includes(
              formatted
            );

          const hasLogin =
            loginDays.includes(
              formatted
            );

          return (

            <div
              className="
absolute
bottom-2
left-0
right-0
flex
justify-center
gap-1
"
            >

              {

                hasJournal && (

                  <div
                    className="
                    w-2
                    h-2
                    rounded-full
                    bg-green-500
                    "
                  />

                )

              }

              {

                hasLogin && (

                  <div
                    className="
                    w-2
                    h-2
                    rounded-full
                    bg-yellow-400
                    "
                  />

                )

              }

            </div>

          );

        }}

      /></div>
      

      {/* Legend */}

      <div
  className="
  flex
  justify-center
  gap-10
  mt-8
  text-sm
  "
>

  <div
    className="
    flex
    items-center
    gap-2
    "
  >
    <div
      className="
      w-3
      h-3
      rounded-full
      bg-green-500
      "
    />
    <span>
      Journal Created
    </span>
  </div>

  <div
    className="
    flex
    items-center
    gap-2
    "
  >
    <div
      className="
      w-3
      h-3
      rounded-full
      bg-yellow-400
      "
    />
    <span>
      Logged In
    </span>
  </div>

</div>
</div>
    

  );
}