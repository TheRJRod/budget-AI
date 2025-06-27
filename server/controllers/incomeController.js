import Income from '../models/Income.js'

// return all income for current user (GET) /api/income
const getIncome = async (req, res) => {
    const allIncome = await Income.find({user:req.user._id})
    res.status(200).send(allIncome)
}

// create new income source (POST) /api/income
const postIncome = async (req, res) => {
    const {title, total} = req.body

    const newIncome = await Income.create({title, total, user:req.user._id})

    res.status(201).json({
        title: newIncome.title,
        total: newIncome.total,
        user: req.user._id
    })
}

export {getIncome, postIncome};