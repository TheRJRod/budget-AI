import goalsModel from "../models/Goals.js";

const getGoals = async (req, res) => {
  try {
    const allGoals = await goalsModel.find({ user: req.user._id });
    res.status(200).send(allGoals);
  } catch (error) {
    console.log(error);
  }
};

const postGoals = async (req, res) => {
  const { title, targetAmount, deadline, category } = req.body;
  try {
    const newGoal = await goalsModel.create({
      title,
      targetAmount,
      category,
      deadline: new Date(deadline),
      user: req.user._id,
    });
    res.status(201).json({
      title: newGoal.title,
      targetAmount: newGoal.targetAmount,
      category:newGoal.category,
      deadline: newGoal.deadline,
      user: req.user._id,
    });
  } catch (error) {
    console.log(error);
  }
};

const patchGoals = async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;

  try {
    const goal = await goalsModel.findOne({ _id: id, user: req.user._id });
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.currentAmount += amount;

    const updatedGoal = await goal.save();

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: "Failed to update goal" });
  }
};

export { getGoals, postGoals, patchGoals };
