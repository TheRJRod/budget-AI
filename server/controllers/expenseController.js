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

const deleteExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expenses.deleteOne({ _id: id, user: req.user._id });
    
    // Check if the document was actually deleted
    if (expense.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Expense not found or unauthorized' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Expense deleted successfully',
      deletedCount: expense.deletedCount 
    });
  } catch (error) {
    console.log('Error deleting expense', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

const patchExpenses = async (req, res) => {
  const {title, total, recurringType, recurrenceDetails } = req.body
  const {id} = req.params

  

  try {
      const newExpense = await Expenses.findOne({_id:id, user:req.user._id})
       if (!newExpense) return res.status(404).json({ message: "Expense not found" });
      newExpense.title = title
      newExpense.total = total
      newExpense.recurringType = recurringType
       if (recurrenceDetails) {
      newExpense.recurrenceDetails = {
        ...newExpense.recurrenceDetails,
        ...recurrenceDetails
      };
    }

    

       const updatedExpense = await newExpense.save();
       res.status(200).json(updatedExpense)
  } catch (error) {
    console.log("Error editing expense", error)
  }

}

export { getExpenses, postExpenses, deleteExpenses, patchExpenses };