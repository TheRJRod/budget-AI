import Expenses from "../models/Expenses";


const getExpenses = async (req, res) => {
    const allExpenses = await Expenses.find({user:req.user._id})
    res.status(200).send(allExpenses)
}

const postExpenses = async (req, res) => {
    const {title, total} = req.body

    const newExpense = await Expenses.create({title, total, user:req.user._id})

    res.status(201).json({
        title: newExpense.title,
        total: newExpense.total,
        user: req.user._id
    })
}