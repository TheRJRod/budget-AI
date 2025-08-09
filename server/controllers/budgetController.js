import Budget from "../models/Budget.js";

const getBudget = async (req, res) => {
    const allBudget = await Budget.find({ user: req.user._id })
    res.status(200).send(allBudget)
}

const postBudget = async (req, res) => {
    const {title} = req.body

    try {
        const newBudget = await Budget.create({title, user: req.user._id})

        res.status(201).json({
            title: newBudget.title,
            user: req.user._id
        })

    } catch (error) {
        console.log("Error posting budget", error)
    }
}

const patchTarget = async (req, res) => {
    const {targetAmount} = req.body
    const {id} = req.params

    try {
        const budgetItem = await Budget.findOne({_id:id, user:req.user._id})
        if (!budgetItem) return res.status(404).json({message: "Budget Item not found"})
        budgetItem.targetAmount = targetAmount;
        
        const updatedItem = await budgetItem.save();

        res.status(200).json(updatedItem)

    } catch (error) {
        console.log("Error editing budget item:", error)
    }
}

const patchCurrent = async (req, res) => {
    const {currentAmount} = req.body
    const {id} = req.params

    try {
        const budgetItem = await Budget.findOne({_id:id, user:req.user._id})
        if (!budgetItem) return res.status(404).json({message: "Budget Item not found"})
        budgetItem.currentAmountAmount = currentAmount;
        
        const updatedItem = await budgetItem.save();

        res.status(200).json(updatedItem)

    } catch (error) {
        console.log("Error editing budget item:", error)
    }
}

export {getBudget, postBudget, patchTarget, patchCurrent}