import { OpenAI } from "openai/client.js";
import dotenv from 'dotenv';
import Income from "../models/Income.js";
import Expenses from "../models/Expenses.js";
import Goals from "../models/Goals.js";

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIResponse = async (req, res) => {
    const {userMessage} = req.body;
    const allIncome = await Income.find({user:req.user._id});
    const allExpenses = await Expenses.find({user:req.user._id});
    const allGoals = await Goals.find({user:req.user._id});

   const formatCurrency = (num) =>
  `$${(num || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

    const incomeTotal = allIncome.reduce((acc, item) => acc + (item.total || 0), 0);

    const financialContext = `User Profile:
    - Income: ${formatCurrency(incomeTotal)}/month
    - Expenses: ${allExpenses.length > 0 ? allExpenses.map((e) => `${e.title} ${formatCurrency(e.total)}`).join(", ") : "None"}
    - Goals: ${allGoals.length > 0 ? allGoals.map((g) => `${g.title} - current: ${formatCurrency(g.currentAmount)} - target: ${formatCurrency(g.targetAmount)} by ${g.deadline}`).join("; ") : "None"}
    `;

    if(!userMessage) {
        return res.status(400).json({error:"User message is required."})
    }

    try {
        console.log("Sending prompt to OpenAI:", userMessage);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                role: "system",
                content: `
            You are a helpful and friendly financial assistant.

            Your job is to give users a clear, personalized **financial action plan** based on their profile.

            Format your response for **easy reading** on web or mobile. Use:
            - Clean sections with emojis and headings (e.g., **💰 Income Summary**)
            - Short bullet points for clarity
            - NO markdown tables — instead, use readable line breaks and spacing

            Prioritize:
            - Clarity
            - Friendly tone
            - Actionable steps

            Keep the response concise but informative, under 500 tokens if possible.

            User profile:\n\n${financialContext}
                `.trim()
                },
                {
                role: "user",
                content: userMessage
                }
            ],
            max_completion_tokens: 500
            })


        const messageObj = completion.choices?.[0]?.message;
        console.log("AI message object:", messageObj);

        const aiReply = messageObj?.content;

        if (!aiReply) {
            console.error("No AI reply found in response.");
            return res.status(500).json({ error: "AI did not respond." });
        }


        res.json({response:aiReply})
    } catch (error) {
        console.error("OpenAI error", error)
        res.status(500).json({error:"AI failed to respond"})
    }

}