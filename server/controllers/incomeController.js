import Income from '../models/Income.js'

// return all income for current user (GET) /api/income
const getIncome = async (req, res) => {
    const allIncome = await Income.find({user:req.user._id})
    res.status(200).send(allIncome)
}

// create new income source (POST) /api/income
const postIncome = async (req, res) => {
    const {title, total, category, isRecurring, recurringType, recurringDate, transactionDate, recurrenceDetails} = req.body

    const newIncome = await Income.create({title, total, category, isRecurring, recurringType, recurrenceDetails, transactionDate, user:req.user._id})

    res.status(201).json({
        title: newIncome.title,
        total: newIncome.total,
        category: newIncome.category,
        isRecurring: newIncome.isRecurring,
        recurringType: newIncome.recurringType,
        recurrenceDetails: newIncome.recurrenceDetails,
        transactionDate: newIncome.transactionDate,
        user: req.user._id
    })
}

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.deleteOne({ _id: id, user: req.user._id });
    
    // Check if the document was actually deleted
    if (income.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Income not found or unauthorized' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Income deleted successfully',
      deletedCount: income.deletedCount 
    });
  } catch (error) {
    console.log('Error deleting income', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

const patchIncome = async (req, res) => {
  const {title, total, recurringType, recurrenceDetails} = req.body
  const {id} = req.params
  try {
      const newIncome = await Income.findOne({_id:id, user:req.user._id})
       if (!newIncome) return res.status(404).json({ message: "Expense not found" });
      newIncome.title = title
      newIncome.total = total
      newIncome.recurringType = recurringType
      if (recurrenceDetails) {
      newIncome.recurrenceDetails = {
        ...newIncome.recurrenceDetails,
        ...recurrenceDetails
      };
    }

       const updatedIncome = await newIncome.save();
       res.status(200).json(updatedIncome)
  } catch (error) {
    console.log("Error editing Income", error)
  }

}

export {getIncome, postIncome, deleteIncome, patchIncome};