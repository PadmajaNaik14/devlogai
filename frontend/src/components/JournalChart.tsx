"use client";
import { useEffect, useState } from "react";
import {
  getMonthlyCount
} from "@/services/analyticsService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function JournalChart() {
  const [data, setData] = useState([]);
  useEffect(() => {

  loadData();

}, []);
const loadData = async () => {

  const result =
    await getMonthlyCount();

  setData(result);
};
  return (
    <div
  className="
  bg-white
  rounded-xl
  shadow-md
  p-6
  "
>

      <h2
  className="
  text-2xl
  font-bold
  text-black
  mb-6
  "
>
  Monthly Journal Activity
</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="journals" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}