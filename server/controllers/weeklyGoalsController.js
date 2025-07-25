import WeeklyGoals from "../models/WeeklyGoals.js";
import dotenv from "dotenv";
import { startOfWeek } from "date-fns";
import Income from "../models/Income.js";
import Expenses from "../models/Expenses.js";
import Goals from "../models/Goals.js";
import { OpenAI } from "openai/client.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get weekly goals
const getWeeklyGoals = async (req, res) => {
  try {
    const allWeekly = await WeeklyGoals.find({ user: req.user._id });
    res.status(200).send(allWeekly);
  } catch (error) {
    console.error("Error fetching weekly goals", error);
    res.status(500).json({ error: "Failed to fetch weekly goals" });
  }
};

// Post (create) new weekly goals
const postWeeklyGoals = async (req, res) => {
  console.log("POST /api/weekly-goals/ai-generate hit");
  try {
    const userId = req.user._id;
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

    const existing = await WeeklyGoals.findOne({ user: userId, weekStart });
    if (existing) {
      return res
        .status(200)
        .json({ message: "Goals already exist", data: existing });
    }

    // Gather user financial context
    const allIncome = await Income.find({ user: userId });
    const allExpenses = await Expenses.find({ user: userId });
    const allGoals = await Goals.find({ user: userId });

    const incomeTotal = allIncome.reduce(
      (acc, item) => acc + (item.total || 0),
      0
    );

    const financialContext = `User Profile:
    - Monthly Income: $${incomeTotal.toFixed(2)}
    - Expenses: ${
      allExpenses.length > 0
        ? allExpenses
            .map((e) => `${e.title}: $${e.total.toFixed(2)}`)
            .join(", ")
        : "None"
    }
    - Long-term Goals: ${
      allGoals.length > 0
        ? allGoals
            .map(
              (g) =>
                `${g.title} (current: $${g.currentAmount}, target: $${g.targetAmount}, deadline: ${g.deadline})`
            )
            .join("; ")
        : "None"
    }`;

    // Get structured JSON goals from AI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You're a financial assistant. Based on the user's income, expenses, and goals, generate 3 short-term, realistic weekly financial goals.

Return only valid JSON array like:

[
  {
    "title": "Add $50 to emergency fund",
    "currentAmount": 0,
    "targetAmount": 50
  },
  {
    "title": "Save $20 for groceries",
    "currentAmount": 0,
    "targetAmount": 20
  },
  {
    "title": "Set aside $10 for entertainment",
    "currentAmount": 0,
    "targetAmount": 10
  }
]

DO NOT include any other explanation or text. Only return the JSON array.`,
        },
        { role: "user", content: financialContext },
      ],
      max_tokens: 300,
    });

    const rawContent = aiResponse?.choices[0]?.message?.content;

    let goals;
    try {
      goals = JSON.parse(rawContent);
    } catch (parseErr) {
      console.error("AI response not valid JSON:", rawContent);
      return res
        .status(500)
        .json({ error: "AI did not return valid JSON goals" });
    }

    const newWeeklyGoals = new WeeklyGoals({
      user: userId,
      weekStart,
      goals: goals.map((goal) => {
        // Try to match this AI-generated title to a long-term goal
        const matched = allGoals.find((lg) =>
          goal.title.toLowerCase().includes(lg.title.toLowerCase())
        );

        return {
          title: goal.title,
          currentAmount: goal.currentAmount,
          targetAmount: goal.targetAmount,
          linkedGoalId: matched ? matched._id : null,
        };
      }),
    });

    await newWeeklyGoals.save();
    res.status(201).json(newWeeklyGoals);
  } catch (error) {
    console.error("Failed to generate weekly goals:", error);
    res.status(500).json({ error: "Failed to generate weekly goals" });
  }
};

export { getWeeklyGoals, postWeeklyGoals };
