"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/analyticsService";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import JournalEditor from "@/components/JournalEditor";
import AIOutputPanel from "@/components/AIOutputPanel";
import AnalyticsCards from "@/components/AnalyticsCards";
import JournalList from "@/components/JournalList";
import JournalChart from "@/components/JournalChart";
import JournalCalendar from "@/components/JournalCalendar";

export default function Dashboard() {
  const [aiOutput, setAiOutput] = useState("");
  const [stats, setStats] = useState({
  total_journals: 0,
  current_streak: 0,
  longest_streak: 0,
  ai_optimizations: 0
});
const loadStats = async () => {

  const data =
    await getDashboardStats();

  setStats(data);
};
useEffect(() => {

  loadStats();

}, []);

  return (

    <div className="h-screen flex flex-col">

      <Navbar />

      <div className="flex flex-1">

        <div className="w-60 border-r">

          <Sidebar />

        </div>

        <div className="flex-1 flex flex-col">

          <div className="flex flex-1">

            <div className="w-2/3 p-6">

              <JournalEditor setAiOutput={setAiOutput} 
              refreshStats={loadStats}
              />

            </div>

            <div className="w-1/3">

              <AIOutputPanel output={aiOutput} />

            </div>

          </div>

          <div className="border-t p-6">

            <AnalyticsCards stats={stats}/>

          </div>
          

<div className="mt-6">
  <JournalChart />
</div>
<div className="mt-6">
  <JournalCalendar />
</div>
          <div className="border-t p-6">

            <JournalList />

          </div>

        </div>

      </div>

    </div>
  );
}