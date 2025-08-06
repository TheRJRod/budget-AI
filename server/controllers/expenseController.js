import Expenses from "../models/Expenses.js";

const getExpenses = async (req, res) => {
  const allExpenses = await Expenses.find({ user: req.user._id });
  res.status(200).send(allExpenses);
};

const postExpenses = async (req, res) => {


  // Destructure ALL the fields your frontend is sending
  const { 
    title, 
    total, 
    category, 
    isRecurring, 
    recurringType, 
    recurringDate, // This is still sent but not needed for DB
    transactionDate,
    recurrenceDetails // This is what should be saved to DB
  } = req.body;

  try {
    const newExpense = await Expenses.create({
      title, 
      total, 
      category, 
      isRecurring, 
      recurringType, 
      transactionDate,
      recurrenceDetails, // Save the nested object, not recurringDate
      user: req.user._id
    });

    

    res.status(201).json({
      title: newExpense.title,
      total: newExpense.total,
      category: newExpense.category,
      isRecurring: newExpense.isRecurring,
      recurringType: newExpense.recurringType,
      recurrenceDetails: newExpense.recurrenceDetails, // Return this instead of recurringDate
      transactionDate: newExpense.transactionDate,
      user: req.user._id
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: error.message });
  }
};

export { getExpenses, postExpenses };