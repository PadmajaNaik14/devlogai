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
    <div className="border rounded p-4">

      <h2 className="font-bold mb-4">
        Journal Activity
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