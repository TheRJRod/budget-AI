import Spending from "../models/Spending.js";

const getSpending = async (req, res) => {
  try {
    const allSpending = await Spending.find({ user: req.user._id });
    res.status(200).send(allSpending);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch spending" });
  }
};

const postSpending = async (req, res) => {
  try {
    const { category, amount, date, description } = req.body;
    const newSpend = await Spending.create({
      user: req.user._id,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(newSpend); 
  } catch (error) {
    res.status(500).json({ message: "Failed to add spending" });
  }
};


export {getSpending, postSpending};