type AIOutputPanelProps = {
  output: string;
};

export default function AIOutputPanel({
  output,
}: AIOutputPanelProps) {

  return (

    <div className="h-full border-l p-4">

      <h2 className="text-xl font-bold mb-4">
        AI Optimization
      </h2>

      <div className="border rounded p-4 h-[500px] overflow-y-auto">

        <h3 className="font-semibold">
          AI Output
        </h3>

        <p className="whitespace-pre-wrap mt-4">

          {output || "Optimized journal content will appear here."}

        </p>

      </div>

    </div>

  );
}