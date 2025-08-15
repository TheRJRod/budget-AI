import { useEffect, useState } from "react";
import API from "../api";
import { CheckCircle } from "lucide-react";

const WeeklyGoals = () => {
  const [weeklyGoals, setWeeklyGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // Fetch weekly goals on mount
  useEffect(() => {
    const fetchWeeklyGoals = async () => {
      try {
        const res = await API.get("/weekly-goals");

        // You can access status via res.status, and data directly
        const data = res.data;

        setWeeklyGoals(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setWeeklyGoals(null); // No goals exist for this week yet
        } else {
          setError(err.message || "Error fetching weekly goals");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyGoals();
  }, []);

  // Handle generating weekly goals
  const handleGenerateGoals = async () => {
    setGenerating(true);
    setError("");

    try {
      const res = await API.post("/weekly-goals/ai-generate");
      const data = res.data;

      setWeeklyGoals(data); // depending on controller
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate weekly goals");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <p>Loading weekly goals...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2
        style={{ margin: 0, display: "flex", gap: 10, alignItems: "center" }}
        className="text-2xl font-bold mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-zap h-5 w-5 text-yellow-400"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
        AI Recommendations
      </h2>
      <p class="text-sm text-slate-400 mb-4">
        Personalized insights for your finances
      </p>

      {!weeklyGoals && (
        <div className="mb-4">
          <p className="mb-2 text-white">
            You don’t have weekly goals for this week yet.
          </p>
          <button
            onClick={handleGenerateGoals}
            disabled={generating}
            className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
          >
            {generating ? "Generating..." : "Generate Weekly Goals"}
          </button>
        </div>
      )}

      {weeklyGoals && (
        <div className="space-y-4">
          {weeklyGoals.goals.map((goal, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg relative ${
                goal.completed && "opacity-75"
              } ${
                index == 0
                  ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30"
                  : index == 1
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30"
                  : "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30"
              }`}
            >
              {goal.completed && (
                <CheckCircle className="w-6 h-6 text-green-500 absolute top-1 right-1" />
              )}
              <h3
                className={`text-lg font-medium  ${
                  index == 0
                    ? " text-emerald-100"
                    : index == 1
                    ? "text-blue-100"
                    : "text-yellow-100"
                }`}
              >
                {goal.title}
              </h3>
              <p
                className={`text-sm font-medium ${
                  index == 0
                    ? " text-emerald-200"
                    : index == 1
                    ? "text-blue-200"
                    : "text-yellow-200"
                }`}
              >
                ${goal.currentAmount} / ${goal.targetAmount}
              </p>
              <div className="w-full h-4 bg-gray-200 rounded-full border border-black overflow-hidden">
                <div
                  className={`h-full ${
                    index == 0
                      ? "bg-emerald-600"
                      : index == 1
                      ? "bg-blue-600"
                      : "bg-yellow-600"
                  }`}
                  style={{
                    width: `${Math.min(
                      (goal.currentAmount / goal.targetAmount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyGoals;
