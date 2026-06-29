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

  const cards = [
    {
      title: "Total Journals",
      value: stats.total_journals
    },
    {
      title: "Current Streak",
      value: stats.current_streak
    },
    {
      title: "Longest Streak",
      value: stats.longest_streak
    },
    {
      title: "AI Optimizations",
      value: stats.ai_optimizations
    }
  ];

  return (

    <div className="grid grid-cols-4 gap-4">

      {

        cards.map(
          (card) => (

            <div
              key={card.title}
              className="
              bg-white
              rounded-xl
              shadow-md
              border-t-8
              border-green-300
              p-6
              "
            >

              <h2
                className="
                text-xl
                text-black
                mb-3
                "
              >
                {card.title}
              </h2>

              <p
                className="
                text-5xl
                font-bold
                text-black
                text-center
                "
              >
                {card.value}
              </p>

            </div>

          )
        )

      }

    </div>

  );
}