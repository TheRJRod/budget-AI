import Practice from "../models/Practice";

const postPractice = (req, res) => {
    const {title, total} = req.body;

    const newPractice = Practice.create({title, total})

    res.status(201).json({
        title: newPractice.title,
        total: newPractice.total
    })
}

export {postPractice}