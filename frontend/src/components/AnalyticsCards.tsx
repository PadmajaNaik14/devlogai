
type AnalyticsCardsProps = {
  stats: {
    total_journals: number;
    current_streak: number;
    longest_streak: number;
    ai_optimizations: number;
  };
};
export default function AnalyticsCards({
  stats,
}: AnalyticsCardsProps) {


  return (

    <div className="grid grid-cols-4 gap-4">

      <div className="border p-4 rounded">
        <h2>Total Journals</h2>
        <p className="text-2xl font-bold">
  {stats.total_journals}
</p>
      </div>

      <div className="border p-4 rounded">
        <h2>Current Streak</h2>
        <p className="text-2xl font-bold">
          {stats.current_streak}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h2>Longest Streak</h2>
        <p className="text-2xl font-bold">
          {stats.longest_streak}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h2>AI Optimizations</h2>
        <p className="text-2xl font-bold">
          {stats.ai_optimizations}
        </p>
      </div>

    </div>

  );
}