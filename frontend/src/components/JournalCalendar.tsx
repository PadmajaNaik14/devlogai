"use client";
import { useEffect, useState } from "react";

import {
  getCalendarDays
} from "@/services/analyticsService";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function JournalCalendar() {
  const [days, setDays] =
  useState<number[]>([]);
  useEffect(() => {

  loadDays();

}, []);
const loadDays = async () => {

  const today = new Date();

  const data =
    await getCalendarDays(
      today.getMonth() + 1,
      today.getFullYear()
    );
    console.log(data);

  setDays(
    data.days
  );
};

  return (

    <div className="border rounded p-4">

      <h2 className="font-bold mb-4">

        Journal Calendar

      </h2>

      <Calendar
  tileClassName={({ date }) => {

    if (
      days.includes(
        date.getDate()
      )
    ) {

      return "journal-day";
    }

    return "";
  }}
/>
<style jsx global>{`
  .journal-day {
    background: #22c55e !important;
    color: white !important;
    border-radius: 9999px !important;
  }
`}</style>

    </div>

  );
}