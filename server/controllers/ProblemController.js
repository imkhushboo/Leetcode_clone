const QUESTIONS = require('../modal/QUESTION.jsx');

fetchAllProblem = async (req, res) => {
    //return the user all the questions in the QUESTIONS array
    try {
        console.log(req.params);
        pageno = parseInt(req.params.pageno[1]);
        // console.log(pageno);
        const start = pageno * 50 - 49;
        const end = pageno * 50;
        console.log(start, end);
        const problem = await QUESTIONS.find({ problem_id: { $gte: start, $lte: end } })
        console.log(problem);
        const filteredproblems = problem.map(x => ({
            _id: x.problem_id,
            Title: x.Title,
            Acceptance: x.Acceptance,
            Difficulty: x.Difficulty
        }))
        // console.log(filteredproblems);
        res.status(200).json(filteredproblems);
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }

};




fetchProblem = async (req, res) => {


    try {
        const id = parseInt(req.params.id.split(':')[1]);
        console.log(id);
        const problem = await QUESTIONS.find({ problem_id: id });
        console.log(problem);
        if (!problem) {
            const err = 'No such Problems exist';
            throw err;
        }
        return res.status(200).json({ problem });

    }
    catch (err) {
        return res.status(500).send(err);
    }



};

module.exports = { fetchAllProblem, fetchProblem };
