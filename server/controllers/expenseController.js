import Expenses from "../models/Expenses.js";

const getExpenses = async (req, res) => {
  const allExpenses = await Expenses.find({ user: req.user._id });
  res.status(200).send(allExpenses);
};

const postExpenses = async (req, res) => {
  const { title, total, category, isRecurring, recurringType, recurringDate, transactionDate } = req.body;

  const newExpense = await Expenses.create({
   title, total, category, isRecurring, recurringType, recurringDate, transactionDate, user:req.user._id
  });

  res.status(201).json({
    title: newExpense.title,
    total: newExpense.total,
    category: newExpense.category,
    isRecurring: newExpense.isRecurring,
    recurringType: newExpense.recurringType,
    recurringDate: newExpense.recurringDate,
    transactionDate: newExpense.transactionDate,
    user: req.user._id
  });
};

export { getExpenses, postExpenses };
