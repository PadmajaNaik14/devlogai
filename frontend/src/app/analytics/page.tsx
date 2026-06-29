"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import AnalyticsCards from "@/components/AnalyticsCards";
import JournalChart from "@/components/JournalChart";

import {
  getDashboardStats
} from "@/services/analyticsService";

export default function AnalyticsPage() {

  const [stats, setStats] = useState({
    total_journals: 0,
    current_streak: 0,
    longest_streak: 0,
    ai_optimizations: 0
  });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    const data =
      await getDashboardStats();

    setStats(data);

  };

  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}

      <div className="w-60 border-r bg-white">

        <Sidebar />

      </div>

      {/* Main Content */}

      <div className="flex-1 bg-green-50 p-10">

        <h1
          className="
          text-5xl
          font-bold
          text-black
          mb-8
          "
        >
          ANALYTICS
        </h1>

        <AnalyticsCards
          stats={stats}
        />

        <div className="mt-8">

          <JournalChart />

        </div>

      </div>

    </div>

  );
}